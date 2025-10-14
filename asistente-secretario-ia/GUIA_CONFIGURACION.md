# 🔧 Guía de Configuración Completa

## ✅ Estado Actual

### Completado:
- ✅ Base de datos Supabase configurada con 6 tablas
- ✅ Extensión pgvector habilitada para RAG
- ✅ Proyecto Next.js 15 creado con TypeScript
- ✅ Servicios implementados (OpenAI, RAG, Listas)
- ✅ APIs REST creadas (/api/chat, /api/lists, /api/telegram/webhook)
- ✅ Dashboard web básico
- ✅ Dependencias instaladas

### Pendiente:
- ⏳ Configurar variables de entorno (.env.local)
- ⏳ Obtener tokens y API keys
- ⏳ Configurar Telegram webhook
- ⏳ Probar localmente
- ⏳ Deploy en Vercel

---

## 📍 Ubicación del Proyecto

```
C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app\
```

---

## 🔑 Paso 1: Obtener API Keys

### 1.1 Supabase Keys

Ve a: https://supabase.com/dashboard/project/lgqkqndlodyaqahbixtw/settings/api

Copia:
- **Project URL**: Ya tienes → `https://lgqkqndlodyaqahbixtw.supabase.co`
- **anon/public key**: Busca "Project API keys" → Copia la key "anon public"
- **service_role key**: En la misma sección, copia la "service_role" key (⚠️ NUNCA la expongas en el cliente)

### 1.2 OpenAI API Key

1. Ve a: https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Cópiala (solo se muestra una vez)

### 1.3 Telegram Bot Token

#### Si ya tienes un bot:
1. Busca tu conversación con @BotFather en Telegram
2. Envía `/token`
3. Selecciona tu bot
4. Copia el token (formato: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### Si NO tienes bot:
1. Abre Telegram y busca @BotFather
2. Envía `/newbot`
3. Sigue las instrucciones:
   - Nombre del bot: "Super Humano Digital"
   - Username: `superhumano_bot` (debe terminar en `_bot`)
4. Copia el token que te da

---

## 🔐 Paso 2: Configurar Variables de Entorno

En la carpeta del proyecto:

```bash
cd C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app
```

Crea el archivo `.env.local` (copia desde `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://lgqkqndlodyaqahbixtw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # TU KEY AQUÍ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # TU KEY AQUÍ

# OpenAI
OPENAI_API_KEY=sk-proj-...  # TU KEY AQUÍ

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz  # TU TOKEN AQUÍ
TELEGRAM_WEBHOOK_SECRET=mi_secreto_super_seguro_123  # CUALQUIER STRING

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **IMPORTANTE**: `.env.local` NO se sube a Git (está en .gitignore)

---

## 🚀 Paso 3: Probar Localmente

### 3.1 Iniciar servidor de desarrollo

```bash
cd C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app
npm run dev
```

Deberías ver:
```
  ▲ Next.js 15.5.5
  - Local:        http://localhost:3000
```

### 3.2 Verificar páginas

- **Landing**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

### 3.3 Probar API de listas

```bash
# Crear lista
curl -X POST http://localhost:3000/api/lists \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": 123456789,
    "tipo": "supermercado",
    "items": ["leche", "pan", "huevos"],
    "action": "add"
  }'

# Obtener listas
curl http://localhost:3000/api/lists?chatId=123456789
```

### 3.4 Probar API de chat con RAG

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Agregar manzanas a mi lista de supermercado",
    "chatId": 123456789
  }'
```

---

## 🤖 Paso 4: Configurar Telegram Bot (Local con ngrok)

Para probar el bot en desarrollo local, necesitas exponer tu localhost:

### 4.1 Instalar ngrok

1. Ve a: https://ngrok.com/download
2. Descarga e instala
3. Registra una cuenta gratuita

### 4.2 Iniciar ngrok

```bash
ngrok http 3000
```

Copia la URL HTTPS (ejemplo: `https://abc123.ngrok.io`)

### 4.3 Configurar webhook

```bash
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://abc123.ngrok.io/api/telegram/webhook",
    "secret_token": "mi_secreto_super_seguro_123"
  }'
```

Respuesta esperada:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### 4.4 Probar el bot

1. Abre Telegram
2. Busca tu bot (ej: `@superhumano_bot`)
3. Envía: "Agregar leche a mi lista de supermercado"
4. Deberías recibir una respuesta

---

## 🌐 Paso 5: Deploy en Vercel (Producción)

### 5.1 Preparar repositorio Git

```bash
cd C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app

# Inicializar git
git init

# Agregar archivos
git add .
git commit -m "Initial commit: Super Humano Digital"

# Crear repo en GitHub y pushear
git remote add origin https://github.com/tu-usuario/super-humano-digital.git
git branch -M main
git push -u origin main
```

### 5.2 Deploy en Vercel

1. Ve a: https://vercel.com
2. Inicia sesión con GitHub
3. Click "Add New Project"
4. Selecciona tu repositorio
5. Configura variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` → `https://tu-proyecto.vercel.app`

6. Click "Deploy"

### 5.3 Actualizar webhook de Telegram

Una vez desplegado:

```bash
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://tu-proyecto.vercel.app/api/telegram/webhook",
    "secret_token": "mi_secreto_super_seguro_123"
  }'
```

---

## ✅ Verificación Final

### Checklist de funcionamiento:

- [ ] Servidor Next.js corriendo en local (puerto 3000)
- [ ] `/api/lists` responde correctamente
- [ ] `/api/chat` genera respuestas con OpenAI
- [ ] Dashboard muestra listas cuando ingresas chat_id
- [ ] Telegram bot recibe y responde mensajes
- [ ] Bot puede agregar items a listas
- [ ] RAG funciona (el bot recuerda conversaciones pasadas)

### Comandos útiles:

```bash
# Ver logs en desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm run start

# Verificar tipos TypeScript
npm run typecheck

# Ver estado del webhook de Telegram
curl https://api.telegram.org/bot<TU_BOT_TOKEN>/getWebhookInfo
```

---

## 🐛 Troubleshooting

### Error: "OPENAI_API_KEY is not defined"
- Verifica que `.env.local` existe
- Reinicia el servidor (`Ctrl+C` y `npm run dev`)

### Error: "Failed to generate embedding"
- Verifica que tu OpenAI API key es válida
- Revisa que tienes créditos en tu cuenta OpenAI

### Bot de Telegram no responde
- Verifica que el webhook está configurado: `getWebhookInfo`
- Revisa los logs del servidor Next.js
- Asegúrate que ngrok está corriendo (en desarrollo)

### Dashboard no carga listas
- Verifica que estás usando el chat_id correcto
- Prueba enviar un mensaje al bot primero para crear datos
- Revisa la consola del navegador (F12)

---

## 📞 Próximos Pasos

1. ✅ Configurar todo según esta guía
2. ⏳ Probar localmente todas las funciones
3. ⏳ Hacer deploy en Vercel
4. ⏳ Migrar datos de Google Sheets (si tienes)
5. ⏳ Agregar funcionalidades adicionales:
   - Sistema de recordatorios
   - Integración con Google Calendar
   - Analytics de uso
   - Autenticación de usuarios

---

**¿Necesitas ayuda?** Revisa el README.md en la carpeta del proyecto.

**Última actualización**: Octubre 14, 2025
