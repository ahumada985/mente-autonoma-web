"""
API para Vercel - Chatbot Simple
"""

import os
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from agente_simple import AgenteSimple
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = FastAPI()

# Crear agente simple
agent = AgenteSimple(openai_api_key=os.getenv('OPENAI_API_KEY'))

@app.get("/")
async def get_chat():
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Mente Autónoma</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f0f2f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .messages { height: 400px; overflow-y: auto; padding: 20px; background: #f8f9fa; }
            .message { margin: 10px 0; padding: 12px; border-radius: 10px; max-width: 70%; word-wrap: break-word; }
            .user { background: #007bff; color: white; margin-left: auto; text-align: right; }
            .bot { background: white; color: #333; border: 1px solid #ddd; }
            .input-area { display: flex; padding: 20px; border-top: 1px solid #ddd; }
            .input-area input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }
            .input-area button { margin-left: 10px; padding: 12px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
            .status { text-align: center; padding: 10px; color: #666; }
            .features { background: #e9ecef; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .features h3 { margin: 0 0 10px 0; color: #007bff; }
            .features ul { margin: 0; padding-left: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Powered by OpenAI GPT-3.5 + LangChain</p>
            </div>
            
            <div class="features">
                <h3>🚀 Características:</h3>
                <ul>
                    <li>✅ Herramientas inteligentes</li>
                    <li>✅ Memoria de conversación</li>
                    <li>✅ Respuestas contextuales</li>
                    <li>✅ Información de empresa</li>
                </ul>
            </div>
            
            <div class="messages" id="messages">
                <div class="message bot">
                    ¡Hola! Soy tu asistente virtual de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="input-area">
                <input type="text" id="input" placeholder="Pregúntame sobre horarios, servicios, precios..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const messages = document.getElementById('messages');
            const input = document.getElementById('input');
            const status = document.getElementById('status');

            status.textContent = "Conectado ✅ - OpenAI + LangChain activo";
            status.style.color = "green";

            function addMessage(content, sender) {
                const div = document.createElement('div');
                div.className = `message ${sender === 'user' ? 'user' : 'bot'}`;
                div.textContent = content;
                messages.appendChild(div);
                messages.scrollTop = messages.scrollHeight;
            }

            async function sendMessage() {
                const message = input.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    input.value = '';
                    
                    // Mostrar indicador de escritura
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'message bot';
                    typingDiv.textContent = 'El agente está procesando...';
                    typingDiv.id = 'typing';
                    messages.appendChild(typingDiv);
                    messages.scrollTop = messages.scrollHeight;
                    
                    try {
                        const response = await fetch('/api/chat', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ message: message })
                        });
                        
                        const data = await response.json();
                        
                        // Eliminar indicador de escritura
                        document.getElementById('typing').remove();
                        
                        // Agregar respuesta
                        addMessage(data.response, 'bot');
                        
                    } catch (error) {
                        document.getElementById('typing').remove();
                        addMessage('Lo siento, hubo un error procesando tu mensaje.', 'bot');
                    }
                }
            }

            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        </script>
    </body>
    </html>
    """)

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    """Endpoint para chat"""
    try:
        message = request.get("message", "")
        response = agent.process_message(
            message=message,
            user_id="web_user",
            channel="web"
        )
        return {"response": response}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

@app.get("/api/history")
async def get_history():
    """Obtener historial de conversaciones"""
    return agent.get_conversation_history()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
