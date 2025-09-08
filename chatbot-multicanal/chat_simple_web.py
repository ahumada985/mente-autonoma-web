from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import json
import os
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
        <title>Chatbot Simple Mente Autónoma</title>
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
            .typing { color: #666; font-style: italic; }
            .features { background: #e9ecef; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .features h3 { margin: 0 0 10px 0; color: #007bff; }
            .features ul { margin: 0; padding-left: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Chatbot Simple Mente Autónoma</h1>
                <p>Powered by OpenAI GPT-3.5 + LangChain Tools</p>
            </div>
            
            <div class="features">
                <h3>🚀 Características:</h3>
                <ul>
                    <li>✅ Herramientas inteligentes</li>
                    <li>✅ Memoria de conversación</li>
                    <li>✅ Respuestas contextuales</li>
                    <li>✅ Información de empresa</li>
                    <li>✅ Sin errores de dependencias</li>
                </ul>
            </div>
            
            <div class="messages" id="messages">
                <div class="message bot">
                    ¡Hola! Soy tu asistente virtual de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="input-area">
                <input type="text" id="input" placeholder="Pregúntame sobre horarios, servicios, precios, tecnologías..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws");
            const messages = document.getElementById('messages');
            const input = document.getElementById('input');
            const status = document.getElementById('status');

            ws.onopen = function() {
                status.textContent = "Conectado ✅ - OpenAI + LangChain activo";
                status.style.color = "green";
            };

            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'typing') {
                    showTyping();
                } else {
                    hideTyping();
                    addMessage(data.content, data.sender);
                }
            };

            ws.onclose = function() {
                status.textContent = "Desconectado ❌";
                status.style.color = "red";
            };

            function addMessage(content, sender) {
                const div = document.createElement('div');
                div.className = `message ${sender === 'user' ? 'user' : 'bot'}`;
                div.textContent = content;
                messages.appendChild(div);
                messages.scrollTop = messages.scrollHeight;
            }

            function showTyping() {
                const typingDiv = document.getElementById('typing');
                if (!typingDiv) {
                    const div = document.createElement('div');
                    div.id = 'typing';
                    div.className = 'message bot typing';
                    div.textContent = 'El agente está procesando...';
                    messages.appendChild(div);
                    messages.scrollTop = messages.scrollHeight;
                }
            }

            function hideTyping() {
                const typingDiv = document.getElementById('typing');
                if (typingDiv) {
                    typingDiv.remove();
                }
            }

            function sendMessage() {
                const message = input.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    ws.send(JSON.stringify({type: 'message', content: message, sender: 'user'}));
                    input.value = '';
                }
            }

            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        </script>
    </body>
    </html>
    """)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            if message_data["type"] == "message":
                # Mostrar indicador de escritura
                await websocket.send_text(json.dumps({
                    "type": "typing",
                    "content": "El agente está procesando...",
                    "sender": "bot"
                }))
                
                # Procesar con el agente simple
                response = agent.process_message(
                    message=message_data["content"],
                    user_id="web_user",
                    channel="web"
                )
                
                # Enviar respuesta
                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": response,
                    "sender": "bot"
                }))
                
    except Exception as e:
        print(f"Error en WebSocket: {e}")

@app.get("/api/history")
async def get_history():
    """Obtener historial de conversaciones"""
    return agent.get_conversation_history()

@app.post("/api/save")
async def save_conversation():
    """Guardar conversación en archivo"""
    agent.save_conversation_to_file()
    return {"message": "Conversación guardada"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando Chatbot Simple...")
    print("📱 Abre: http://localhost:8000")
    print("🤖 Powered by OpenAI GPT-3.5 + LangChain")
    print("✅ Sin errores de dependencias")
    uvicorn.run(app, host="0.0.0.0", port=8000)
