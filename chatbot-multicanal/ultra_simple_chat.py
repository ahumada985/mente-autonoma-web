"""
Chat Web Ultra Simple
Solo FastAPI + HTML - Sin dependencias complejas
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import json
import asyncio

app = FastAPI(title="Chat Ultra Simple")

# Conexiones activas
active_connections = {}

@app.get("/")
async def get_chat_page():
    """Página principal del chat"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Mente Autónoma</title>
        <meta charset="utf-8">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #f0f2f5;
            }
            .chat-container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 10px; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .chat-header { 
                background: #007bff; 
                color: white; 
                padding: 20px; 
                text-align: center; 
            }
            .chat-messages { 
                height: 400px; 
                overflow-y: auto; 
                padding: 20px; 
                background: #f8f9fa;
            }
            .message { 
                margin: 10px 0; 
                padding: 12px; 
                border-radius: 10px; 
                max-width: 70%; 
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
                border: 1px solid #ddd;
            }
            .chat-input { 
                display: flex; 
                padding: 20px; 
                border-top: 1px solid #ddd; 
            }
            .chat-input input { 
                flex: 1; 
                padding: 12px; 
                border: 1px solid #ddd; 
                border-radius: 5px; 
                font-size: 16px;
            }
            .chat-input button { 
                margin-left: 10px; 
                padding: 12px 20px; 
                background: #007bff; 
                color: white; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer; 
                font-size: 16px;
            }
            .status { 
                text-align: center; 
                padding: 10px; 
                color: #666; 
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div class="chat-header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Asistente virtual - Desarrollo Web e IA</p>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws");
            const chatMessages = document.getElementById('chatMessages');
            const messageInput = document.getElementById('messageInput');
            const status = document.getElementById('status');

            ws.onopen = function(event) {
                status.textContent = "Conectado ✅";
                status.style.color = "green";
            };

            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                addMessage(data.content, data.sender);
            };

            ws.onclose = function(event) {
                status.textContent = "Desconectado ❌";
                status.style.color = "red";
            };

            function addMessage(content, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
                messageDiv.textContent = content;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function sendMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    ws.send(JSON.stringify({
                        type: 'message',
                        content: message,
                        sender: 'user'
                    }));
                    messageInput.value = '';
                }
            }

            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint para chat en tiempo real"""
    await websocket.accept()
    active_connections[websocket] = True
    
    try:
        while True:
            # Recibir mensaje del cliente
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            if message_data["type"] == "message":
                # Procesar mensaje y generar respuesta
                user_message = message_data["content"].lower()
                
                # Respuestas inteligentes basadas en palabras clave
                if any(word in user_message for word in ["hola", "hello", "hi"]):
                    response = "¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte?"
                elif any(word in user_message for word in ["precio", "costo", "cuanto"]):
                    response = "Nuestros precios:\n• Desarrollo web: Desde $500.000 CLP\n• Chatbots: Desde $300.000 CLP\n• Consultoría: $150.000 CLP/hora"
                elif any(word in user_message for word in ["horario", "hora", "atencion"]):
                    response = "Horarios de atención:\n• Lunes a Viernes: 9:00 - 18:00\n• Sábados: 9:00 - 14:00\n• Domingos: Cerrado"
                elif any(word in user_message for word in ["servicio", "producto", "que", "hacen"]):
                    response = "Ofrecemos:\n• Desarrollo web responsivo\n• Chatbots inteligentes\n• Automatización de procesos\n• Consultoría en IA\n• Capacitación tecnológica"
                elif any(word in user_message for word in ["contacto", "telefono", "email"]):
                    response = "Contacto:\n• Teléfono: +56 9 1234 5678\n• Email: contacto@empresa.com\n• Ubicación: Antofagasta, Chile"
                elif any(word in user_message for word in ["gracias", "thanks", "bye"]):
                    response = "¡De nada! Fue un placer ayudarte. ¡Que tengas un excelente día!"
                else:
                    response = f"Entiendo que preguntas sobre '{message_data['content']}'. Puedo ayudarte con información sobre nuestros servicios, precios, horarios y más. ¿Hay algo específico que te gustaría saber?"
                
                # Enviar respuesta
                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": response,
                    "sender": "bot"
                }))
                
    except WebSocketDisconnect:
        if websocket in active_connections:
            del active_connections[websocket]

@app.get("/api/status")
async def get_status():
    """Estado del servidor"""
    return {
        "status": "active",
        "message": "Chat web funcionando correctamente",
        "connected_users": len(active_connections)
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando Chat Web Ultra Simple...")
    print("📱 Abre tu navegador en: http://localhost:8000")
    print("🤖 El chatbot responderá con respuestas inteligentes")
    print("📊 Estado del servidor: http://localhost:8000/api/status")
    print("\nPresiona Ctrl+C para detener")
    uvicorn.run(app, host="0.0.0.0", port=8000)
