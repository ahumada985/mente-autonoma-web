"""
Script para iniciar todos los servicios del chatbot multicanal
Incluye el dashboard de monitoreo
"""

import os
import subprocess
import time
from multiprocessing import Process
import signal
import sys

def run_whatsapp():
    """Ejecutar servidor WhatsApp"""
    print("📱 Iniciando servidor WhatsApp...")
    os.system("python channels/whatsapp.py")

def run_web():
    """Ejecutar servidor Web"""
    print("🌐 Iniciando servidor Web...")
    os.system("python channels/web.py")

def run_telegram():
    """Ejecutar bot Telegram"""
    print("📲 Iniciando bot Telegram...")
    os.system("python channels/telegram.py")

def run_dashboard():
    """Ejecutar dashboard de monitoreo"""
    print("📊 Iniciando dashboard de monitoreo...")
    os.system("python monitoring/dashboard.py")

def signal_handler(sig, frame):
    """Manejar señal de interrupción"""
    print("\n🛑 Deteniendo todos los servicios...")
    sys.exit(0)

def main():
    """Función principal para ejecutar todos los servicios"""
    print("🚀 Iniciando Chatbot Multicanal con Dashboard de Monitoreo...")
    
    # Configurar manejador de señales
    signal.signal(signal.SIGINT, signal_handler)
    
    # Verificar variables de entorno
    required_vars = [
        'OPENAI_API_KEY',
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN',
        'WHATSAPP_NUMBER',
        'TELEGRAM_BOT_TOKEN'
    ]
    
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
        print(f"❌ Variables de entorno faltantes: {missing_vars}")
        print("Crea un archivo .env con las variables necesarias")
        return
    
    # Crear directorios necesarios
    os.makedirs("knowledge", exist_ok=True)
    os.makedirs("knowledge_db", exist_ok=True)
    os.makedirs("monitoring", exist_ok=True)
    
    # Crear archivos de conocimiento de ejemplo
    create_sample_knowledge_files()
    
    # Iniciar servicios en procesos separados
    processes = []
    
    try:
        # Proceso WhatsApp
        whatsapp_process = Process(target=run_whatsapp)
        whatsapp_process.start()
        processes.append(whatsapp_process)
        time.sleep(2)
        
        # Proceso Web
        web_process = Process(target=run_web)
        web_process.start()
        processes.append(web_process)
        time.sleep(2)
        
        # Proceso Telegram
        telegram_process = Process(target=run_telegram)
        telegram_process.start()
        processes.append(telegram_process)
        time.sleep(2)
        
        # Proceso Dashboard
        dashboard_process = Process(target=run_dashboard)
        dashboard_process.start()
        processes.append(dashboard_process)
        time.sleep(2)
        
        print("✅ Todos los servicios iniciados correctamente")
        print("\n📋 Servicios activos:")
        print("• WhatsApp: http://localhost:5000")
        print("• Web Chat: http://localhost:8000")
        print("• Telegram: Bot activo")
        print("• Dashboard: http://localhost:8001")
        print("\n🎯 Dashboard de Monitoreo:")
        print("   - Estadísticas en tiempo real")
        print("   - Mensajes recientes")
        print("   - Métricas de rendimiento")
        print("   - Errores y debugging")
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
