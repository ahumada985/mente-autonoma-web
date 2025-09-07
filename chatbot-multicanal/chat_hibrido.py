from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import json
import os
import requests
from openai import OpenAI
from dotenv import load_dotenv
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

# Configurar OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = FastAPI()

def get_weather_info(city: str) -> str:
    """Obtener información del clima usando una API gratuita"""
    try:
        # Usar OpenWeatherMap API (gratuita)
        api_key = "tu_api_key_aqui"  # Necesitarías registrarte en openweathermap.org
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=es"
        
        # Por ahora, devolver información simulada
        return f"🌤️ Información del clima para {city}:\n\n• Temperatura: 22°C\n• Condición: Soleado\n• Humedad: 45%\n• Viento: 15 km/h\n\n*Nota: Esta es información simulada. Para datos reales, necesitarías una API de clima.*"
    except:
        return f"Lo siento, no puedo obtener información del clima actual para {city}. Te recomiendo consultar una app del clima o sitio web especializado."

def get_news_info() -> str:
    """Obtener noticias usando una API gratuita"""
    try:
        # Usar NewsAPI (gratuita con límites)
        api_key = "tu_api_key_aqui"  # Necesitarías registrarte en newsapi.org
        url = f"https://newsapi.org/v2/top-headlines?country=cl&apiKey={api_key}"
        
        # Por ahora, devolver información simulada
        return f"📰 Noticias de hoy (simuladas):\n\n• Tecnología: Avances en IA\n• Economía: Mercado estable\n• Deportes: Partidos de fútbol\n• Política: Reuniones gubernamentales\n\n*Nota: Esta es información simulada. Para noticias reales, consulta sitios de noticias.*"
    except:
        return "Lo siento, no puedo obtener noticias actuales. Te recomiendo consultar sitios de noticias confiables."

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
- Si preguntan sobre clima o noticias, explica que no tienes acceso en tiempo real
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

def process_message(message: str) -> str:
    """Procesar mensaje y determinar qué tipo de respuesta dar"""
    message_lower = message.lower()
    
    # Detectar preguntas sobre clima
    if any(word in message_lower for word in ["clima", "tiempo", "temperatura", "lluvia", "soleado"]):
        if "antofagasta" in message_lower:
            return get_weather_info("Antofagasta")
        else:
            return "🌤️ Para información del clima, necesito saber la ciudad. Por ejemplo: '¿Qué clima hay en Antofagasta?'"
    
    # Detectar preguntas sobre noticias
    elif any(word in message_lower for word in ["noticias", "noticia", "actualidad", "hoy"]):
        return get_news_info()
    
    # Detectar preguntas sobre la empresa
    elif any(word in message_lower for word in ["servicios", "precios", "empresa", "contacto", "horarios"]):
        return get_openai_response(message)
    
    # Otras preguntas - usar OpenAI
    else:
        return get_openai_response(message)

@app.get("/")
async def get_chat():
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Híbrido Mente Autónoma</title>
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
                <h1>🤖 Chatbot Híbrido</h1>
                <p>Mente Autónoma - OpenAI + APIs Externas</p>
            </div>
            <div class="messages" id="messages">
                <div class="message bot">
                    ¡Hola! Soy tu asistente virtual híbrido de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, consultas generales, y más. ¿En qué puedo ayudarte?
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
                status.textContent = "Conectado ✅ - OpenAI + APIs activas";
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
                
                # Procesar mensaje
                response = process_message(message_data["content"])
                
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
    print("🚀 Iniciando Chatbot Híbrido...")
    print("📱 Abre: http://localhost:8000")
    print("🤖 OpenAI + APIs externas")
    uvicorn.run(app, host="0.0.0.0", port=8000)
