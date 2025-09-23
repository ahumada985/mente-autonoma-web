# 🎨 GUÍA PRÁCTICA: Widget Manual por Cliente

## 📋 PROCESO PASO A PASO PARA CADA CLIENTE

### **1. CONFIGURACIÓN INICIAL (5 minutos)**

#### **A. Crear Cliente en Sistema**
```bash
# En tu dashboard o API
POST /api/clients
{
  "id": "ferreteria_juan_2024",
  "name": "Ferretería Don Juan",
  "admin_email": "juan@ferreteria.com",
  "plan": "pro",
  "custom_prompt": "Eres el asistente de Ferretería Don Juan. Ayudas con herramientas, materiales de construcción y consejos de bricolaje.",
  "theme_colors": {
    "primary": "#FF6B35",
    "secondary": "#2E86AB"
  }
}
```

#### **B. Configurar Base de Conocimiento**
```bash
# Subir información del negocio
POST /api/knowledge-base
{
  "client_id": "ferreteria_juan_2024",
  "document_type": "about",
  "title": "Sobre Ferretería Don Juan",
  "content": "Somos una ferretería familiar con 30 años de experiencia..."
}
```

#### **C. Configurar Handoff (si es Plan Pro)**
```bash
POST /api/handoff-config
{
  "client_id": "ferreteria_juan_2024",
  "enabled": true,
  "escalation_contacts": {
    "support_email": "juan@ferreteria.com"
  }
}
```

### **2. CREAR WIDGET PERSONALIZADO (10 minutos)**

#### **Archivo: `widget-ferreteria-juan.html`**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Widget Ferretería Don Juan</title>
    <style>
        .chatbot-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #FF6B35, #F7931E);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        .chatbot-widget:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
        }
        .chat-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            display: none;
            flex-direction: column;
            z-index: 9998;
            overflow: hidden;
        }
        .chat-header {
            background: linear-gradient(135deg, #FF6B35, #F7931E);
            color: white;
            padding: 15px;
            font-weight: bold;
            display: flex;
            align-items: center;
        }
        .chat-header::before {
            content: "🔨";
            margin-right: 10px;
            font-size: 18px;
        }
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
        }
        .message {
            margin: 10px 0;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
        }
        .bot-message {
            background: #e3f2fd;
            margin-right: 40px;
            border: 1px solid #bbdefb;
        }
        .user-message {
            background: #FF6B35;
            color: white;
            margin-left: 40px;
            align-self: flex-end;
        }
        .chat-input {
            display: flex;
            padding: 15px;
            border-top: 1px solid #eee;
            background: white;
        }
        .chat-input input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 25px;
            outline: none;
            margin-right: 10px;
        }
        .chat-input button {
            background: #FF6B35;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- Widget del chatbot -->
    <div class="chatbot-widget" onclick="toggleChat()">
        💬
    </div>

    <!-- Ventana de chat -->
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            Ferretería Don Juan - Asistente Virtual
            <span style="margin-left: auto; cursor: pointer;" onclick="toggleChat()">✕</span>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                🔨 ¡Hola! Soy el asistente de Ferretería Don Juan.
                ¿En qué puedo ayudarte hoy? Puedo asesorarte sobre herramientas,
                materiales de construcción y darte consejos de bricolaje.
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="Escribe tu mensaje..."
                   onkeypress="handleEnter(event)">
            <button onclick="sendMessage()">Enviar</button>
        </div>
    </div>

    <script>
        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        }

        function handleEnter(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            if (!message) return;

            // Mostrar mensaje del usuario
            addMessage(message, 'user');
            input.value = '';

            // Mostrar indicador de escritura
            const typingDiv = addMessage('🔨 Escribiendo...', 'bot');

            try {
                // Llamar a tu API real
                const response = await fetch('/api/chat-ai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: message,
                        client_id: 'ferreteria_juan_2024',
                        session_id: 'session-' + Date.now()
                    })
                });

                const data = await response.json();

                // Remover indicador y mostrar respuesta real
                typingDiv.remove();
                addMessage(data.response || 'Disculpa, tuve un problema técnico.', 'bot');

            } catch (error) {
                typingDiv.remove();
                addMessage('Lo siento, estoy teniendo problemas técnicos. ¿Podrías intentar de nuevo?', 'bot');
            }
        }

        function addMessage(text, sender) {
            const messagesDiv = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.textContent = text;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            return messageDiv;
        }
    </script>
</body>
</html>
```

### **3. CÓDIGO PARA INSERTAR EN SITIO DEL CLIENTE**

#### **Opción A: Iframe Simple**
```html
<!-- El cliente pega esto en su sitio -->
<iframe src="https://tudominio.com/widgets/ferreteria-juan.html"
        style="position:fixed;bottom:0;right:0;width:100%;height:100%;
               border:none;pointer-events:none;z-index:9999;"
        allowtransparency="true">
</iframe>
<script>
// Permitir interacción solo con el widget
document.querySelector('iframe').style.pointerEvents = 'auto';
</script>
```

#### **Opción B: Script Dinámico**
```html
<!-- El cliente pega esto en su sitio -->
<script>
(function() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://tudominio.com/widgets/ferreteria-juan.html';
    iframe.style.cssText = `
        position:fixed;bottom:0;right:0;width:400px;height:600px;
        border:none;z-index:9999;background:transparent;
    `;
    document.body.appendChild(iframe);
})();
</script>
```

### **4. PROCESO DE ENTREGA AL CLIENTE**

#### **Email Template:**
```
Asunto: 🚀 Tu Chatbot IA está listo - Ferretería Don Juan

Hola Juan,

¡Excelente noticia! Tu chatbot IA ya está configurado y listo para usar.

🔗 PREVIEW: https://tudominio.com/widgets/ferreteria-juan.html

📋 INSTALACIÓN:
Para instalarlo en tu sitio web, simplemente pega este código antes del </body>:

[CÓDIGO AQUÍ]

✅ QUÉ INCLUYE:
- Chatbot personalizado con tus colores (naranja/azul)
- Conocimiento sobre ferretería y construcción
- Captura automática de leads
- Escalación a tu email: juan@ferreteria.com
- Analytics en tiempo real

📞 SOPORTE:
Si necesitas ayuda con la instalación, llámame al [TELÉFONO]

Saludos,
[Tu nombre]
Mente Autónoma
```

### **5. MONITOREO MANUAL (Primeros meses)**

#### **Dashboard Simple en Excel/Google Sheets:**
```
Cliente | Plan | Conversaciones/Mes | Leads | Status | Renovación
Juan    | Pro  | 850               | 23    | Activo | 15/11/2024
María   | Basic| 340               | 8     | Activo | 20/11/2024
```

#### **Alertas Manuales:**
- WhatsApp cuando cliente llega a 80% del límite
- Email semanal con reporte básico
- Llamada mensual para feedback

---

## 💰 ESCALABILIDAD MANUAL

### **1-10 clientes: 100% manual (viable)**
- Tiempo: ~3 horas por cliente nuevo
- Mantenimiento: ~1 hora/semana por cliente

### **10-25 clientes: Semi-manual (límite)**
- Tiempo: ~20 horas/semana total
- Ingresos: $1,500-3,000/mes
- **MOMENTO PARA AUTOMATIZAR**

### **25+ clientes: Automatización necesaria**
- Sistema de límites automático
- Generador de widgets automático
- Dashboard de clientes automatizado