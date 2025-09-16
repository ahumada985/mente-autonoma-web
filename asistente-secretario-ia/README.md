# Asistente Secretario IA 🤖 - Mente Autónoma

Este es el segundo humano digital de Mente Autónoma: un asistente secretario inteligente especializado en gestión de calendario, listas y comunicación multi-plataforma.

## 🚀 Características Principales

### 📅 **Gestión de Calendario Google**
- ✅ Crear eventos automáticamente
- ✅ Editar eventos existentes
- ✅ Eliminar eventos
- ✅ Consultar disponibilidad
- ✅ Recordatorios inteligentes

### 📝 **Gestión de Listas Inteligentes**
- ✅ Lista de tareas pendientes
- ✅ Lista de ideas de negocio
- ✅ Lista de contactos importantes
- ✅ Lista de recordatorios personalizados
- ✅ Almacenamiento automático

### 💬 **Comunicación Multi-Plataforma**
- ✅ WhatsApp Business (WaAPI)
- ✅ Telegram
- ✅ Respuestas contextuales inteligentes
- ✅ Memoria de conversación

### 🤖 **Inteligencia Artificial**
- ✅ OpenAI GPT-4o Mini
- ✅ Análisis de contexto
- ✅ Respuestas personalizadas
- ✅ Toma de decisiones automática

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar credenciales en `n8n.env`:**
   - OpenAI API Key
   - WaAPI Token (WhatsApp)
   - Telegram Bot Token
   - Google Calendar Credentials

3. **Iniciar el asistente:**
```bash
start-assistant.bat
```

## 🌐 Acceso

- **Interfaz web**: http://localhost:5678
- **Webhook**: http://localhost:5678/webhook/asistente-secretario

## 📋 Workflows Incluidos

### 🤖 **Asistente Secretario Completo**
- **Función**: Gestión completa de calendario y listas
- **Plataformas**: WhatsApp + Telegram
- **Herramientas**: Google Calendar + OpenAI
- **Memoria**: Conversación persistente

## ⚙️ Configuración Requerida

### **1. OpenAI API**
```env
OPENAI_API_KEY=sk-...
```

### **2. WhatsApp (WaAPI)**
```env
WAAPI_INSTANCE_ID=70972
WAAPI_TOKEN=tu-token-aqui
```

### **3. Telegram**
```env
TELEGRAM_BOT_TOKEN=tu-bot-token-aqui
```

### **4. Google Calendar**
```env
GOOGLE_CALENDAR_CLIENT_ID=tu-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=tu-client-secret
```

## 🚀 Uso

1. **Inicia el asistente:**
   ```bash
   start-assistant.bat
   ```

2. **Abre la interfaz:**
   - Ve a http://localhost:5678

3. **Importa el workflow:**
   - Importa `asistente-secretario-completo.json`

4. **Configura credenciales:**
   - Configura OpenAI, WaAPI, Telegram y Google Calendar

5. **¡Listo!** El asistente estará funcionando

## 💰 Costos Estimados

- **WaAPI (WhatsApp)**: $6/mes
- **OpenAI**: Pago por tokens (~$5-20/mes)
- **Telegram**: Gratis
- **Google Calendar**: Gratis
- **Total**: ~$11-26/mes

## 🎯 Casos de Uso

- **Gestión de citas**: "Crea una cita mañana a las 3pm"
- **Listas de tareas**: "Agrega 'llamar al cliente' a mi lista"
- **Recordatorios**: "Recuérdame revisar el proyecto el viernes"
- **Consultas**: "¿Qué tengo programado para mañana?"
- **Ideas**: "Guarda esta idea: crear chatbot para restaurante"

## 🔧 Mantenimiento

- **Reiniciar**: Ejecuta `start-assistant.bat`
- **Logs**: Revisa la consola de n8n
- **Backup**: Los datos se guardan en `database.sqlite`
