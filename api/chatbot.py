"""
API de Chatbot para Vercel
"""

import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# No usar dotenv en Vercel (usa variables de entorno directamente)
app = FastAPI()

class ChatMessage(BaseModel):
    message: str
    user_id: str = "web_user"
    channel: str = "web"

# Simulación de respuesta del chatbot (sin LangChain para Vercel)
def get_chatbot_response(message: str) -> str:
    """Simular respuesta del chatbot"""
    message_lower = message.lower()
    
    if "horarios" in message_lower or "horario" in message_lower:
        return "Horarios de atención: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00"
    
    elif "servicios" in message_lower or "servicio" in message_lower:
        return "Servicios: Desarrollo web responsivo, Chatbots inteligentes, Automatización de procesos, Consultoría en IA, Capacitación tecnológica"
    
    elif "precios" in message_lower or "precio" in message_lower:
        return "Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora"
    
    elif "contacto" in message_lower or "contactar" in message_lower:
        return "Contacto: +56 9 1234 5678, email: contacto@empresa.com, ubicación: Antofagasta, Chile"
    
    elif "tecnologías" in message_lower or "tecnologia" in message_lower:
        return "Tecnologías: React, Node.js, Python, Django, Flask, OpenAI GPT, LangChain, MongoDB, PostgreSQL, AWS, Google Cloud"
    
    elif "casos" in message_lower or "éxito" in message_lower:
        return "Casos de éxito: E-commerce con 300% aumento en ventas, Chatbot que redujo 80% consultas telefónicas, Automatización que ahorra 50% tiempo"
    
    else:
        return f"¡Hola! Soy el asistente de Mente Autónoma. Recibí tu mensaje: '{message}'. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito."

@app.get("/")
async def root():
    return {
        "message": "Chatbot API de Mente Autónoma",
        "status": "active",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/api/health"
        }
    }

@app.post("/api/chat")
async def chat_endpoint(chat_message: ChatMessage):
    """Endpoint para chat"""
    try:
        response = get_chatbot_response(chat_message.message)
        return {
            "response": response,
            "user_id": chat_message.user_id,
            "channel": chat_message.channel,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check"""
    return {
        "status": "healthy",
        "message": "Chatbot API funcionando correctamente"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
