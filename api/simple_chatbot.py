"""
API Ultra Simple para Vercel
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatMessage(BaseModel):
    message: str

def get_response(message: str) -> str:
    """Respuesta simple del chatbot"""
    message_lower = message.lower()
    
    if "horarios" in message_lower:
        return "Horarios: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00"
    elif "servicios" in message_lower:
        return "Servicios: Desarrollo web, Chatbots, Automatización, Consultoría en IA"
    elif "precios" in message_lower:
        return "Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP"
    elif "contacto" in message_lower:
        return "Contacto: +56 9 1234 5678, email: contacto@empresa.com"
    else:
        return f"¡Hola! Recibí tu mensaje: '{message}'. ¿En qué puedo ayudarte?"

@app.get("/")
async def root():
    return {
        "message": "Chatbot API de Mente Autónoma",
        "status": "active",
        "endpoints": ["/api/chat", "/health"]
    }

@app.post("/api/chat")
async def chat(message: ChatMessage):
    """Endpoint de chat"""
    try:
        response = get_response(message.message)
        return {
            "response": response,
            "status": "success"
        }
    except Exception as e:
        return {
            "response": "Lo siento, hubo un error",
            "status": "error",
            "error": str(e)
        }

@app.get("/health")
async def health():
    """Health check"""
    return {"status": "healthy"}

# Para Vercel
handler = app
