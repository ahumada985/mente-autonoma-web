"""
Chatbot Simple para Vercel (Sin OpenAI)
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import os

app = FastAPI()

class ChatMessage(BaseModel):
    message: str
    user_id: str = "web_user"

def get_response(message: str) -> str:
    """Respuesta simple del chatbot sin OpenAI"""
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
    
    elif "hola" in message_lower or "buenos" in message_lower:
        return "¡Hola! Soy el asistente de Mente Autónoma. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito."
    
    else:
        return f"¡Hola! Recibí tu mensaje: '{message}'. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito."

@app.get("/", response_class=HTMLResponse)
async def get_chat_interface():
    """Interfaz del chatbot"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Mente Autónoma</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .chat-container {
                width: 90%;
                max-width: 800px;
                height: 80vh;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .chat-header {
                background: #007bff;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .chat-header h1 {
                font-size: 1.8rem;
                margin-bottom: 5px;
            }
            .chat-header p {
                opacity: 0.9;
                font-size: 0.9rem;
            }
            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            .message {
                margin: 15px 0;
                padding: 15px 20px;
                border-radius: 20px;
                max-width: 80%;
                word-wrap: break-word;
                animation: fadeIn 0.3s ease-in;
            }
            .user-message {
                background: #007bff;
                color: white;
                margin-left: auto;
                text-align: right;
            }
            .bot-message {
                background: white;
                color: #333;
                border: 1px solid #e9ecef;
                margin-right: auto;
            }
            .chat-input {
                padding: 20px;
                background: white;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 10px;
            }
            .chat-input input {
                flex: 1;
                padding: 15px 20px;
                border: 2px solid #e9ecef;
                border-radius: 25px;
                font-size: 16px;
                outline: none;
                transition: border-color 0.3s;
            }
            .chat-input input:focus {
                border-color: #007bff;
            }
            .chat-input button {
                padding: 15px 25px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 25px;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.3s;
            }
            .chat-input button:hover {
                background: #0056b3;
            }
            .typing {
                color: #666;
                font-style: italic;
                animation: pulse 1.5s infinite;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            .status {
                text-align: center;
                padding: 10px;
                color: #28a745;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div class="chat-header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Asistente virtual inteligente</p>
            </div>
            
            <div class="status" id="status">Conectado ✅ - Sistema activo</div>
            
            <div class="chat-messages" id="messages">
                <div class="message bot-message">
                    ¡Hola! Soy tu asistente virtual de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué puedo ayudarte?
                </div>
            </div>
            
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje aquí..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const messageInput = document.getElementById('messageInput');
            const messages = document.getElementById('messages');
            const status = document.getElementById('status');

            function addMessage(content, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
                messageDiv.textContent = content;
                messages.appendChild(messageDiv);
                messages.scrollTop = messages.scrollHeight;
            }

            function showTyping() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'message bot-message typing';
                typingDiv.textContent = 'El bot está pensando...';
                typingDiv.id = 'typing';
                messages.appendChild(typingDiv);
                messages.scrollTop = messages.scrollHeight;
            }

            function hideTyping() {
                const typingDiv = document.getElementById('typing');
                if (typingDiv) {
                    typingDiv.remove();
                }
            }

            async function sendMessage() {
                const message = messageInput.value.trim();
                if (!message) return;

                // Agregar mensaje del usuario
                addMessage(message, true);
                messageInput.value = '';

                // Mostrar indicador de escritura
                showTyping();

                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: message,
                            user_id: 'web_user'
                        })
                    });

                    const data = await response.json();
                    
                    // Ocultar indicador de escritura
                    hideTyping();
                    
                    // Agregar respuesta del bot
                    addMessage(data.response || 'Lo siento, hubo un error');

                } catch (error) {
                    hideTyping();
                    addMessage('Error de conexión. Intenta de nuevo.');
                    console.error('Error:', error);
                }
            }

            // Enviar mensaje con Enter
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Enfocar el input al cargar
            messageInput.focus();
        </script>
    </body>
    </html>
    """

@app.post("/api/chat")
async def chat_endpoint(chat_message: ChatMessage):
    """Endpoint para chat"""
    try:
        response = get_response(chat_message.message)
        return {
            "response": response,
            "status": "success"
        }
    except Exception as e:
        return {
            "response": f"Lo siento, hubo un error: {str(e)}",
            "status": "error"
        }

@app.get("/api/health")
async def health_check():
    """Health check"""
    return {
        "status": "healthy",
        "message": "Chatbot funcionando correctamente"
    }

# Para Vercel
handler = app
