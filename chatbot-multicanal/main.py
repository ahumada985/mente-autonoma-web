"""
Sistema de Chatbot Multicanal con LangChain
Un solo agente, múltiples canales (WhatsApp, Web, Telegram, etc.)
"""

import os
import asyncio
from multiprocessing import Process
from core.agent import MultiChannelAgent
from channels.whatsapp import app as whatsapp_app
from channels.web import app as web_app
from channels.telegram import main as telegram_main

def run_whatsapp():
    """Ejecutar servidor WhatsApp"""
    print("📱 Iniciando servidor WhatsApp...")
    whatsapp_app.run(host="0.0.0.0", port=5000, debug=False)

def run_web():
    """Ejecutar servidor Web"""
    print("🌐 Iniciando servidor Web...")
    import uvicorn
    uvicorn.run(web_app, host="0.0.0.0", port=8000)

def run_telegram():
    """Ejecutar bot Telegram"""
    print("📲 Iniciando bot Telegram...")
    asyncio.run(telegram_main())

def main():
    """Función principal para ejecutar todos los canales"""
    print("🚀 Iniciando Chatbot Multicanal con LangChain...")
    
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
    
    # Crear directorio de base de conocimientos si no existe
    os.makedirs("knowledge", exist_ok=True)
    os.makedirs("knowledge_db", exist_ok=True)
    
    # Crear archivos de conocimiento de ejemplo
    create_sample_knowledge_files()
    
    # Iniciar canales en procesos separados
    processes = []
    
    try:
        # Proceso WhatsApp
        whatsapp_process = Process(target=run_whatsapp)
        whatsapp_process.start()
        processes.append(whatsapp_process)
        
        # Proceso Web
        web_process = Process(target=run_web)
        web_process.start()
        processes.append(web_process)
        
        # Proceso Telegram
        telegram_process = Process(target=run_telegram)
        telegram_process.start()
        processes.append(telegram_process)
        
        print("✅ Todos los canales iniciados correctamente")
        print("\n📋 Canales activos:")
        print("• WhatsApp: http://localhost:5000")
        print("• Web Chat: http://localhost:8000")
        print("• Telegram: Bot activo")
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

