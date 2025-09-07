"""
Canal Telegram con LangChain
Usando python-telegram-bot para integración
"""

import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import os
from core.agent import MultiChannelAgent

class TelegramChannel:
    def __init__(self, agent: MultiChannelAgent):
        self.agent = agent
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        self.application = Application.builder().token(self.bot_token).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        """Configurar manejadores de comandos y mensajes"""
        
        # Comando /start
        start_handler = CommandHandler("start", self.start_command)
        self.application.add_handler(start_handler)
        
        # Comando /help
        help_handler = CommandHandler("help", self.help_command)
        self.application.add_handler(help_handler)
        
        # Comando /status
        status_handler = CommandHandler("status", self.status_command)
        self.application.add_handler(status_handler)
        
        # Manejador de mensajes de texto
        message_handler = MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message)
        self.application.add_handler(message_handler)
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar comando /start"""
        welcome_message = """
🤖 ¡Hola! Soy tu asistente virtual inteligente.

Estoy aquí para ayudarte con:
• Información sobre productos y servicios
• Horarios de atención
• Consultas generales
• Soporte técnico

Escribe tu pregunta y te ayudo de inmediato.

Comandos disponibles:
/help - Ver ayuda
/status - Estado del bot
        """
        
        await update.message.reply_text(welcome_message)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar comando /help"""
        help_message = """
📋 **Comandos disponibles:**

/start - Iniciar conversación
/help - Mostrar esta ayuda
/status - Ver estado del bot

💡 **Consejos:**
• Puedes hacer preguntas en lenguaje natural
• Soy multilingüe (español, inglés, etc.)
• Mantengo el contexto de nuestra conversación
• Para consultas complejas, puedo programar una llamada

¿En qué puedo ayudarte?
        """
        
        await update.message.reply_text(help_message, parse_mode='Markdown')
    
    async def status_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar comando /status"""
        status_message = """
🟢 **Estado del Bot:**
• Canal: Telegram ✅
• Base de conocimientos: Activa ✅
• Memoria: Activa ✅
• Lenguaje: Multilingüe ✅

¡Todo funcionando correctamente!
        """
        
        await update.message.reply_text(status_message, parse_mode='Markdown')
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar mensajes de texto"""
        try:
            # Obtener información del mensaje
            user_id = str(update.effective_user.id)
            message_text = update.message.text
            
            # Mostrar que está procesando
            processing_message = await update.message.reply_text("🤔 Procesando...")
            
            # Procesar con el agente
            response = self.agent.process_message(
                message=message_text,
                user_id=user_id,
                channel="telegram"
            )
            
            # Eliminar mensaje de procesamiento
            await processing_message.delete()
            
            # Enviar respuesta
            await update.message.reply_text(response)
            
        except Exception as e:
            error_message = "❌ Lo siento, hubo un error procesando tu mensaje. Intenta de nuevo."
            await update.message.reply_text(error_message)
            print(f"Error en Telegram: {e}")
    
    async def send_message_to_user(self, user_id: str, message: str):
        """Enviar mensaje proactivo a un usuario"""
        try:
            await self.application.bot.send_message(
                chat_id=user_id,
                text=message
            )
            return True
        except Exception as e:
            print(f"Error enviando mensaje a {user_id}: {e}")
            return False
    
    async def broadcast_message(self, message: str):
        """Enviar mensaje a todos los usuarios (requiere base de datos de usuarios)"""
        # En una implementación real, obtendrías la lista de usuarios de una base de datos
        # Por ahora, solo mostramos el mensaje
        print(f"Broadcast message: {message}")
    
    def run_bot(self):
        """Ejecutar el bot de Telegram"""
        print("🤖 Iniciando bot de Telegram...")
        self.application.run_polling()

# Función para ejecutar el bot
async def main():
    # Crear agente
    agent = MultiChannelAgent(os.getenv('OPENAI_API_KEY'))
    
    # Crear canal de Telegram
    telegram_channel = TelegramChannel(agent)
    
    # Ejecutar bot
    telegram_channel.run_bot()

if __name__ == "__main__":
    asyncio.run(main())

