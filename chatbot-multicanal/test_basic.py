"""
Versión de prueba del chatbot multicanal
Funciona sin credenciales para demostrar el sistema
"""

import os
import time
from datetime import datetime

# Simular variables de entorno para prueba
os.environ["OPENAI_API_KEY"] = "sk-test-key-for-demo"
os.environ["TWILIO_ACCOUNT_SID"] = "test-account-sid"
os.environ["TWILIO_AUTH_TOKEN"] = "test-auth-token"
os.environ["WHATSAPP_NUMBER"] = "+1234567890"
os.environ["TELEGRAM_BOT_TOKEN"] = "test-bot-token"

def test_web_chat():
    """Probar solo el chat web (sin APIs externas)"""
    print("🌐 Iniciando Chat Web de Prueba...")
    print("📱 Abre tu navegador en: http://localhost:8000")
    print("🤖 El chatbot responderá con mensajes de prueba")
    print("📊 Dashboard de monitoreo: http://localhost:8001")
    print("\nPresiona Ctrl+C para detener")
    
    try:
        # Ejecutar solo el servidor web
        os.system("python channels/web.py")
    except KeyboardInterrupt:
        print("\n🛑 Chat web detenido")

def test_dashboard():
    """Probar solo el dashboard"""
    print("📊 Iniciando Dashboard de Prueba...")
    print("📱 Abre tu navegador en: http://localhost:8001")
    print("📈 Verás estadísticas simuladas del chatbot")
    print("\nPresiona Ctrl+C para detener")
    
    try:
        # Ejecutar solo el dashboard
        os.system("python monitoring/dashboard.py")
    except KeyboardInterrupt:
        print("\n🛑 Dashboard detenido")

def show_menu():
    """Mostrar menú de opciones"""
    print("\n" + "="*50)
    print("🤖 CHATBOT MULTICANAL - MODO PRUEBA")
    print("="*50)
    print("1. 🌐 Probar Chat Web (http://localhost:8000)")
    print("2. 📊 Probar Dashboard (http://localhost:8001)")
    print("3. 📱 Ver estructura del proyecto")
    print("4. 🔧 Configurar credenciales")
    print("5. ❌ Salir")
    print("="*50)

def show_project_structure():
    """Mostrar estructura del proyecto"""
    print("\n📁 ESTRUCTURA DEL PROYECTO:")
    print("chatbot-multicanal/")
    print("├── core/")
    print("│   └── agent.py              # Agente principal con LangChain")
    print("├── channels/")
    print("│   ├── whatsapp.py           # Integración WhatsApp")
    print("│   ├── web.py                # Chat web con WebSockets")
    print("│   └── telegram.py           # Bot de Telegram")
    print("├── monitoring/")
    print("│   ├── dashboard.py          # Dashboard de monitoreo")
    print("│   └── logger.py             # Sistema de logging")
    print("├── knowledge/                # Base de conocimientos")
    print("│   ├── empresa_info.txt")
    print("│   ├── productos_servicios.txt")
    print("│   ├── politicas.txt")
    print("│   └── faq.txt")
    print("├── .env                      # Configuración (editar aquí)")
    print("├── start_all.py              # Ejecutar todo")
    print("└── test_basic.py             # Este archivo de prueba")

def show_credentials_help():
    """Mostrar ayuda para configurar credenciales"""
    print("\n🔧 CONFIGURAR CREDENCIALES:")
    print("\n1. OPENAI API KEY:")
    print("   • Ve a https://platform.openai.com/")
    print("   • Crea cuenta o inicia sesión")
    print("   • Ve a 'API Keys' → 'Create new secret key'")
    print("   • Copia la key y pégala en .env")
    print("   • Formato: OPENAI_API_KEY=sk-tu-key-aqui")
    
    print("\n2. TWILIO (WhatsApp):")
    print("   • Ve a https://console.twilio.com/")
    print("   • Crea cuenta gratuita")
    print("   • Obtén Account SID y Auth Token del dashboard")
    print("   • Formato: TWILIO_ACCOUNT_SID=tu-sid-aqui")
    
    print("\n3. TELEGRAM BOT:")
    print("   • Habla con @BotFather en Telegram")
    print("   • Usa comando /newbot")
    print("   • Sigue las instrucciones")
    print("   • Formato: TELEGRAM_BOT_TOKEN=tu-token-aqui")
    
    print("\n4. EDITAR ARCHIVO .env:")
    print("   • Abre .env con Bloc de notas")
    print("   • Reemplaza las líneas con tus credenciales")
    print("   • Guarda el archivo")
    print("   • Ejecuta: python start_all.py")

def main():
    """Función principal"""
    while True:
        show_menu()
        choice = input("\nSelecciona una opción (1-5): ").strip()
        
        if choice == "1":
            test_web_chat()
        elif choice == "2":
            test_dashboard()
        elif choice == "3":
            show_project_structure()
        elif choice == "4":
            show_credentials_help()
        elif choice == "5":
            print("\n👋 ¡Hasta luego!")
            break
        else:
            print("\n❌ Opción inválida. Intenta de nuevo.")
        
        input("\nPresiona Enter para continuar...")

if __name__ == "__main__":
    main()
