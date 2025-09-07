from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import json
import os
from openai import OpenAI
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = FastAPI()

def get_openai_response(message: str) -> str:
    """Obtener respuesta de OpenAI"""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": """Eres un asistente virtual de Mente Autónoma, una empresa especializada en desarrollo web e inteligencia artificial en Antofagasta, Chile. 

INFORMACIÓN DE LA EMPRESA:
- Nombre: Mente Autónoma
- Ubicación: Antofagasta, Chile
- Servicios: Desarrollo web, chatbots, automatización, consultoría en IA
- Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora
- Horarios: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00

INSTRUCCIONES:
- Responde de manera amable y profesional
- Si preguntan sobre clima, noticias, o temas generales, responde normalmente
- Si preguntan sobre la empresa, usa la información proporcionada
- Mantén un tono conversacional pero profesional
- Responde en español a menos que te pidan en otro idioma"""
                },
                {
                    "role": "user", 
                    "content": message
                }
            ],
            max_tokens=500,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Lo siento, hubo un error procesando tu consulta: {str(e)}"

@app.get("/")
async def get_chat():
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Inteligente Mente Autónoma</title>
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
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Chatbot Inteligente</h1>
                <p>Mente Autónoma - Powered by OpenAI GPT</p>
            </div>
            <div class="messages" id="messages">
                <div class="message bot">
                    ¡Hola! Soy tu asistente virtual inteligente de Mente Autónoma. Puedo ayudarte con cualquier pregunta, desde información sobre nuestros servicios hasta consultas generales. ¿En qué puedo ayudarte?
                </div>
            </div>
            <div class="status" id="status">Conectando...</div>
            <div class="input-area">
                <input type="text" id="input" placeholder="Pregúntame cualquier cosa..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8000/ws");
            const messages = document.getElementById('messages');
            const input = document.getElementById('input');
            const status = document.getElementById('status');

            ws.onopen = function() {
                status.textContent = "Conectado ✅ - OpenAI activo";
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
                    div.textContent = 'El bot está escribiendo...';
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
                    "content": "El bot está escribiendo...",
                    "sender": "bot"
                }))
                
                # Obtener respuesta de OpenAI
                response = get_openai_response(message_data["content"])
                
                # Enviar respuesta
                await websocket.send_text(json.dumps({
                    "type": "message",
                    "content": response,
                    "sender": "bot"
                }))
                
    except Exception as e:
        print(f"Error en WebSocket: {e}")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando Chatbot Inteligente con OpenAI...")
    print("📱 Abre: http://localhost:8000")
    print("🤖 Powered by OpenAI GPT-3.5-turbo")
    uvicorn.run(app, host="0.0.0.0", port=8000)
