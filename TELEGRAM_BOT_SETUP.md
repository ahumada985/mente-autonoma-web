# 📱 Configuración del Bot de Telegram

## 🚀 Pasos para Crear y Configurar el Bot

### 1. Crear el Bot de Telegram

1. **Abre Telegram** y busca `@BotFather`
2. **Envía el comando:** `/start`
3. **Crea un nuevo bot:** `/newbot`
4. **Escoge un nombre:** `Mente Autónoma Notificaciones`
5. **Escoge un username:** `mente_autonoma_notify_bot` (debe terminar en "_bot")
6. **Guarda el Token** que te da BotFather

### 2. Obtener tu Chat ID

1. **Envía un mensaje** a tu bot recién creado
2. **Ve a esta URL** (reemplaza `TU_BOT_TOKEN`):
   ```
   https://api.telegram.org/botTU_BOT_TOKEN/getUpdates
   ```
3. **Busca tu Chat ID** en el JSON que aparece:
   ```json
   {
     "result": [{
       "message": {
         "chat": {
           "id": 123456789  <- Este es tu CHAT_ID
         }
       }
     }]
   }
   ```

### 3. Configurar Variables de Entorno

Agrega estas líneas al archivo `.env.local`:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHijKLmnOPqrsTUVwxYZ
TELEGRAM_CHAT_ID=123456789
```

### 4. Probar el Bot

Una vez configurado, puedes probar con:

**Método 1 - Navegador:**
```
http://localhost:3004/api/send-telegram-notification?test=true
```

**Método 2 - Comando curl:**
```bash
curl -X POST http://localhost:3004/api/send-telegram-notification \
  -H "Content-Type: application/json" \
  -d '{
    "type": "technical_error",
    "data": {
      "errorType": "Prueba",
      "errorMessage": "Test del bot de Telegram",
      "sessionId": "test"
    }
  }'
```

## 🎯 Tipos de Notificaciones Disponibles

### 1. **Nuevo Lead** 🎯
```
🎯 NUEVO LEAD CAPTURADO
👤 Nombre: Juan Pérez
📧 Email: juan@example.com
📱 Teléfono: +56912345678
💬 Mensaje: Interesado en sus servicios
🚀 Acción: ¡Contactar dentro de 2 horas!
```

### 2. **Baja Satisfacción** ⚠️
```
⚠️ ALERTA: BAJA SATISFACCIÓN
⭐ Rating: 1/5
👤 Usuario: session_123
💬 Comentario: No me ayudó
🔧 Acción: Revisar y mejorar respuesta del chatbot
```

### 3. **Error Técnico** 🚨
```
🚨 ERROR TÉCNICO DETECTADO
⚡ Tipo: Cuota OpenAI agotada
📋 Mensaje: insufficient_quota
👤 Usuario Afectado: session_456
🛠️ Acción: Revisar sistema inmediatamente
```

### 4. **Resumen Diario** 📊
```
📊 RESUMEN DIARIO - CHATBOT
📈 Métricas del día:
💬 Conversaciones: 45
👥 Usuarios únicos: 32
📝 Total mensajes: 127
⭐ Satisfacción promedio: 4.2
💡 Insight: ¡Día muy activo! Alto volumen de conversaciones.
```

## 🔧 Ventajas del Bot vs Email

✅ **Notificaciones instantáneas** (push al móvil)
✅ **No se pierden en spam**
✅ **Más rápido que email**
✅ **Fácil de leer en el móvil**
✅ **Formato más limpio**

## 🛠️ Troubleshooting

### Error: "Bot Token no configurado"
- Verifica que `TELEGRAM_BOT_TOKEN` esté en `.env.local`
- Reinicia el servidor de desarrollo

### Error: "Chat ID no configurado"
- Verifica que `TELEGRAM_CHAT_ID` esté en `.env.local`
- Asegúrate de que sea un número, no texto

### No llegan mensajes
- Verifica que hayas enviado al menos un mensaje al bot
- Usa `/start` en el bot para activarlo

## 📱 Uso en Producción

Para uso en producción:
1. **Reinicia el servidor** después de configurar variables
2. **El bot funciona 24/7** automáticamente
3. **Recibirás notificaciones inmediatas** de todos los eventos

¡Ya tienes notificaciones instantáneas para tu chatbot! 🚀