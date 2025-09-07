"""
Agente simplificado para prueba
Funciona sin todas las dependencias de LangChain
"""

import os
import time
from typing import Dict, Any
import json

class SimpleAgent:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        self.memory = {}  # Memoria simple por usuario
    
    def process_message(self, message: str, user_id: str, channel: str) -> str:
        """Procesar mensaje desde cualquier canal"""
        start_time = time.time()
        success = False
        response = ""
        
        try:
            # Simular procesamiento con OpenAI
            response = self.simulate_openai_response(message, user_id)
            success = True
            
        except Exception as e:
            error_msg = f"Lo siento, hubo un error procesando tu mensaje: {e}"
            response = error_msg
            print(f"Error: {e}")
        
        finally:
            # Calcular tiempo de respuesta
            response_time = time.time() - start_time
            
            # Guardar en memoria simple
            if user_id not in self.memory:
                self.memory[user_id] = []
            
            self.memory[user_id].append({
                "message": message,
                "response": response,
                "channel": channel,
                "response_time": response_time,
                "success": success,
                "timestamp": time.time()
            })
            
            # Mantener solo últimos 10 mensajes por usuario
            if len(self.memory[user_id]) > 10:
                self.memory[user_id] = self.memory[user_id][-10:]
        
        return response
    
    def simulate_openai_response(self, message: str, user_id: str) -> str:
        """Simular respuesta de OpenAI"""
        
        # Respuestas predefinidas basadas en palabras clave
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["hola", "hello", "hi", "buenos"]):
            return "¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte hoy?"
        
        elif any(word in message_lower for word in ["precio", "costo", "cuanto", "valor"]):
            return "Nuestros precios son:\n• Desarrollo web: Desde $500.000 CLP\n• Chatbots: Desde $300.000 CLP\n• Consultoría: $150.000 CLP/hora\n\n¿Te interesa algún servicio específico?"
        
        elif any(word in message_lower for word in ["horario", "hora", "atencion", "disponible"]):
            return "Nuestros horarios de atención son:\n• Lunes a Viernes: 9:00 - 18:00\n• Sábados: 9:00 - 14:00\n• Domingos: Cerrado\n\n¿Necesitas agendar una consulta?"
        
        elif any(word in message_lower for word in ["servicio", "producto", "que", "hacen"]):
            return "Ofrecemos:\n• Desarrollo web responsivo\n• Chatbots inteligentes\n• Automatización de procesos\n• Consultoría en IA\n• Capacitación tecnológica\n\n¿Cuál te interesa más?"
        
        elif any(word in message_lower for word in ["contacto", "telefono", "email", "direccion"]):
            return "Puedes contactarnos:\n• Teléfono: +56 9 1234 5678\n• Email: contacto@empresa.com\n• Ubicación: Antofagasta, Chile\n\n¿Prefieres que te llamemos?"
        
        elif any(word in message_lower for word in ["gracias", "thanks", "bye", "adios"]):
            return "¡De nada! Fue un placer ayudarte. Si tienes más preguntas, no dudes en contactarnos. ¡Que tengas un excelente día!"
        
        else:
            # Respuesta genérica inteligente
            return f"Entiendo que preguntas sobre '{message}'. Como asistente de Mente Autónoma, puedo ayudarte con información sobre nuestros servicios, precios, horarios de atención y más. ¿Hay algo específico que te gustaría saber?"
    
    def get_conversation_history(self, user_id: str) -> list:
        """Obtener historial de conversación de un usuario"""
        return self.memory.get(user_id, [])
    
    def clear_memory(self, user_id: str = None):
        """Limpiar memoria de conversación"""
        if user_id:
            if user_id in self.memory:
                del self.memory[user_id]
        else:
            self.memory.clear()

# Ejemplo de uso
if __name__ == "__main__":
    # Crear agente
    agent = SimpleAgent(openai_api_key="test-key")
    
    # Probar con diferentes mensajes
    print("🤖 Probando agente simplificado...")
    
    test_messages = [
        "Hola, ¿cuáles son sus precios?",
        "¿Qué servicios ofrecen?",
        "¿Cuáles son sus horarios?",
        "Gracias por la información"
    ]
    
    for msg in test_messages:
        response = agent.process_message(msg, "user123", "web")
        print(f"Usuario: {msg}")
        print(f"Bot: {response}")
        print("-" * 50)
