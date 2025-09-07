"""
Chat Web Ultra Simple - Versión que funciona
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import json

app = FastAPI()

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
            .messages { height: 400px; overflow-y: auto; padding: 20px; background: #f8f9fa; }
            .message { margin: 10px 0; padding: 12px; border-radius: 10px; max-width: 70%; }
            .user { background: #007bff; color: white; margin-left: auto; text-align: right; }
            .bot { background: white; color: #333; border: 1px solid #ddd; }
            .input-area { display: flex; padding: 20px; border-top: 1px solid #ddd; }
            .input-area input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }
            .input-area button { margin-left: 10px; padding: 12px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
            .status { text-align: center; padding: 10px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Asistente virtual - Desarrollo Web e IA</p>
            </div>
            <div class="messages" id="messages">
                <div class="message bot">
                    ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="input-area">
                <input type="text" id="input" placeholder="Escribe tu mensaje..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws");
            const messages = document.getElementById('messages');
            const input = document.getElementById('input');
            const status = document.getElementById('status');

            ws.onopen = function() {
                status.textContent = "Conectado ✅";
                status.style.color = "green";
            };

            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                addMessage(data.content, data.sender);
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
                user_message = message_data["content"].lower()
                
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
                
                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": response,
                    "sender": "bot"
                }))
                
    except WebSocketDisconnect:
        pass

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando Chat Web...")
    print("📱 Abre: http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
