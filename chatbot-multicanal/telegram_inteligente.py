import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from openai import OpenAI
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class TelegramBotInteligente:
    def __init__(self):
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        if not self.bot_token:
            print("❌ TELEGRAM_BOT_TOKEN no encontrado en .env")
            return
        
        self.application = Application.builder().token(self.bot_token).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        start_handler = CommandHandler("start", self.start_command)
        help_handler = CommandHandler("help", self.help_command)
        message_handler = MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message)
        
        self.application.add_handler(start_handler)
        self.application.add_handler(help_handler)
        self.application.add_handler(message_handler)
    
    def get_openai_response(self, message: str) -> str:
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
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        welcome = """
🤖 ¡Hola! Soy tu asistente virtual inteligente de Mente Autónoma.

Estoy aquí para ayudarte con:
• Información sobre productos y servicios
• Consultas generales (clima, noticias, etc.)
• Soporte técnico
• Cualquier pregunta que tengas

Puedo responder sobre cualquier tema usando inteligencia artificial.

Comandos:
/help - Ver ayuda
        """
        await update.message.reply_text(welcome)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        help_text = """
📋 **Comandos disponibles:**

/start - Iniciar conversación
/help - Mostrar esta ayuda

💡 **Características:**
• Powered by OpenAI GPT-3.5
• Puedo responder cualquier pregunta
• Información sobre clima, noticias, etc.
• Consultas sobre nuestros servicios
• Multilingüe

¿En qué puedo ayudarte?
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        try:
            # Mostrar que está procesando
            processing_message = await update.message.reply_text("🤔 Procesando con IA...")
            
            # Obtener respuesta de OpenAI
            response = self.get_openai_response(update.message.text)
            
            # Eliminar mensaje de procesamiento
            await processing_message.delete()
            
            # Enviar respuesta
            await update.message.reply_text(response)
            
        except Exception as e:
            error_message = "❌ Lo siento, hubo un error procesando tu mensaje. Intenta de nuevo."
            await update.message.reply_text(error_message)
            print(f"Error en Telegram: {e}")
    
    def run_bot(self):
        if not self.bot_token:
            print("❌ No se puede ejecutar el bot sin TELEGRAM_BOT_TOKEN")
            return
        
        print("🤖 Iniciando Bot de Telegram Inteligente...")
        print(f"📱 Token: {self.bot_token[:20]}...")
        print("✅ Bot activo con OpenAI - Busca tu bot en Telegram")
        self.application.run_polling()

def main():
    print("🚀 Iniciando Bot de Telegram Inteligente...")
    bot = TelegramBotInteligente()
    bot.run_bot()

if __name__ == "__main__":
    main()
