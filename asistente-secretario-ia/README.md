# 🤖 Asistente Secretario IA con n8n

Un asistente inteligente que gestiona tu calendario a través de Telegram usando OpenAI y n8n.

## 🌟 Características

- 📱 **Integración con Telegram** - Recibe comandos por texto y voz
- 🎤 **Reconocimiento de voz** - Usa Whisper de OpenAI para transcribir audio
- 🧠 **IA Inteligente** - Analiza solicitudes y determina acciones con GPT-4
- 📅 **Gestión de calendario** - Crear, ver, actualizar y eliminar eventos
- 💾 **Memoria básica** - Recuerda conversaciones anteriores
- ⚡ **Automatización con n8n** - Flujo de trabajo visual y configurable

## 🚀 Instalación y Configuración

### 1. Configurar Bot de Telegram

1. Busca **@BotFather** en Telegram
2. Envía `/newbot` y sigue las instrucciones
3. Guarda el **token** que te proporciona

### 2. Configurar Variables de Entorno

Edita el archivo `.env`:

```env
# Telegram Bot Token (reemplaza con tu token real)
TELEGRAM_BOT_TOKEN=tu_token_de_telegram_aqui

# OpenAI API Key (ya configurada desde el proyecto padre)
OPENAI_API_KEY=tu_openai_api_key

# n8n Configuration
N8N_PORT=5678
N8N_HOST=localhost
```

### 3. Iniciar el Asistente

**Opción 1: Script de inicio (Windows)**
```bash
./start.bat
```

**Opción 2: Comando directo**
```bash
npx n8n start
```

### 4. Configurar el Workflow

1. Accede a http://localhost:5678
2. Importa el workflow desde `workflows/telegram-assistant.json`
3. Configura las credenciales:
   - **Telegram Bot Token**
   - **OpenAI API Key**
4. Activa el workflow

### 5. Configurar Webhook de Telegram

Ejecuta este comando reemplazando TU_BOT_TOKEN:

```bash
curl -X POST "https://api.telegram.org/botTU_BOT_TOKEN/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url":"http://localhost:5678/webhook/telegram"}'
```

## 💬 Uso del Asistente

### Comandos por Texto

- **Crear eventos**: "Programa una reunión mañana a las 3 PM"
- **Ver calendario**: "¿Qué tengo programado para hoy?"
- **Eliminar eventos**: "Cancela la reunión de marketing"
- **Consultar disponibilidad**: "¿Estoy libre el viernes por la tarde?"

### Comandos por Voz

Envía notas de voz en español. El asistente las transcribirá automáticamente y procesará tu solicitud.

## 📁 Estructura del Proyecto

```
asistente-secretario-ia/
├── workflows/
│   └── telegram-assistant.json    # Flujo principal de n8n
├── data/
│   ├── calendar.json             # Base de datos del calendario
│   ├── memory.json              # Memoria de conversaciones
│   └── database.sqlite          # Base de datos de n8n
├── config/
├── logs/
├── .env                         # Variables de entorno
├── start.bat                    # Script de inicio
└── README.md                   # Este archivo
```

## 🔧 Funcionalidades del Workflow

### 1. Recepción de Mensajes
- Webhook de Telegram recibe mensajes
- Procesa texto y mensajes de voz

### 2. Transcripción de Voz
- Usa Whisper de OpenAI
- Convierte audio a texto en español

### 3. Análisis Inteligente
- GPT-4 analiza la intención del usuario
- Determina qué acción realizar
- Extrae parámetros necesarios

### 4. Gestión de Calendario
- **CREATE_EVENT**: Crear nuevos eventos
- **LIST_EVENTS**: Mostrar eventos próximos
- **DELETE_EVENT**: Eliminar eventos
- **UPDATE_EVENT**: Modificar eventos existentes
- **CHECK_AVAILABILITY**: Verificar disponibilidad

### 5. Memoria y Contexto
- Guarda historial de conversaciones
- Mantiene contexto entre sesiones
- Perfil básico del usuario

## 🎯 Ejemplos de Uso

### Crear Evento
**Usuario**: "Programa una cita con el dentista el lunes a las 10:30 AM"
**Asistente**: "✅ Evento \"Cita con el dentista\" creado para el 2024-01-15 a las 10:30"

### Ver Calendario
**Usuario**: "¿Qué tengo para esta semana?"
**Asistente**:
```
📅 Próximos eventos:

• Reunión de equipo
  📅 2024-01-15 a las 09:00
  📍 Sala de conferencias

• Cita con el dentista
  📅 2024-01-15 a las 10:30
  📍 Sin ubicación
```

### Eliminar Evento
**Usuario**: "Cancela la reunión de equipo"
**Asistente**: "🗑️ Evento \"Reunión de equipo\" eliminado"

## 🔒 Seguridad

- Las API keys están protegidas en variables de entorno
- El calendario se almacena localmente
- Webhook con validación de origen

## 🛠️ Personalización

### Modificar Horarios de Trabajo
Edita `data/calendar.json`:

```json
{
  "settings": {
    "workingHours": {
      "start": "08:00",
      "end": "20:00"
    },
    "workingDays": [1, 2, 3, 4, 5, 6]
  }
}
```

### Cambiar Zona Horaria
Modifica en `.env`:
```env
TIMEZONE=America/Santiago
```

## 📞 Soporte

Para problemas o sugerencias:
- Revisa los logs en `logs/`
- Verifica la configuración en `.env`
- Asegúrate de que el webhook esté configurado correctamente

## 🎉 ¡Listo para usar!

Tu asistente secretario IA está configurado y listo para gestionar tu calendario a través de Telegram. ¡Comienza enviando un mensaje a tu bot!