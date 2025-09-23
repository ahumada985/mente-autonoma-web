from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
import os

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def get_chat():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Mente Autónoma</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f0f0f0; }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #007bff; margin-bottom: 20px; }
            .chat { border: 1px solid #ddd; height: 400px; overflow-y: auto; padding: 10px; margin-bottom: 20px; background: #f9f9f9; }
            .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
            .user { background: #007bff; color: white; text-align: right; }
            .bot { background: #e9ecef; color: #333; }
            .input-area { display: flex; gap: 10px; }
            .input-area input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            .input-area button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
            .status { text-align: center; color: #28a745; font-weight: bold; margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Chatbot Mente Autónoma</h1>
                <p>Asistente virtual</p>
            </div>
            <div class="status">Conectado ✅ - Sistema activo</div>
            <div class="chat" id="chat">
                <div class="message bot">¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte?</div>
            </div>
            <div class="input-area">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>
        <script>
            function sendMessage() {
                const input = document.getElementById('messageInput');
                const message = input.value.trim();
                if (!message) return;
                
                const chat = document.getElementById('chat');
                chat.innerHTML += `<div class="message user">${message}</div>`;
                input.value = '';
                chat.scrollTop = chat.scrollHeight;
                
                // Respuesta simple
                let response = "Lo siento, no puedo responder en este momento. Por favor contacta a +56 9 1234 5678";
                
                if (message.toLowerCase().includes('hola')) {
                    response = "¡Hola! ¿En qué puedo ayudarte?";
                } else if (message.toLowerCase().includes('servicios')) {
                    response = "Ofrecemos: Desarrollo web, Chatbots, Automatización, Consultoría en IA";
                } else if (message.toLowerCase().includes('precios')) {
                    response = "Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP";
                } else if (message.toLowerCase().includes('contacto')) {
                    response = "Contacto: +56 9 1234 5678, email: contacto@empresa.com";
                } else if (message.toLowerCase().includes('horarios')) {
                    response = "Horarios: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00";
                }
                
                setTimeout(() => {
                    chat.innerHTML += `<div class="message bot">${response}</div>`;
                    chat.scrollTop = chat.scrollHeight;
                }, 500);
            }
            
            document.getElementById('messageInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        </script>
    </body>
    </html>
    """

@app.post("/api/chat")
async def chat():
    return JSONResponse({"response": "Chatbot funcionando correctamente"})

@app.get("/api/health")
async def health():
    return JSONResponse({"status": "ok", "message": "Chatbot funcionando"})

# Para Vercel
handler = app