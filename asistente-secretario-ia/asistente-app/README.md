# 🤖 Super Humano Digital - Asistente Personal Inteligente

Asistente personal con **memoria a largo plazo** usando RAG (Retrieval Augmented Generation), listas inteligentes y procesamiento multimodal.

## 🎯 Características

- ✅ **Memoria RAG** - Búsqueda semántica con embeddings (OpenAI text-embedding-3-small)
- ✅ **Listas Inteligentes** - Gestiona listas de supermercado, tareas, películas, libros
- ✅ **Multimodal** - Procesa texto, voz (Whisper) e imágenes (GPT-4o)
- ✅ **Telegram Bot** - Interfaz conversacional vía Telegram
- ✅ **Dashboard Web** - Visualiza y gestiona tus listas desde el navegador
- ✅ **Supabase + pgvector** - Base de datos PostgreSQL con vector search
- ✅ **Next.js 15** - App Router, Server Components, TypeScript

## 🏗️ Arquitectura

```
┌─────────────┐
│  Telegram   │
│     Bot     │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────────┐
│         Next.js 15 App              │
│  ┌────────────────────────────┐    │
│  │  /api/telegram/webhook     │    │
│  │  /api/chat (RAG)           │    │
│  │  /api/lists (CRUD)         │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │  Services Layer            │    │
│  │  • openai.ts (GPT, Whisper)│    │
│  │  • rag.ts (Embeddings)     │    │
│  │  • lists.ts (CRUD)         │    │
│  └────────────────────────────┘    │
└──────────────┬──────────────────────┘
               │
               ↓
┌──────────────────────────────────────┐
│         Supabase PostgreSQL          │
│  ┌──────────────────────────────┐   │
│  │  pgvector Extension          │   │
│  │  • assistant_conversations   │   │
│  │  • assistant_lists           │   │
│  │  • assistant_tasks           │   │
│  │  • assistant_reminders       │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

## 🚀 Setup

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y completa:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://lgqkqndlodyaqahbixtw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# OpenAI
OPENAI_API_KEY=tu_openai_api_key

# Telegram Bot
TELEGRAM_BOT_TOKEN=tu_telegram_bot_token
TELEGRAM_WEBHOOK_SECRET=cualquier_string_secreto

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Base de Datos

El schema SQL ya está en `../supabase_schema.sql` y debe estar ejecutado en tu Supabase.

Verifica que estas tablas existen:
- `users`
- `assistant_lists`
- `assistant_tasks`
- `assistant_conversations`
- `assistant_reminders`
- `assistant_calendar_events`

### 4. Configurar Telegram Webhook

Después de deploy, configura el webhook:

```bash
curl -X POST "https://api.telegram.org/bot<TU_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://tu-dominio.vercel.app/api/telegram/webhook",
    "secret_token": "tu_webhook_secret"
  }'
```

### 5. Ejecutar Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
asistente-app/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # API de chat con RAG
│   │   ├── lists/route.ts         # CRUD de listas
│   │   └── telegram/webhook/route.ts  # Webhook Telegram
│   ├── dashboard/page.tsx         # Dashboard web
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Layout global
│   └── globals.css                # Estilos globales
├── lib/
│   ├── services/
│   │   ├── openai.ts              # OpenAI (GPT, Whisper, Embeddings)
│   │   ├── rag.ts                 # RAG con búsqueda semántica
│   │   └── lists.ts               # Lógica de listas
│   ├── types/
│   │   └── database.ts            # Tipos TypeScript
│   └── supabase.ts                # Cliente Supabase
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🎨 Endpoints API

### POST /api/chat
Chat con RAG (búsqueda semántica de conversaciones previas)

```json
{
  "message": "Agregar leche a mi lista de supermercado",
  "chatId": 123456789
}
```

### GET /api/lists?chatId=123
Obtiene todas las listas de un usuario

### POST /api/lists
Crea o actualiza una lista

```json
{
  "chatId": 123456789,
  "tipo": "supermercado",
  "items": ["leche", "pan"],
  "action": "add"
}
```

### POST /api/telegram/webhook
Recibe mensajes de Telegram (texto, voz, imágenes)

## 🧠 Cómo Funciona el RAG

1. **Usuario envía mensaje** → "¿Qué libros agregué este mes?"
2. **Generar embedding** → Convierte texto a vector (1536 dims)
3. **Búsqueda vectorial** → `search_conversations()` en Supabase
4. **Recuperar top 5** → Conversaciones más similares (cosine similarity)
5. **Construir contexto** → Agregar al prompt de GPT
6. **Generar respuesta** → GPT-4o-mini con contexto enriquecido
7. **Guardar conversación** → Con embedding para futuras búsquedas

## 🔧 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # ESLint
npm run typecheck # TypeScript check
```

## 📊 Base de Datos

### Tabla: assistant_conversations

```sql
CREATE TABLE assistant_conversations (
  id uuid PRIMARY KEY,
  chat_id bigint NOT NULL,
  user_message text NOT NULL,
  ai_response text NOT NULL,
  embedding vector(1536),  -- OpenAI embeddings
  context_used jsonb,
  created_at timestamptz
);

-- Índice vectorial
CREATE INDEX idx_conversations_embedding
  ON assistant_conversations
  USING ivfflat (embedding vector_cosine_ops);
```

### Función RPC: search_conversations

```sql
SELECT * FROM search_conversations(
  query_embedding := '[0.1, 0.2, ...]'::vector,
  user_chat_id := 123456789,
  match_threshold := 0.7,
  match_count := 5
);
```

## 🌐 Deploy en Vercel

1. Push a GitHub
2. Conecta repo en Vercel
3. Agrega variables de entorno
4. Deploy automático

```bash
vercel --prod
```

## 💰 Costos Estimados

- **Supabase Free Tier**: $0 (hasta 500MB, 50K usuarios)
- **Vercel Free Tier**: $0 (100GB bandwidth)
- **OpenAI API**: ~$26/mes
  - GPT-4o-mini: $0.150 / 1M input tokens
  - Embeddings: $0.020 / 1M tokens
  - Whisper: $0.006 / min

**Total**: ~$26/mes con free tiers

## 📝 TODO

- [ ] Implementar sistema de recordatorios con cron job
- [ ] Agregar soporte para Google Calendar
- [ ] Implementar autenticación de usuarios
- [ ] Dashboard con analytics
- [ ] Tests unitarios y e2e
- [ ] CI/CD con GitHub Actions

## 🤝 Contribuir

Este proyecto es parte de **Mente Autónoma** (menteautonoma.cl)

## 📄 Licencia

Privado - Super Humano Digital © 2025
