# ⚡ Comandos Rápidos - Super Humano Digital

## 📍 Navegar al Proyecto

```bash
cd C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia\asistente-app
```

---

## 🚀 Desarrollo Local

### Iniciar servidor
```bash
npm run dev
```
→ Abre http://localhost:3000

### Build producción
```bash
npm run build
```

### Iniciar producción
```bash
npm run start
```

### Verificar tipos TypeScript
```bash
npm run typecheck
```

---

## 🔧 Configuración

### 1. Crear .env.local
```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

Luego edita `.env.local` con tus API keys.

---

## 🤖 Telegram Bot

### Configurar webhook (desarrollo con ngrok)
```bash
# 1. Iniciar ngrok
ngrok http 3000

# 2. Configurar webhook (reemplaza <TOKEN> y <NGROK_URL>)
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://abc123.ngrok.io/api/telegram/webhook",
    "secret_token": "mi_secreto_super_seguro_123"
  }'
```

### Ver info del webhook
```bash
curl https://api.telegram.org/bot<TU_BOT_TOKEN>/getWebhookInfo
```

### Eliminar webhook
```bash
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/deleteWebhook"
```

### Configurar webhook (producción en Vercel)
```bash
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://tu-proyecto.vercel.app/api/telegram/webhook",
    "secret_token": "mi_secreto_super_seguro_123"
  }'
```

---

## 🧪 Probar APIs

### Crear lista
```bash
curl -X POST http://localhost:3000/api/lists \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": 123456789,
    "tipo": "supermercado",
    "items": ["leche", "pan", "huevos"],
    "action": "add"
  }'
```

### Obtener listas
```bash
curl http://localhost:3000/api/lists?chatId=123456789
```

### Obtener lista específica
```bash
curl "http://localhost:3000/api/lists?chatId=123456789&tipo=supermercado"
```

### Chat con RAG
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Agregar manzanas a mi lista de supermercado",
    "chatId": 123456789
  }'
```

### Eliminar lista
```bash
curl -X DELETE "http://localhost:3000/api/lists?chatId=123456789&tipo=supermercado"
```

---

## 🗄️ Supabase

### Conectar a Supabase (SQL Editor)
1. Ve a: https://supabase.com/dashboard/project/lgqkqndlodyaqahbixtw/editor
2. Ejecuta queries directamente

### Ver todas las listas
```sql
SELECT * FROM assistant_lists
ORDER BY updated_at DESC;
```

### Ver conversaciones con embeddings
```sql
SELECT
  chat_id,
  user_message,
  ai_response,
  created_at
FROM assistant_conversations
ORDER BY created_at DESC
LIMIT 10;
```

### Buscar conversaciones (RAG)
```sql
SELECT * FROM search_conversations(
  query_embedding := '[0.1, 0.2, ...]'::vector,
  user_chat_id := 123456789,
  match_threshold := 0.7,
  match_count := 5
);
```

### Estadísticas de usuario
```sql
SELECT get_user_stats(123456789);
```

### Limpiar tabla de pruebas
```sql
DELETE FROM assistant_lists WHERE chat_id = 123456789;
DELETE FROM assistant_conversations WHERE chat_id = 123456789;
```

---

## 📦 Git

### Inicializar repo
```bash
git init
git add .
git commit -m "Initial commit: Super Humano Digital"
```

### Conectar con GitHub
```bash
git remote add origin https://github.com/tu-usuario/super-humano-digital.git
git branch -M main
git push -u origin main
```

### Commits frecuentes
```bash
git add .
git commit -m "feat: descripción del cambio"
git push
```

---

## 🌐 Deploy en Vercel

### Opción 1: CLI de Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción 2: GitHub (automático)
1. Push a GitHub
2. Ve a https://vercel.com
3. Import repository
4. Configura variables de entorno
5. Deploy

---

## 🔍 Debugging

### Ver logs de Next.js
Los logs aparecen en la terminal donde ejecutaste `npm run dev`

### Ver logs de Telegram
```bash
# Webhook info
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo

# Resultado esperado:
{
  "ok": true,
  "result": {
    "url": "https://...",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "last_error_date": 0
  }
}
```

### Ver logs en Vercel (producción)
1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Tab "Logs"

---

## 📊 Monitoreo

### Ver estado de Supabase
```bash
curl https://lgqkqndlodyaqahbixtw.supabase.co/rest/v1/ \
  -H "apikey: <TU_ANON_KEY>"
```

### Verificar OpenAI API
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer <TU_OPENAI_KEY>"
```

---

## 🧹 Limpieza

### Limpiar node_modules
```bash
rm -rf node_modules
npm install
```

### Limpiar .next
```bash
rm -rf .next
npm run dev
```

---

## 🆘 Comandos de Emergencia

### Reiniciar todo
```bash
# 1. Detener servidor (Ctrl+C)

# 2. Limpiar
rm -rf node_modules .next

# 3. Reinstalar
npm install

# 4. Verificar .env.local
cat .env.local

# 5. Reiniciar
npm run dev
```

### Verificar que todo funciona
```bash
# 1. Servidor corriendo
curl http://localhost:3000

# 2. API Lists
curl http://localhost:3000/api/lists?chatId=123

# 3. Telegram webhook
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
```

---

## 📝 Notas Importantes

- **Puerto por defecto**: 3000
- **Timeout de API**: 60 segundos (Vercel free tier)
- **Max request size**: 4.5MB (Next.js)
- **Embeddings dimensions**: 1536 (OpenAI text-embedding-3-small)

---

## 🎯 Workflow Típico

### Día a día:
```bash
cd asistente-app
npm run dev
# Hacer cambios
# Ctrl+C para detener
```

### Antes de commit:
```bash
npm run typecheck
npm run build
git add .
git commit -m "feat: descripción"
git push
```

### Deploy:
```bash
git push  # Si tienes Vercel conectado a GitHub
# O
vercel --prod
```

---

**Tip**: Guarda este archivo en favoritos para acceso rápido 🚀
