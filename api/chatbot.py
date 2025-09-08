from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import openai
import os

app = FastAPI()

# Configurar OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class Message(BaseModel):
    message: str

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
                <p>Asistente virtual con IA</p>
            </div>
            <div class="status" id="status">Conectado ✅ - OpenAI activo</div>
            <div class="chat" id="chat">
                <div class="message bot">¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte?</div>
            </div>
            <div class="input-area">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje..." />
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>
        <script>
            async function sendMessage() {
                const input = document.getElementById('messageInput');
                const message = input.value.trim();
                if (!message) return;
                
                const chat = document.getElementById('chat');
                chat.innerHTML += `<div class="message user">${message}</div>`;
                input.value = '';
                chat.scrollTop = chat.scrollHeight;
                
                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: message })
                    });
                    const data = await response.json();
                    chat.innerHTML += `<div class="message bot">${data.response}</div>`;
                    chat.scrollTop = chat.scrollHeight;
                } catch (error) {
                    chat.innerHTML += `<div class="message bot">Error: ${error.message}</div>`;
                    chat.scrollTop = chat.scrollHeight;
                }
            }
            
            document.getElementById('messageInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
        </script>
    </body>
    </html>
    """

@app.post("/api/chat")
async def chat(message: Message):
    try:
        if not openai.api_key:
            return {"response": "Error: OpenAI API key no configurada"}
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres un asistente de Mente Autónoma. Responde en español de manera profesional y útil."},
                {"role": "user", "content": message.message}
            ],
            max_tokens=300
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

@app.get("/api/health")
async def health():
    return {"status": "ok", "openai": bool(openai.api_key)}