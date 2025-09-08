"""
Base de datos para chatbot usando Vercel Postgres
"""

import os
import psycopg2
import json
from datetime import datetime
from typing import Dict, List, Any
from dotenv import load_dotenv

load_dotenv()

class ChatbotDatabaseVercel:
    def __init__(self):
        self.database_url = os.getenv('DATABASE_URL')
        self.connection = None
        
        if self.database_url:
            try:
                self.connection = psycopg2.connect(self.database_url)
                print("✅ Conexión a Vercel Postgres exitosa")
                self.create_tables()
            except Exception as e:
                print(f"❌ Error conectando a Vercel Postgres: {e}")
        else:
            print("❌ DATABASE_URL no configurada")
    
    def create_tables(self):
        """Crear tablas necesarias"""
        if not self.connection:
            return False
        
        try:
            cursor = self.connection.cursor()
            
            # Crear tabla de conversaciones
            cursor.execute("""
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
            """)
            
            # Crear tabla de usuarios
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    user_id VARCHAR(255) UNIQUE NOT NULL,
                    channel VARCHAR(50) NOT NULL,
                    first_message_at TIMESTAMP DEFAULT NOW(),
                    last_message_at TIMESTAMP DEFAULT NOW(),
                    total_messages INTEGER DEFAULT 0,
                    is_active BOOLEAN DEFAULT true
                );
            """)
            
            # Crear tabla de estadísticas
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS chatbot_stats (
                    id SERIAL PRIMARY KEY,
                    date DATE DEFAULT CURRENT_DATE,
                    total_conversations INTEGER DEFAULT 0,
                    total_messages INTEGER DEFAULT 0,
                    avg_response_time FLOAT DEFAULT 0,
                    success_rate FLOAT DEFAULT 0
                );
            """)
            
            self.connection.commit()
            cursor.close()
            print("✅ Tablas creadas en Vercel Postgres")
            return True
            
        except Exception as e:
            print(f"❌ Error creando tablas: {e}")
            return False
    
    def save_conversation(self, user_id: str, channel: str, message: str, response: str, response_time: float, success: bool = True):
        """Guardar conversación"""
        if not self.connection:
            return False
        
        try:
            cursor = self.connection.cursor()
            
            cursor.execute("""
                INSERT INTO conversations (user_id, channel, message, response, response_time, success)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (user_id, channel, message, response, response_time, success))
            
            # Actualizar estadísticas del usuario
            self.update_user_stats(user_id, channel)
            
            self.connection.commit()
            cursor.close()
            
            print(f"✅ Conversación guardada: {user_id}")
            return True
            
        except Exception as e:
            print(f"❌ Error guardando conversación: {e}")
            return False
    
    def update_user_stats(self, user_id: str, channel: str):
        """Actualizar estadísticas del usuario"""
        if not self.connection:
            return False
        
        try:
            cursor = self.connection.cursor()
            
            # Verificar si el usuario existe
            cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
            user = cursor.fetchone()
            
            if user:
                # Actualizar usuario existente
                cursor.execute("""
                    UPDATE users 
                    SET last_message_at = NOW(), total_messages = total_messages + 1
                    WHERE user_id = %s
                """, (user_id,))
            else:
                # Crear nuevo usuario
                cursor.execute("""
                    INSERT INTO users (user_id, channel, first_message_at, last_message_at, total_messages)
                    VALUES (%s, %s, NOW(), NOW(), 1)
                """, (user_id, channel))
            
            self.connection.commit()
            cursor.close()
            
            return True
            
        except Exception as e:
            print(f"❌ Error actualizando estadísticas: {e}")
            return False
    
    def get_conversation_history(self, user_id: str = None, limit: int = 50):
        """Obtener historial de conversaciones"""
        if not self.connection:
            return []
        
        try:
            cursor = self.connection.cursor()
            
            if user_id:
                cursor.execute("""
                    SELECT * FROM conversations 
                    WHERE user_id = %s 
                    ORDER BY created_at DESC 
                    LIMIT %s
                """, (user_id, limit))
            else:
                cursor.execute("""
                    SELECT * FROM conversations 
                    ORDER BY created_at DESC 
                    LIMIT %s
                """, (limit,))
            
            columns = [desc[0] for desc in cursor.description]
            results = cursor.fetchall()
            
            cursor.close()
            
            return [dict(zip(columns, row)) for row in results]
            
        except Exception as e:
            print(f"❌ Error obteniendo historial: {e}")
            return []
    
    def get_user_stats(self, user_id: str):
        """Obtener estadísticas de un usuario"""
        if not self.connection:
            return None
        
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
            user = cursor.fetchone()
            
            if user:
                columns = [desc[0] for desc in cursor.description]
                cursor.close()
                return dict(zip(columns, user))
            
            cursor.close()
            return None
            
        except Exception as e:
            print(f"❌ Error obteniendo estadísticas: {e}")
            return None
    
    def close_connection(self):
        """Cerrar conexión"""
        if self.connection:
            self.connection.close()
            print("✅ Conexión cerrada")

# Ejemplo de uso
if __name__ == "__main__":
    db = ChatbotDatabaseVercel()
    
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
    
    db.close_connection()
