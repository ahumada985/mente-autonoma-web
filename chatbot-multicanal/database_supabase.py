"""
Base de datos para chatbot usando Supabase
"""

import os
import json
from datetime import datetime
from typing import Dict, List, Any
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class ChatbotDatabase:
    def __init__(self):
        self.supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
        self.supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
        
        if self.supabase_url and self.supabase_key:
            self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
            print("✅ Conexión a Supabase exitosa")
        else:
            print("❌ Variables de Supabase no configuradas")
            self.supabase = None
    
    def create_tables(self):
        """Crear tablas necesarias en Supabase"""
        if not self.supabase:
            return False
        
        try:
            # Crear tabla de conversaciones
            conversations_sql = """
            CREATE TABLE IF NOT EXISTS conversations (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                channel VARCHAR(50) NOT NULL,
                message TEXT NOT NULL,
                response TEXT NOT NULL,
                response_time FLOAT,
                success BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW()
            );
            """
            
            # Crear tabla de usuarios
            users_sql = """
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) UNIQUE NOT NULL,
                channel VARCHAR(50) NOT NULL,
                first_message_at TIMESTAMP DEFAULT NOW(),
                last_message_at TIMESTAMP DEFAULT NOW(),
                total_messages INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT true
            );
            """
            
            # Crear tabla de estadísticas
            stats_sql = """
            CREATE TABLE IF NOT EXISTS chatbot_stats (
                id SERIAL PRIMARY KEY,
                date DATE DEFAULT CURRENT_DATE,
                total_conversations INTEGER DEFAULT 0,
                total_messages INTEGER DEFAULT 0,
                avg_response_time FLOAT DEFAULT 0,
                success_rate FLOAT DEFAULT 0
            );
            """
            
            print("✅ Tablas creadas en Supabase")
            return True
            
        except Exception as e:
            print(f"❌ Error creando tablas: {e}")
            return False
    
    def save_conversation(self, user_id: str, channel: str, message: str, response: str, response_time: float, success: bool = True):
        """Guardar conversación en la base de datos"""
        if not self.supabase:
            return False
        
        try:
            # Guardar conversación
            conversation_data = {
                "user_id": user_id,
                "channel": channel,
                "message": message,
                "response": response,
                "response_time": response_time,
                "success": success
            }
            
            result = self.supabase.table("conversations").insert(conversation_data).execute()
            
            # Actualizar estadísticas del usuario
            self.update_user_stats(user_id, channel)
            
            print(f"✅ Conversación guardada: {user_id}")
            return True
            
        except Exception as e:
            print(f"❌ Error guardando conversación: {e}")
            return False
    
    def update_user_stats(self, user_id: str, channel: str):
        """Actualizar estadísticas del usuario"""
        if not self.supabase:
            return False
        
        try:
            # Verificar si el usuario existe
            user_result = self.supabase.table("users").select("*").eq("user_id", user_id).execute()
            
            if user_result.data:
                # Actualizar usuario existente
                self.supabase.table("users").update({
                    "last_message_at": datetime.now().isoformat(),
                    "total_messages": user_result.data[0]["total_messages"] + 1
                }).eq("user_id", user_id).execute()
            else:
                # Crear nuevo usuario
                user_data = {
                    "user_id": user_id,
                    "channel": channel,
                    "first_message_at": datetime.now().isoformat(),
                    "last_message_at": datetime.now().isoformat(),
                    "total_messages": 1
                }
                self.supabase.table("users").insert(user_data).execute()
            
            return True
            
        except Exception as e:
            print(f"❌ Error actualizando estadísticas: {e}")
            return False
    
    def get_conversation_history(self, user_id: str = None, limit: int = 50):
        """Obtener historial de conversaciones"""
        if not self.supabase:
            return []
        
        try:
            query = self.supabase.table("conversations").select("*")
            
            if user_id:
                query = query.eq("user_id", user_id)
            
            query = query.order("created_at", desc=True).limit(limit)
            
            result = query.execute()
            return result.data
            
        except Exception as e:
            print(f"❌ Error obteniendo historial: {e}")
            return []
    
    def get_user_stats(self, user_id: str):
        """Obtener estadísticas de un usuario"""
        if not self.supabase:
            return None
        
        try:
            result = self.supabase.table("users").select("*").eq("user_id", user_id).execute()
            return result.data[0] if result.data else None
            
        except Exception as e:
            print(f"❌ Error obteniendo estadísticas: {e}")
            return None
    
    def get_daily_stats(self, date: str = None):
        """Obtener estadísticas del día"""
        if not self.supabase:
            return None
        
        try:
            if not date:
                date = datetime.now().strftime("%Y-%m-%d")
            
            # Obtener conversaciones del día
            conversations = self.supabase.table("conversations").select("*").gte("created_at", f"{date} 00:00:00").lt("created_at", f"{date} 23:59:59").execute()
            
            if conversations.data:
                total_conversations = len(conversations.data)
                total_messages = sum(1 for conv in conversations.data)
                avg_response_time = sum(conv["response_time"] for conv in conversations.data) / total_conversations
                success_rate = sum(1 for conv in conversations.data if conv["success"]) / total_conversations * 100
                
                return {
                    "date": date,
                    "total_conversations": total_conversations,
                    "total_messages": total_messages,
                    "avg_response_time": round(avg_response_time, 2),
                    "success_rate": round(success_rate, 2)
                }
            
            return None
            
        except Exception as e:
            print(f"❌ Error obteniendo estadísticas: {e}")
            return None

# Ejemplo de uso
if __name__ == "__main__":
    db = ChatbotDatabase()
    db.create_tables()
    
    # Probar guardar conversación
    db.save_conversation(
        user_id="test_user",
        channel="web",
        message="Hola",
        response="¡Hola! ¿En qué puedo ayudarte?",
        response_time=1.5
    )
    
    # Obtener historial
    history = db.get_conversation_history("test_user")
    print(f"Historial: {len(history)} conversaciones")
