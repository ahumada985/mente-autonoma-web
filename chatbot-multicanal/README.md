# 🤖 Chatbot Multicanal con LangChain

Sistema de chatbot inteligente que funciona en múltiples canales (WhatsApp, Web, Telegram) con una sola base de conocimientos compartida.

## 🚀 Características

- **Un solo agente, múltiples canales**: Misma base de conocimientos para todos los canales
- **Memoria persistente**: Mantiene contexto de conversaciones
- **RAG (Retrieval Augmented Generation)**: Base de conocimientos vectorial
- **Tiempo real**: WebSockets para chat web
- **Multilingüe**: Soporte para múltiples idiomas
- **Escalable**: Arquitectura modular y extensible

## 📋 Canales Soportados

- ✅ **WhatsApp** (Twilio API)
- ✅ **Web Chat** (WebSockets)
- ✅ **Telegram** (Bot API)
- 🔄 **Facebook Messenger** (En desarrollo)
- 🔄 **Discord** (En desarrollo)

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd chatbot-multicanal
```

### 2. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno
```bash
cp env.example .env
# Editar .env con tus credenciales
```

### 4. Configurar credenciales

#### OpenAI
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

#### Twilio (WhatsApp)
```bash
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
WHATSAPP_NUMBER=+1234567890
```

#### Telegram
```bash
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
```

## 🚀 Uso

### Ejecutar todos los canales
```bash
python main.py
```

### Ejecutar canales individuales

#### WhatsApp
```bash
python channels/whatsapp.py
```

#### Web Chat
```bash
python channels/web.py
```

#### Telegram
```bash
python channels/telegram.py
```

## 📁 Estructura del Proyecto

```
chatbot-multicanal/
├── core/
│   └── agent.py              # Agente principal con LangChain
├── channels/
│   ├── whatsapp.py           # Integración WhatsApp
│   ├── web.py                # Chat web con WebSockets
│   └── telegram.py           # Bot de Telegram
├── knowledge/                # Base de conocimientos
│   ├── empresa_info.txt
│   ├── productos_servicios.txt
│   ├── politicas.txt
│   └── faq.txt
├── knowledge_db/             # Base de datos vectorial
├── main.py                   # Punto de entrada principal
├── requirements.txt          # Dependencias
└── README.md
```

## 🔧 Configuración Avanzada

### Personalizar Base de Conocimientos

Edita los archivos en `knowledge/` para personalizar la información del chatbot:

- `empresa_info.txt`: Información de la empresa
- `productos_servicios.txt`: Catálogo de productos
- `politicas.txt`: Políticas y procedimientos
- `faq.txt`: Preguntas frecuentes

### Agregar Nuevos Canales

1. Crear archivo en `channels/nuevo_canal.py`
2. Implementar la clase del canal
3. Agregar al `main.py`

### Personalizar Respuestas

Edita el prompt en `core/agent.py` para personalizar el comportamiento del chatbot.

## 📊 Monitoreo

### Logs
Los logs se muestran en consola con información detallada de cada canal.

### Estado de Canales
- WhatsApp: `http://localhost:5000/whatsapp/status`
- Web: `http://localhost:8000/api/status`

## 🔒 Seguridad

- Variables de entorno para credenciales
- Validación de entrada en todos los canales
- Manejo de errores robusto
- Rate limiting (implementar según necesidad)

## 🚀 Despliegue

### Docker
```bash
docker build -t chatbot-multicanal .
docker run -p 5000:5000 -p 8000:8000 chatbot-multicanal
```

### Cloud
- **Heroku**: Para desarrollo
- **Google Cloud Run**: Para producción
- **AWS ECS**: Para escalabilidad

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

MIT License - ver archivo LICENSE para detalles.

## 🆘 Soporte

Para soporte técnico:
- Email: soporte@empresa.com
- WhatsApp: +56 9 1234 5678
- Telegram: @empresa_soporte

---

**Desarrollado con ❤️ usando LangChain**

