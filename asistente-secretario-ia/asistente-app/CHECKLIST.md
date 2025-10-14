# ✅ Checklist - Super Humano Digital

## 📋 Setup Inicial

### 1. Verificar Requisitos Previos
- [ ] Node.js v22+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Cuenta Supabase creada
- [ ] Cuenta OpenAI con créditos
- [ ] Bot de Telegram creado con @BotFather

---

## 🔑 API Keys

### 2. Obtener Credenciales

#### Supabase
- [ ] Abrir https://supabase.com/dashboard/project/lgqkqndlodyaqahbixtw/settings/api
- [ ] Copiar **Project URL**: `https://lgqkqndlodyaqahbixtw.supabase.co`
- [ ] Copiar **anon public key** (empieza con `eyJhbGci...`)
- [ ] Copiar **service_role key** (empieza con `eyJhbGci...`)

#### OpenAI
- [ ] Abrir https://platform.openai.com/api-keys
- [ ] Crear nueva API key
- [ ] Copiar key (empieza con `sk-proj-...`)
- [ ] Verificar que tienes créditos ($5+ recomendado)

#### Telegram
- [ ] Abrir Telegram y buscar @BotFather
- [ ] Si NO tienes bot: Enviar `/newbot` y seguir pasos
- [ ] Si tienes bot: Enviar `/token` y seleccionar bot
- [ ] Copiar token (formato: `123456789:ABCdef...`)

---

## ⚙️ Configuración del Proyecto

### 3. Variables de Entorno

- [ ] Navegar al proyecto:
  ```bash
  cd C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app
  ```

- [ ] Crear archivo `.env.local` (copiar desde `.env.example`):
  ```bash
  copy .env.example .env.local  # Windows
  cp .env.example .env.local    # Mac/Linux
  ```

- [ ] Abrir `.env.local` y completar:
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=https://lgqkqndlodyaqahbixtw.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # TU KEY AQUÍ
  SUPABASE_SERVICE_ROLE_KEY=eyJ...     # TU KEY AQUÍ
  OPENAI_API_KEY=sk-proj-...           # TU KEY AQUÍ
  TELEGRAM_BOT_TOKEN=123456789:ABC...  # TU TOKEN AQUÍ
  TELEGRAM_WEBHOOK_SECRET=mi_secreto_123
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```

- [ ] Guardar archivo

---

## 🚀 Pruebas Locales

### 4. Iniciar Servidor

- [ ] Instalar dependencias (si no lo hiciste):
  ```bash
  npm install
  ```

- [ ] Iniciar servidor de desarrollo:
  ```bash
  npm run dev
  ```

- [ ] Verificar que aparece:
  ```
  ▲ Next.js 15.5.5
  - Local:        http://localhost:3000
  ```

- [ ] Abrir navegador en http://localhost:3000
- [ ] Verificar que carga la landing page

---

### 5. Probar APIs

#### API de Listas
- [ ] Abrir terminal nueva (mantener servidor corriendo)
- [ ] Probar crear lista:
  ```bash
  curl -X POST http://localhost:3000/api/lists \
    -H "Content-Type: application/json" \
    -d "{\"chatId\": 999999, \"tipo\": \"test\", \"items\": [\"item1\", \"item2\"], \"action\": \"add\"}"
  ```

- [ ] Verificar respuesta exitosa con `"success": true`

- [ ] Probar obtener listas:
  ```bash
  curl http://localhost:3000/api/lists?chatId=999999
  ```

- [ ] Verificar que devuelve la lista creada

#### API de Chat
- [ ] Probar chat con RAG:
  ```bash
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d "{\"message\": \"Hola, soy un test\", \"chatId\": 999999}"
  ```

- [ ] Verificar que devuelve respuesta del AI

---

### 6. Dashboard Web

- [ ] Abrir http://localhost:3000/dashboard
- [ ] Ingresar chat_id: `999999`
- [ ] Click "Cargar"
- [ ] Verificar que aparece la lista de "test"
- [ ] Verificar que muestra los items: item1, item2

---

## 🤖 Configurar Telegram Bot

### 7. Instalar ngrok

- [ ] Descargar ngrok: https://ngrok.com/download
- [ ] Registrar cuenta en ngrok.com
- [ ] Instalar ngrok

### 8. Exponer Localhost

- [ ] En terminal nueva, ejecutar:
  ```bash
  ngrok http 3000
  ```

- [ ] Copiar URL HTTPS (ejemplo: `https://abc123.ngrok.io`)
- [ ] **NO cerrar esta terminal** (mantener ngrok corriendo)

### 9. Configurar Webhook

- [ ] Reemplazar `<TU_BOT_TOKEN>` y `<NGROK_URL>` en:
  ```bash
  curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
    -H "Content-Type: application/json" \
    -d "{\"url\": \"<NGROK_URL>/api/telegram/webhook\", \"secret_token\": \"mi_secreto_123\"}"
  ```

- [ ] Verificar respuesta: `{"ok":true,"result":true}`

### 10. Verificar Webhook

- [ ] Ejecutar:
  ```bash
  curl https://api.telegram.org/bot<TU_BOT_TOKEN>/getWebhookInfo
  ```

- [ ] Verificar que `url` apunta a tu ngrok
- [ ] Verificar que `pending_update_count: 0`

---

## 💬 Probar Bot de Telegram

### 11. Pruebas Básicas

- [ ] Abrir Telegram
- [ ] Buscar tu bot (ejemplo: `@superhumano_bot`)
- [ ] Enviar: "Hola"
- [ ] Verificar que el bot responde

### 12. Probar Listas

- [ ] Enviar: "Agregar leche, pan y huevos a mi lista de supermercado"
- [ ] Verificar que bot responde: "Agregué 3 items..."
- [ ] Enviar: "Ver mis listas"
- [ ] Verificar que muestra la lista de supermercado

### 13. Probar RAG (Memoria)

- [ ] Enviar: "Mi color favorito es azul"
- [ ] Bot responde confirmando
- [ ] Esperar 10 segundos (para que se guarde embedding)
- [ ] Enviar: "¿Cuál es mi color favorito?"
- [ ] Verificar que bot recuerda: "azul"

### 14. Verificar Dashboard

- [ ] Obtener tu chat_id (el bot debería decirlo en algún mensaje)
- [ ] Abrir http://localhost:3000/dashboard
- [ ] Ingresar tu chat_id real
- [ ] Verificar que aparecen tus listas reales

---

## 🌐 Deploy en Vercel (Producción)

### 15. Preparar Git

- [ ] Inicializar repo (si no está inicializado):
  ```bash
  git init
  ```

- [ ] Agregar archivos:
  ```bash
  git add .
  ```

- [ ] Crear commit:
  ```bash
  git commit -m "Initial commit: Super Humano Digital"
  ```

### 16. Subir a GitHub

- [ ] Crear repo en GitHub: https://github.com/new
- [ ] Nombre: `super-humano-digital`
- [ ] Privado/Público según prefieras
- [ ] NO inicializar con README
- [ ] Copiar URL del repo

- [ ] Conectar y subir:
  ```bash
  git remote add origin https://github.com/TU-USUARIO/super-humano-digital.git
  git branch -M main
  git push -u origin main
  ```

### 17. Deploy en Vercel

- [ ] Ir a https://vercel.com
- [ ] Iniciar sesión con GitHub
- [ ] Click "Add New Project"
- [ ] Seleccionar repo `super-humano-digital`
- [ ] Configurar:
  - Framework Preset: Next.js
  - Root Directory: `./`
  - Build Command: (dejar por defecto)
  - Output Directory: (dejar por defecto)

### 18. Variables de Entorno en Vercel

- [ ] En sección "Environment Variables", agregar:
  - `NEXT_PUBLIC_SUPABASE_URL` = `https://lgqkqndlodyaqahbixtw.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (tu key)
  - `SUPABASE_SERVICE_ROLE_KEY` = (tu key)
  - `OPENAI_API_KEY` = (tu key)
  - `TELEGRAM_BOT_TOKEN` = (tu token)
  - `TELEGRAM_WEBHOOK_SECRET` = `mi_secreto_123`
  - `NEXT_PUBLIC_APP_URL` = `https://tu-proyecto.vercel.app` (lo obtendrás después)

- [ ] Click "Deploy"
- [ ] Esperar 2-3 minutos

### 19. Obtener URL de Vercel

- [ ] Una vez desplegado, copiar la URL (ejemplo: `https://super-humano-digital.vercel.app`)
- [ ] Ir a "Settings" → "Environment Variables"
- [ ] Editar `NEXT_PUBLIC_APP_URL` con la URL real
- [ ] Click "Redeploy" (en tab "Deployments")

### 20. Actualizar Webhook de Telegram

- [ ] Configurar webhook en producción:
  ```bash
  curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
    -H "Content-Type: application/json" \
    -d "{\"url\": \"https://tu-proyecto.vercel.app/api/telegram/webhook\", \"secret_token\": \"mi_secreto_123\"}"
  ```

- [ ] Verificar: `{"ok":true}`

---

## ✅ Verificación Final

### 21. Tests de Producción

- [ ] Abrir https://tu-proyecto.vercel.app
- [ ] Verificar que carga la landing page

- [ ] Abrir https://tu-proyecto.vercel.app/dashboard
- [ ] Ingresar chat_id
- [ ] Verificar que carga listas

- [ ] Abrir Telegram
- [ ] Enviar mensaje al bot
- [ ] Verificar que responde correctamente
- [ ] Agregar algo a una lista
- [ ] Verificar en dashboard que aparece

---

## 🎉 ¡Listo!

Si completaste todos los checkmarks, ¡felicidades! 🚀

Tu **Super Humano Digital** está funcionando en producción con:
- ✅ RAG con memoria a largo plazo
- ✅ Listas inteligentes
- ✅ Procesamiento multimodal
- ✅ Dashboard web
- ✅ Telegram bot

---

## 🐛 Si algo falló...

Revisa:
1. **GUIA_CONFIGURACION.md** - Sección "Troubleshooting"
2. **COMANDOS_RAPIDOS.md** - Comandos de debugging
3. Logs en Vercel (tab "Logs")
4. Console del navegador (F12)

---

## 📊 Métricas de Éxito

Después de 1 semana, verifica:
- [ ] Bot responde en <2 segundos
- [ ] RAG recuerda conversaciones pasadas
- [ ] No hay errores en logs de Vercel
- [ ] Usuarios reportan satisfacción

---

**Tiempo estimado total**: 45-60 minutos
**Dificultad**: Media
**Resultado**: Bot de IA profesional funcionando 🤖

---

**¿Necesitas ayuda?** Revisa los archivos de documentación:
- `RESUMEN_PROYECTO.md` - Overview general
- `GUIA_CONFIGURACION.md` - Guía detallada
- `COMANDOS_RAPIDOS.md` - Comandos útiles
