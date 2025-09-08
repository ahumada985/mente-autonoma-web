"""
Monitor de LangChain Suite - Configuración correcta
"""

import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class LangChainMonitor:
    def __init__(self):
        self.api_key = os.getenv('LANGSMITH_API_KEY')
        self.project_name = "chatbot-multicanal-mente-autonoma"
        
        if self.api_key:
            try:
                from langsmith import Client
                self.client = Client(api_key=self.api_key)
                print(f"✅ LangChain Suite configurado para proyecto: {self.project_name}")
            except ImportError:
                print("⚠️ Instala langsmith: pip install langsmith")
                self.client = None
        else:
            print("⚠️ LANGSMITH_API_KEY no encontrado en .env")
            self.client = None
    
    def log_conversation(self, user_message: str, bot_response: str, user_id: str, channel: str):
        """Registrar conversación en LangChain Suite"""
        if not self.client:
            return
        
        try:
            # Crear run en LangChain Suite
            run = self.client.create_run(
                name="chatbot-conversation",
                inputs={
                    "user_message": user_message,
                    "user_id": user_id,
                    "channel": channel
                },
                outputs={
                    "bot_response": bot_response
                },
                project_name=self.project_name
            )
            
            print(f"📊 Conversación registrada en LangChain Suite: {run.id}")
            
        except Exception as e:
            print(f"❌ Error registrando en LangChain Suite: {e}")
    
    def get_project_url(self):
        """Obtener URL del proyecto en LangChain Suite"""
        if self.client:
            return f"https://smith.langchain.com/projects/{self.project_name}"
        return None

# Instancia global del monitor
langchain_monitor = LangChainMonitor()

def setup_langchain_suite():
    """Configurar LangChain Suite"""
    print("🔧 Configurando LangChain Suite...")
    
    if not os.getenv('LANGSMITH_API_KEY'):
        print("📝 Para configurar LangChain Suite:")
        print("1. Ve a: https://smith.langchain.com/")
        print("2. Regístrate o inicia sesión")
        print("3. Crea un proyecto")
        print("4. Obtén tu API key")
        print("5. Agrega a .env: LANGSMITH_API_KEY=tu_api_key_aqui")
        print("6. Instala: pip install langsmith")
        return False
    
    return True

if __name__ == "__main__":
    setup_langchain_suite()
