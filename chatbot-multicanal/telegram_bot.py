import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv

load_dotenv()

class TelegramBot:
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
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        welcome = """
🤖 ¡Hola! Soy tu asistente virtual de Mente Autónoma.

Estoy aquí para ayudarte con:
• Información sobre productos y servicios
• Horarios de atención
• Consultas generales
• Soporte técnico

Escribe tu pregunta y te ayudo de inmediato.

Comandos:
/help - Ver ayuda
        """
        await update.message.reply_text(welcome)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        help_text = """
📋 **Comandos disponibles:**

/start - Iniciar conversación
/help - Mostrar esta ayuda

💡 **Consejos:**
• Puedes hacer preguntas en lenguaje natural
• Soy multilingüe
• Para consultas complejas, puedo programar una llamada

¿En qué puedo ayudarte?
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        try:
            user_message = update.message.text.lower()
            
            if any(word in user_message for word in ["hola", "hello", "hi", "buenos"]):
                response = "¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte hoy?"
            
            elif any(word in user_message for word in ["precio", "costo", "cuanto", "valor"]):
                response = """Nuestros precios son:
• Desarrollo web: Desde $500.000 CLP
• Chatbots: Desde $300.000 CLP
• Consultoría: $150.000 CLP/hora

¿Te interesa algún servicio específico?"""
            
            elif any(word in user_message for word in ["horario", "hora", "atencion", "disponible"]):
                response = """Nuestros horarios de atención son:
• Lunes a Viernes: 9:00 - 18:00
• Sábados: 9:00 - 14:00
• Domingos: Cerrado

¿Necesitas agendar una consulta?"""
            
            elif any(word in user_message for word in ["servicio", "producto", "que", "hacen"]):
                response = """Ofrecemos:
• Desarrollo web responsivo
• Chatbots inteligentes
• Automatización de procesos
• Consultoría en IA
• Capacitación tecnológica

¿Cuál te interesa más?"""
            
            elif any(word in user_message for word in ["contacto", "telefono", "email", "direccion"]):
                response = """Puedes contactarnos:
• Teléfono: +56 9 1234 5678
• Email: contacto@empresa.com
• Ubicación: Antofagasta, Chile

¿Prefieres que te llamemos?"""
            
            elif any(word in user_message for word in ["gracias", "thanks", "bye", "adios"]):
                response = "¡De nada! Fue un placer ayudarte. Si tienes más preguntas, no dudes en contactarnos. ¡Que tengas un excelente día!"
            
            else:
                response = f"Entiendo que preguntas sobre '{update.message.text}'. Como asistente de Mente Autónoma, puedo ayudarte con información sobre nuestros servicios, precios, horarios de atención y más. ¿Hay algo específico que te gustaría saber?"
            
            await update.message.reply_text(response)
            
        except Exception as e:
            error_message = "❌ Lo siento, hubo un error procesando tu mensaje. Intenta de nuevo."
            await update.message.reply_text(error_message)
            print(f"Error en Telegram: {e}")
    
    def run_bot(self):
        if not self.bot_token:
            print("❌ No se puede ejecutar el bot sin TELEGRAM_BOT_TOKEN")
            return
        
        print("🤖 Iniciando bot de Telegram...")
        print(f"📱 Token: {self.bot_token[:20]}...")
        print("✅ Bot activo - Busca tu bot en Telegram")
        self.application.run_polling()

def main():
    print("🚀 Iniciando Bot de Telegram...")
    bot = TelegramBot()
    bot.run_bot()

if __name__ == "__main__":
    main()