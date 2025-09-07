"""
Integración de WhatsApp con LangChain
Usando Twilio para WhatsApp Business API
"""

from twilio.rest import Client
from flask import Flask, request
import os
from core.agent import MultiChannelAgent

class WhatsAppChannel:
    def __init__(self, agent: MultiChannelAgent):
        self.agent = agent
        self.twilio_client = Client(
            os.getenv('TWILIO_ACCOUNT_SID'),
            os.getenv('TWILIO_AUTH_TOKEN')
        )
        self.whatsapp_number = os.getenv('WHATSAPP_NUMBER')
    
    def send_message(self, to: str, message: str):
        """Enviar mensaje por WhatsApp"""
        try:
            message = self.twilio_client.messages.create(
                body=message,
                from_=f'whatsapp:{self.whatsapp_number}',
                to=f'whatsapp:{to}'
            )
            return message.sid
        except Exception as e:
            print(f"Error enviando mensaje WhatsApp: {e}")
            return None
    
    def handle_incoming_message(self, request_data: dict):
        """Procesar mensaje entrante de WhatsApp"""
        try:
            # Extraer datos del webhook de Twilio
            message_body = request_data.get('Body', '')
            from_number = request_data.get('From', '')
            to_number = request_data.get('To', '')
            
            # Limpiar número de teléfono
            user_id = from_number.replace('whatsapp:', '')
            
            # Procesar con el agente
            response = self.agent.process_message(
                message=message_body,
                user_id=user_id,
                channel="whatsapp"
            )
            
            # Enviar respuesta
            self.send_message(from_number, response)
            
            return {"status": "success", "response": response}
            
        except Exception as e:
            error_msg = "Lo siento, hubo un error procesando tu mensaje."
            self.send_message(from_number, error_msg)
            return {"status": "error", "error": str(e)}

# Flask app para webhook de WhatsApp
app = Flask(__name__)

# Crear agente global
agent = MultiChannelAgent(os.getenv('OPENAI_API_KEY'))
whatsapp_channel = WhatsAppChannel(agent)

@app.route('/whatsapp/webhook', methods=['POST'])
def whatsapp_webhook():
    """Webhook para recibir mensajes de WhatsApp"""
    try:
        # Obtener datos del request
        request_data = request.form.to_dict()
        
        # Procesar mensaje
        result = whatsapp_channel.handle_incoming_message(request_data)
        
        return result, 200
        
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/whatsapp/status', methods=['GET'])
def whatsapp_status():
    """Verificar estado del canal WhatsApp"""
    return {"status": "active", "channel": "whatsapp"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)

