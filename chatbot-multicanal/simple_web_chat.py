"""
Chat Web Simplificado
Funciona sin LangChain para prueba rápida
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import json
import asyncio
from core.simple_agent import SimpleAgent

class SimpleWebChannel:
    def __init__(self, agent: SimpleAgent):
        self.agent = agent
        self.active_connections: dict = {}  # user_id -> websocket
    
    async def connect(self, websocket: WebSocket, user_id: str):
        """Conectar usuario al chat web"""
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"✅ Usuario {user_id} conectado al chat web")
    
    def disconnect(self, user_id: str):
        """Desconectar usuario del chat web"""
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print(f"❌ Usuario {user_id} desconectado del chat web")
    
    async def send_message(self, user_id: str, message: str):
        """Enviar mensaje a usuario específico"""
        if user_id in self.active_connections:
            websocket = self.active_connections[user_id]
            await websocket.send_text(json.dumps({
                "type": "message",
                "content": message,
                "sender": "bot"
            }))
    
    async def handle_message(self, user_id: str, message: str):
        """Procesar mensaje del usuario"""
        try:
            # Procesar con el agente
            response = self.agent.process_message(
                message=message,
                user_id=user_id,
                channel="web"
            )
            
            # Enviar respuesta
            await self.send_message(user_id, response)
            
        except Exception as e:
            error_msg = "Lo siento, hubo un error procesando tu mensaje."
            await self.send_message(user_id, error_msg)
            print(f"Error procesando mensaje: {e}")

# FastAPI app
app = FastAPI(title="Chat Web Simplificado")

# Crear agente global
agent = SimpleAgent(openai_api_key="test-key")
web_channel = SimpleWebChannel(agent)

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
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .chat-container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 20px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                overflow: hidden;
            }
            .chat-header { 
                background: linear-gradient(135deg, #007bff, #0056b3); 
                color: white; 
                padding: 30px; 
                text-align: center; 
            }
            .chat-header h1 { margin: 0; font-size: 2em; }
            .chat-header p { margin: 10px 0 0 0; opacity: 0.9; }
            .chat-messages { 
                height: 400px; 
                overflow-y: auto; 
                padding: 20px; 
                background: #f8f9fa;
            }
            .message { 
                margin: 15px 0; 
                padding: 15px; 
                border-radius: 20px; 
                max-width: 70%; 
                word-wrap: break-word;
                animation: fadeIn 0.3s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .user-message { 
                background: linear-gradient(135deg, #007bff, #0056b3); 
                color: white; 
                margin-left: auto; 
                text-align: right;
            }
            .bot-message { 
                background: white; 
                color: #333; 
                border: 1px solid #e9ecef;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .chat-input { 
                display: flex; 
                padding: 20px; 
                border-top: 1px solid #ddd; 
                background: white;
            }
            .chat-input input { 
                flex: 1; 
                padding: 15px; 
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
                margin-left: 15px; 
                padding: 15px 25px; 
                background: linear-gradient(135deg, #007bff, #0056b3); 
                color: white; 
                border: none; 
                border-radius: 25px; 
                cursor: pointer; 
                font-size: 16px;
                font-weight: bold;
                transition: transform 0.2s;
            }
            .chat-input button:hover {
                transform: translateY(-2px);
            }
            .status { 
                text-align: center; 
                padding: 10px; 
                color: #666; 
                font-size: 14px;
            }
            .typing-indicator {
                display: none;
                padding: 10px;
                color: #666;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div class="chat-header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Asistente virtual inteligente - Desarrollo Web e IA</p>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot-message">
                    ¡Hola! Soy tu asistente virtual de Mente Autónoma. 
                    Puedo ayudarte con información sobre nuestros servicios, 
                    precios, horarios y más. ¿En qué puedo ayudarte hoy?
                </div>
            </div>
            <div class="typing-indicator" id="typingIndicator">
                El bot está escribiendo...
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje aquí..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws/user123");
            const chatMessages = document.getElementById('chatMessages');
            const messageInput = document.getElementById('messageInput');
            const status = document.getElementById('status');
            const typingIndicator = document.getElementById('typingIndicator');

            ws.onopen = function(event) {
                status.textContent = "Conectado ✅";
                status.style.color = "green";
            };

            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'message') {
                    hideTypingIndicator();
                    addMessage(data.content, data.sender);
                }
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

            function showTypingIndicator() {
                typingIndicator.style.display = 'block';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function hideTypingIndicator() {
                typingIndicator.style.display = 'none';
            }

            function sendMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    showTypingIndicator();
                    
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

            // Auto-focus en el input
            messageInput.focus();
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """WebSocket endpoint para chat en tiempo real"""
    await web_channel.connect(websocket, user_id)
    
    try:
        while True:
            # Recibir mensaje del cliente
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            if message_data["type"] == "message":
                # Procesar mensaje
                await web_channel.handle_message(
                    user_id=user_id,
                    message=message_data["content"]
                )
                
    except WebSocketDisconnect:
        web_channel.disconnect(user_id)

@app.get("/api/status")
async def get_status():
    """Estado del canal web"""
    return {
        "status": "active",
        "channel": "web",
        "connected_users": len(web_channel.active_connections)
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando Chat Web Simplificado...")
    print("📱 Abre tu navegador en: http://localhost:8000")
    print("🤖 El chatbot responderá con respuestas inteligentes")
    print("\nPresiona Ctrl+C para detener")
    uvicorn.run(app, host="0.0.0.0", port=8000)
