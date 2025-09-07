"""
Sistema de Logging para Chatbot Multicanal
Integra con el dashboard de monitoreo
"""

import time
from datetime import datetime
from typing import Dict, Any
from .dashboard import monitor

class ChatbotLogger:
    def __init__(self):
        self.monitor = monitor
    
    def log_message(self, user_id: str, channel: str, message: str, response: str, response_time: float, success: bool = True):
        """Registrar mensaje en el sistema de monitoreo"""
        try:
            self.monitor.log_message(
                user_id=user_id,
                channel=channel,
                message=message,
                response=response,
                response_time=response_time,
                success=success
            )
            print(f"✅ Mensaje registrado: {channel} - {user_id}")
        except Exception as e:
            print(f"❌ Error registrando mensaje: {e}")
    
    def log_error(self, error_message: str, channel: str):
        """Registrar error en el sistema de monitoreo"""
        try:
            self.monitor.log_error(error_message, channel)
            print(f"❌ Error registrado: {channel} - {error_message}")
        except Exception as e:
            print(f"❌ Error registrando error: {e}")
    
    def get_channel_stats(self, channel: str) -> Dict[str, Any]:
        """Obtener estadísticas de un canal específico"""
        try:
            stats = self.monitor.get_stats()
            return {
                "total_messages": stats["channels"].get(channel, 0),
                "success_rate": stats["success_rate"],
                "avg_response_time": stats["avg_response_time"]
            }
        except Exception as e:
            print(f"❌ Error obteniendo estadísticas: {e}")
            return {}
    
    def get_user_stats(self, user_id: str) -> Dict[str, Any]:
        """Obtener estadísticas de un usuario específico"""
        try:
            # Implementar lógica para obtener stats de usuario específico
            return {
                "user_id": user_id,
                "total_messages": 0,
                "channels_used": [],
                "last_activity": None
            }
        except Exception as e:
            print(f"❌ Error obteniendo stats de usuario: {e}")
            return {}

# Instancia global del logger
logger = ChatbotLogger()
