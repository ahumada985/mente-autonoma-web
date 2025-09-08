"""
Servicio de Email Automático para Suscripciones
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

class EmailService:
    def __init__(self):
        self.email_user = os.getenv('EMAIL_USER')
        self.email_pass = os.getenv('EMAIL_PASS')
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        
    def send_welcome_email(self, subscriber_email: str, subscriber_name: str = None):
        """Enviar email de bienvenida a nuevo suscriptor"""
        try:
            # Crear mensaje
            msg = MIMEMultipart()
            msg['From'] = self.email_user
            msg['To'] = subscriber_email
            msg['Subject'] = "¡Bienvenido a Mente Autónoma! 🚀"
            
            # Contenido del email
            if subscriber_name:
                greeting = f"Hola {subscriber_name},"
            else:
                greeting = "Hola,"
            
            body = f"""
            {greeting}
            
            ¡Gracias por suscribirte a Mente Autónoma! 🎉
            
            Estamos emocionados de tenerte en nuestra comunidad. Te mantendremos informado sobre:
            
            • 🚀 Nuevos proyectos y tecnologías
            • 💡 Tips de desarrollo web e IA
            • 📊 Casos de éxito y testimonios
            • 🎯 Ofertas especiales y promociones
            
            ¿En qué podemos ayudarte?
            
            • Desarrollo web personalizado
            • Chatbots inteligentes
            • Automatización de procesos
            • Consultoría en IA
            
            Horarios de atención:
            Lunes a Viernes: 9:00 - 18:00
            Sábados: 9:00 - 14:00
            
            Contacto:
            📧 {self.email_user}
            📱 +56 9 1234 5678
            📍 Antofagasta, Chile
            
            ¡Esperamos trabajar contigo!
            
            Saludos cordiales,
            Equipo Mente Autónoma
            
            ---
            Este email fue enviado automáticamente. Si no te suscribiste, puedes ignorarlo.
            """
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # Enviar email
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            text = msg.as_string()
            server.sendmail(self.email_user, subscriber_email, text)
            server.quit()
            
            print(f"✅ Email enviado a: {subscriber_email}")
            return True
            
        except Exception as e:
            print(f"❌ Error enviando email: {e}")
            return False
    
    def send_newsletter(self, subscriber_email: str, subject: str, content: str):
        """Enviar newsletter a suscriptor"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_user
            msg['To'] = subscriber_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(content, 'html', 'utf-8'))
            
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            text = msg.as_string()
            server.sendmail(self.email_user, subscriber_email, text)
            server.quit()
            
            print(f"✅ Newsletter enviado a: {subscriber_email}")
            return True
            
        except Exception as e:
            print(f"❌ Error enviando newsletter: {e}")
            return False
    
    def test_connection(self):
        """Probar conexión con el servidor de email"""
        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            server.quit()
            print("✅ Conexión con Gmail exitosa")
            return True
        except Exception as e:
            print(f"❌ Error de conexión: {e}")
            return False

# Ejemplo de uso
if __name__ == "__main__":
    email_service = EmailService()
    
    # Probar conexión
    if email_service.test_connection():
        # Enviar email de prueba
        email_service.send_welcome_email("test@example.com", "Usuario de Prueba")
