"""
Dashboard de Monitoreo para Chatbot Multicanal
Muestra estadísticas, conversaciones y métricas en tiempo real
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List
import sqlite3
import os

class ChatbotMonitor:
    def __init__(self):
        self.db_path = "monitoring/chatbot_stats.db"
        self.init_database()
        self.active_connections: List[WebSocket] = []
        self.stats = {
            "total_messages": 0,
            "active_users": 0,
            "channels": {
                "whatsapp": 0,
                "web": 0,
                "telegram": 0
            },
            "response_times": [],
            "errors": 0,
            "success_rate": 0
        }
    
    def init_database(self):
        """Inicializar base de datos SQLite para estadísticas"""
        os.makedirs("monitoring", exist_ok=True)
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Tabla de mensajes
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                channel TEXT,
                message TEXT,
                response TEXT,
                response_time REAL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                success BOOLEAN
            )
        """)
        
        # Tabla de usuarios activos
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS active_users (
                user_id TEXT PRIMARY KEY,
                channel TEXT,
                last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
                message_count INTEGER DEFAULT 0
            )
        """)
        
        # Tabla de errores
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS errors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                error_message TEXT,
                channel TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        conn.close()
    
    def log_message(self, user_id: str, channel: str, message: str, response: str, response_time: float, success: bool = True):
        """Registrar mensaje en la base de datos"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO messages (user_id, channel, message, response, response_time, success)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (user_id, channel, message, response, response_time, success))
        
        # Actualizar usuario activo
        cursor.execute("""
            INSERT OR REPLACE INTO active_users (user_id, channel, last_activity, message_count)
            VALUES (?, ?, CURRENT_TIMESTAMP, 
                COALESCE((SELECT message_count FROM active_users WHERE user_id = ?), 0) + 1)
        """, (user_id, channel, user_id))
        
        conn.commit()
        conn.close()
        
        # Actualizar estadísticas en memoria
        self.update_stats(channel, response_time, success)
    
    def log_error(self, error_message: str, channel: str):
        """Registrar error en la base de datos"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO errors (error_message, channel)
            VALUES (?, ?)
        """, (error_message, channel))
        
        conn.commit()
        conn.close()
        
        self.stats["errors"] += 1
    
    def update_stats(self, channel: str, response_time: float, success: bool):
        """Actualizar estadísticas en tiempo real"""
        self.stats["total_messages"] += 1
        self.stats["channels"][channel] += 1
        self.stats["response_times"].append(response_time)
        
        if not success:
            self.stats["errors"] += 1
        
        # Calcular tasa de éxito
        total = self.stats["total_messages"]
        errors = self.stats["errors"]
        self.stats["success_rate"] = ((total - errors) / total * 100) if total > 0 else 100
        
        # Mantener solo últimos 100 tiempos de respuesta
        if len(self.stats["response_times"]) > 100:
            self.stats["response_times"] = self.stats["response_times"][-100:]
    
    def get_stats(self) -> Dict:
        """Obtener estadísticas actuales"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Usuarios activos en las últimas 24 horas
        cursor.execute("""
            SELECT COUNT(DISTINCT user_id) FROM active_users 
            WHERE last_activity > datetime('now', '-1 day')
        """)
        active_users = cursor.fetchone()[0]
        
        # Mensajes por canal en las últimas 24 horas
        cursor.execute("""
            SELECT channel, COUNT(*) FROM messages 
            WHERE timestamp > datetime('now', '-1 day')
            GROUP BY channel
        """)
        channel_stats = dict(cursor.fetchall())
        
        # Tiempo promedio de respuesta
        cursor.execute("""
            SELECT AVG(response_time) FROM messages 
            WHERE timestamp > datetime('now', '-1 day')
        """)
        avg_response_time = cursor.fetchone()[0] or 0
        
        conn.close()
        
        return {
            **self.stats,
            "active_users_24h": active_users,
            "channel_stats_24h": channel_stats,
            "avg_response_time": round(avg_response_time, 2)
        }
    
    def get_recent_messages(self, limit: int = 50) -> List[Dict]:
        """Obtener mensajes recientes"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT user_id, channel, message, response, response_time, timestamp, success
            FROM messages 
            ORDER BY timestamp DESC 
            LIMIT ?
        """, (limit,))
        
        messages = []
        for row in cursor.fetchall():
            messages.append({
                "user_id": row[0],
                "channel": row[1],
                "message": row[2],
                "response": row[3],
                "response_time": row[4],
                "timestamp": row[5],
                "success": bool(row[6])
            })
        
        conn.close()
        return messages
    
    async def connect_websocket(self, websocket: WebSocket):
        """Conectar WebSocket para actualizaciones en tiempo real"""
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect_websocket(self, websocket: WebSocket):
        """Desconectar WebSocket"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
    
    async def broadcast_update(self, data: Dict):
        """Enviar actualización a todos los WebSockets conectados"""
        for websocket in self.active_connections[:]:
            try:
                await websocket.send_text(json.dumps(data))
            except:
                self.disconnect_websocket(websocket)

# Crear instancia global del monitor
monitor = ChatbotMonitor()

# FastAPI app para el dashboard
app = FastAPI(title="Chatbot Monitoring Dashboard")

@app.get("/")
async def get_dashboard():
    """Página principal del dashboard"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Chatbot Monitoring Dashboard</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .dashboard { max-width: 1200px; margin: 0 auto; }
            .header { background: #007bff; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
            .stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .stat-value { font-size: 2em; font-weight: bold; color: #007bff; }
            .stat-label { color: #666; margin-top: 5px; }
            .messages-container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .message-item { border-bottom: 1px solid #eee; padding: 10px 0; }
            .message-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .channel-badge { padding: 2px 8px; border-radius: 12px; font-size: 0.8em; color: white; }
            .whatsapp { background: #25D366; }
            .web { background: #007bff; }
            .telegram { background: #0088cc; }
            .success { color: #28a745; }
            .error { color: #dc3545; }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <div class="header">
                <h1>🤖 Chatbot Monitoring Dashboard</h1>
                <p>Monitoreo en tiempo real de tu chatbot multicanal</p>
            </div>
            
            <div class="stats-grid" id="statsGrid">
                <!-- Las estadísticas se cargarán aquí -->
            </div>
            
            <div class="messages-container">
                <h3>📱 Mensajes Recientes</h3>
                <div id="messagesList">
                    <!-- Los mensajes se cargarán aquí -->
                </div>
            </div>
        </div>

        <script>
            const ws = new WebSocket("ws://localhost:8001/ws");
            
            ws.onopen = function(event) {
                console.log("Conectado al dashboard");
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                updateDashboard(data);
            };
            
            function updateDashboard(data) {
                // Actualizar estadísticas
                document.getElementById('statsGrid').innerHTML = `
                    <div class="stat-card">
                        <div class="stat-value">${data.total_messages}</div>
                        <div class="stat-label">Total Mensajes</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${data.active_users_24h}</div>
                        <div class="stat-label">Usuarios Activos (24h)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${data.success_rate.toFixed(1)}%</div>
                        <div class="stat-label">Tasa de Éxito</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${data.avg_response_time}s</div>
                        <div class="stat-label">Tiempo Promedio</div>
                    </div>
                `;
                
                // Actualizar mensajes
                const messagesHtml = data.recent_messages.map(msg => `
                    <div class="message-item">
                        <div class="message-header">
                            <span class="channel-badge ${msg.channel}">${msg.channel.toUpperCase()}</span>
                            <span class="${msg.success ? 'success' : 'error'}">${msg.success ? '✅' : '❌'}</span>
                        </div>
                        <div><strong>Usuario:</strong> ${msg.user_id}</div>
                        <div><strong>Mensaje:</strong> ${msg.message}</div>
                        <div><strong>Respuesta:</strong> ${msg.response}</div>
                        <div><strong>Tiempo:</strong> ${msg.response_time}s | ${msg.timestamp}</div>
                    </div>
                `).join('');
                
                document.getElementById('messagesList').innerHTML = messagesHtml;
            }
            
            // Cargar datos iniciales
            fetch('/api/stats')
                .then(response => response.json())
                .then(data => updateDashboard(data));
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/api/stats")
async def get_stats():
    """API para obtener estadísticas"""
    stats = monitor.get_stats()
    stats["recent_messages"] = monitor.get_recent_messages(20)
    return stats

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket para actualizaciones en tiempo real"""
    await monitor.connect_websocket(websocket)
    
    try:
        while True:
            # Enviar actualizaciones cada 5 segundos
            await asyncio.sleep(5)
            stats = monitor.get_stats()
            stats["recent_messages"] = monitor.get_recent_messages(20)
            await monitor.broadcast_update(stats)
            
    except WebSocketDisconnect:
        monitor.disconnect_websocket(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
