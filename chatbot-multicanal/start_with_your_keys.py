"""
Ejecutar Chatbot Multicanal con tus credenciales reales
OpenAI + Telegram Bot funcionando
WhatsApp opcional (sin Twilio por ahora)
"""

import os
import subprocess
import time
from multiprocessing import Process
import signal
import sys

def run_web_chat():
    """Ejecutar chat web con OpenAI"""
    print("🌐 Iniciando Chat Web con OpenAI...")
    try:
        os.system("python channels/web.py")
    except Exception as e:
        print(f"❌ Error en chat web: {e}")

def run_telegram_bot():
    """Ejecutar bot de Telegram"""
    print("📲 Iniciando Bot de Telegram...")
    try:
        os.system("python channels/telegram.py")
    except Exception as e:
        print(f"❌ Error en Telegram: {e}")

def run_dashboard():
    """Ejecutar dashboard de monitoreo"""
    print("📊 Iniciando Dashboard de Monitoreo...")
    try:
        os.system("python monitoring/dashboard.py")
    except Exception as e:
        print(f"❌ Error en dashboard: {e}")

def signal_handler(sig, frame):
    """Manejar señal de interrupción"""
    print("\n🛑 Deteniendo todos los servicios...")
    sys.exit(0)

def main():
    """Función principal"""
    print("🚀 Iniciando Chatbot Multicanal con TUS CREDENCIALES...")
    print("="*60)
    
    # Configurar manejador de señales
    signal.signal(signal.SIGINT, signal_handler)
    
    # Cargar variables de entorno
    from dotenv import load_dotenv
    load_dotenv()
    
    # Verificar credenciales
    openai_key = os.getenv('OPENAI_API_KEY')
    telegram_token = os.getenv('TELEGRAM_BOT_TOKEN')
    
    if not openai_key or openai_key.startswith('sk-your-'):
        print("❌ OpenAI API Key no configurada correctamente")
        print(f"   Valor actual: {openai_key[:20] + '...' if openai_key else 'None'}")
        return
    
    if not telegram_token or telegram_token.startswith('your-'):
        print("❌ Telegram Bot Token no configurado correctamente")
        print(f"   Valor actual: {telegram_token[:20] + '...' if telegram_token else 'None'}")
        return
    
    print("✅ OpenAI API Key: Configurada")
    print("✅ Telegram Bot Token: Configurado")
    print("⚠️  WhatsApp: Sin Twilio (opcional)")
    print("="*60)
    
    # Crear directorios necesarios
    os.makedirs("knowledge", exist_ok=True)
    os.makedirs("knowledge_db", exist_ok=True)
    os.makedirs("monitoring", exist_ok=True)
    
    # Crear archivos de conocimiento
    create_sample_knowledge_files()
    
    # Iniciar servicios
    processes = []
    
    try:
        print("\n🚀 Iniciando servicios...")
        
        # Proceso Web Chat
        web_process = Process(target=run_web_chat)
        web_process.start()
        processes.append(web_process)
        time.sleep(3)
        
        # Proceso Telegram
        telegram_process = Process(target=run_telegram_bot)
        telegram_process.start()
        processes.append(telegram_process)
        time.sleep(3)
        
        # Proceso Dashboard
        dashboard_process = Process(target=run_dashboard)
        dashboard_process.start()
        processes.append(dashboard_process)
        time.sleep(3)
        
        print("\n✅ SERVICIOS INICIADOS CORRECTAMENTE")
        print("="*60)
        print("🌐 CHAT WEB: http://localhost:8000")
        print("📲 TELEGRAM: Bot activo (busca tu bot en Telegram)")
        print("📊 DASHBOARD: http://localhost:8001")
        print("="*60)
        print("\n📋 INSTRUCCIONES:")
        print("1. Abre http://localhost:8000 en tu navegador")
        print("2. Prueba el chat web con OpenAI")
        print("3. Ve a http://localhost:8001 para ver el dashboard")
        print("4. Busca tu bot en Telegram y envíale /start")
        print("\nPresiona Ctrl+C para detener todos los servicios")
        
        # Esperar a que terminen los procesos
        for process in processes:
            process.join()
            
    except KeyboardInterrupt:
        print("\n🛑 Deteniendo servicios...")
        for process in processes:
            process.terminate()
        print("✅ Servicios detenidos")

def create_sample_knowledge_files():
    """Crear archivos de conocimiento de ejemplo"""
    
    # Información de la empresa
    empresa_info = """
    INFORMACIÓN DE LA EMPRESA
    
    Nombre: Mente Autónoma
    Descripción: Especialistas en desarrollo de software e inteligencia artificial
    Ubicación: Antofagasta, Chile
    Año de fundación: 2024
    
    MISIÓN:
    Democratizar el acceso a la tecnología de inteligencia artificial para pequeñas y medianas empresas.
    
    VISIÓN:
    Ser la empresa líder en soluciones de IA para PyMEs en Latinoamérica.
    
    VALORES:
    - Innovación constante
    - Transparencia
    - Compromiso con el cliente
    - Excelencia técnica
    """
    
    # Productos y servicios
    productos_servicios = """
    PRODUCTOS Y SERVICIOS
    
    DESARROLLO WEB:
    - Sitios web responsivos
    - Aplicaciones web progresivas (PWA)
    - E-commerce personalizado
    - Integración con sistemas de pago
    
    INTELIGENCIA ARTIFICIAL:
    - Chatbots inteligentes
    - Automatización de procesos
    - Análisis de datos
    - Machine Learning personalizado
    
    CONSULTORÍA TECNOLÓGICA:
    - Auditoría de sistemas
    - Migración a la nube
    - Optimización de procesos
    - Capacitación en IA
    
    PRECIOS:
    - Desarrollo web: Desde $500.000 CLP
    - Chatbots: Desde $300.000 CLP
    - Consultoría: $150.000 CLP/hora
    """
    
    # Políticas
    politicas = """
    POLÍTICAS DE LA EMPRESA
    
    HORARIOS DE ATENCIÓN:
    - Lunes a Viernes: 9:00 - 18:00
    - Sábados: 9:00 - 14:00
    - Domingos: Cerrado
    
    MÉTODOS DE PAGO:
    - Transferencia bancaria
    - Tarjeta de crédito/débito
    - PayPal
    - WebPay Plus
    
    POLÍTICA DE GARANTÍA:
    - 30 días de garantía en desarrollo web
    - 90 días de soporte técnico incluido
    - Mantenimiento opcional disponible
    
    POLÍTICA DE PRIVACIDAD:
    - No compartimos datos personales
    - Cumplimiento con LGPD
    - Encriptación de datos sensibles
    """
    
    # FAQ
    faq = """
    PREGUNTAS FRECUENTES
    
    P: ¿Cuánto tiempo toma desarrollar un sitio web?
    R: Depende de la complejidad. Sitios básicos: 2-3 semanas. E-commerce: 4-6 semanas.
    
    P: ¿Ofrecen mantenimiento después del desarrollo?
    R: Sí, ofrecemos planes de mantenimiento mensuales con descuentos especiales.
    
    P: ¿Pueden integrar mi sitio con sistemas existentes?
    R: Sí, tenemos experiencia en integración con ERPs, CRMs y sistemas de pago.
    
    P: ¿Qué incluye el soporte técnico?
    R: Corrección de errores, actualizaciones de seguridad, respaldo de datos y monitoreo.
    
    P: ¿Trabajan con empresas fuera de Antofagasta?
    R: Sí, trabajamos con clientes de toda Latinoamérica de forma remota.
    
    P: ¿Ofrecen capacitación en IA?
    R: Sí, ofrecemos cursos personalizados para equipos empresariales.
    """
    
    # Escribir archivos
    with open("knowledge/empresa_info.txt", "w", encoding="utf-8") as f:
        f.write(empresa_info)
    
    with open("knowledge/productos_servicios.txt", "w", encoding="utf-8") as f:
        f.write(productos_servicios)
    
    with open("knowledge/politicas.txt", "w", encoding="utf-8") as f:
        f.write(politicas)
    
    with open("knowledge/faq.txt", "w", encoding="utf-8") as f:
        f.write(faq)
    
    print("✅ Archivos de conocimiento creados")

if __name__ == "__main__":
    main()
