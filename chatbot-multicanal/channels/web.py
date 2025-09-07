"""
Canal Web Chat con WebSockets
Integración con LangChain para chat en tiempo real
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import json
import asyncio
from core.agent import MultiChannelAgent

class WebChannel:
    def __init__(self, agent: MultiChannelAgent):
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
    
    async def broadcast_message(self, message: str):
        """Enviar mensaje a todos los usuarios conectados"""
        for user_id, websocket in self.active_connections.items():
            try:
                await websocket.send_text(json.dumps({
                    "type": "broadcast",
                    "content": message,
                    "sender": "bot"
                }))
            except:
                # Si falla, remover conexión
                self.disconnect(user_id)
    
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
app = FastAPI(title="Chatbot Web Channel")

# Crear agente global
agent = MultiChannelAgent(os.getenv('OPENAI_API_KEY'))
web_channel = WebChannel(agent)

# Servir archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def get_chat_page():
    """Página principal del chat"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Inteligente</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .chat-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .chat-header { background: #007bff; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .chat-messages { height: 400px; overflow-y: auto; padding: 20px; }
            .message { margin: 10px 0; padding: 10px; border-radius: 10px; max-width: 70%; }
            .user-message { background: #007bff; color: white; margin-left: auto; }
            .bot-message { background: #e9ecef; color: black; }
            .chat-input { display: flex; padding: 20px; border-top: 1px solid #ddd; }
            .chat-input input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            .chat-input button { margin-left: 10px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
            .status { text-align: center; padding: 10px; color: #666; }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div class="chat-header">
                <h1>🤖 Chatbot Inteligente</h1>
                <p>Asistente virtual multicanal</p>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="status" id="status">Conectando...</div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws/user123");
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
    uvicorn.run(app, host="0.0.0.0", port=8000)

