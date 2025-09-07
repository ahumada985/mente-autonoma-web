import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from agente_real import AgenteReal
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class TelegramBotReal:
    def __init__(self):
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        if not self.bot_token:
            print("❌ TELEGRAM_BOT_TOKEN no encontrado en .env")
            return
        
        # Crear agente real
        self.agent = AgenteReal(openai_api_key=os.getenv('OPENAI_API_KEY'))
        
        self.application = Application.builder().token(self.bot_token).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        start_handler = CommandHandler("start", self.start_command)
        help_handler = CommandHandler("help", self.help_command)
        history_handler = CommandHandler("history", self.history_command)
        memory_handler = CommandHandler("memory", self.memory_command)
        message_handler = MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message)
        
        self.application.add_handler(start_handler)
        self.application.add_handler(help_handler)
        self.application.add_handler(history_handler)
        self.application.add_handler(memory_handler)
        self.application.add_handler(message_handler)
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        welcome = """
🤖 ¡Hola! Soy tu asistente virtual inteligente de Mente Autónoma.

🚀 CARACTERÍSTICAS AVANZADAS:
✅ Memoria persistente de conversaciones
✅ Base de conocimientos vectorial
✅ Herramientas inteligentes
✅ Historial completo
✅ Respuestas contextuales

Puedo ayudarte con:
• Información sobre nuestros servicios
• Consultas técnicas
• Casos de éxito
• Precios y horarios
• Cualquier pregunta

Comandos:
/help - Ver ayuda
/history - Ver historial
/memory - Ver resumen de memoria
        """
        await update.message.reply_text(welcome)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        help_text = """
📋 **Comandos disponibles:**

/start - Iniciar conversación
/help - Mostrar esta ayuda
/history - Ver historial de conversaciones
/memory - Ver resumen de memoria

💡 **Características:**
• Powered by OpenAI GPT-4 + LangChain
• Base de conocimientos completa
• Memoria persistente
• Herramientas inteligentes
• Respuestas contextuales

¿En qué puedo ayudarte?
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    async def history_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Mostrar historial de conversaciones"""
        try:
            user_id = str(update.effective_user.id)
            history = self.agent.get_conversation_history(user_id)
            
            if history:
                history_text = "📚 **Historial de conversaciones:**\n\n"
                for conv in history[-5:]:  # Últimas 5 conversaciones
                    history_text += f"• {conv['message'][:50]}...\n"
                    history_text += f"  → {conv['response'][:50]}...\n\n"
            else:
                history_text = "No hay historial de conversaciones disponible."
            
            await update.message.reply_text(history_text, parse_mode='Markdown')
        except Exception as e:
            await update.message.reply_text(f"Error obteniendo historial: {e}")
    
    async def memory_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Mostrar resumen de memoria"""
        try:
            memory_summary = self.agent.get_memory_summary()
            if memory_summary:
                await update.message.reply_text(f"🧠 **Resumen de memoria:**\n\n{memory_summary}", parse_mode='Markdown')
            else:
                await update.message.reply_text("No hay resumen de memoria disponible.")
        except Exception as e:
            await update.message.reply_text(f"Error obteniendo memoria: {e}")
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar mensajes"""
        try:
            user_id = str(update.effective_user.id)
            
            # Mostrar que está procesando
            processing_message = await update.message.reply_text("🤔 Procesando con LangChain...")
            
            # Procesar con el agente real
            response = self.agent.process_message(
                message=update.message.text,
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
    
    def run_bot(self):
        if not self.bot_token:
            print("❌ No se puede ejecutar el bot sin TELEGRAM_BOT_TOKEN")
            return
        
        print("🤖 Iniciando Bot de Telegram Real...")
        print(f"📱 Token: {self.bot_token[:20]}...")
        print("✅ Bot activo con LangChain + OpenAI GPT-4")
        print("📚 Base de conocimientos activa")
        self.application.run_polling()

def main():
    print("🚀 Iniciando Bot de Telegram Real...")
    bot = TelegramBotReal()
    bot.run_bot()

if __name__ == "__main__":
    main()
