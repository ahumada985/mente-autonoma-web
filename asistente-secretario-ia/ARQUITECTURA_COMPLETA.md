# 🏗️ ARQUITECTURA COMPLETA: Super Humano Digital

**Última actualización:** 14 de Octubre, 2025

---

## 📊 ESTADO ACTUAL DEL SISTEMA

### ✅ FUNCIONALIDADES IMPLEMENTADAS

#### 1. **Sistema de Listas Personalizadas**
**Descripción:** Crear y gestionar listas dinámicas por tipo (supermercado, libros, películas, etc.)

**Operaciones disponibles:**
- ✅ Crear lista nueva
- ✅ Agregar items a lista existente
- ✅ Eliminar items de lista
- 🔄 Leer/mostrar lista (EN PROGRESO)
- 🔄 Borrar lista completa (EN PROGRESO)

**Flujo actual:**
```
Usuario (Telegram)
    ↓
AI Agent (GPT-4o-mini)
    ↓ Detecta: modificar_lista
Extraer Comando
    ↓
Switch2 → ruta "modificar"
    ↓
Buscar Lista (Google Sheets)
    ↓
Procesar Modificacion (Code)
    ↓ Calcula es_nueva
¿Es nueva lista? (IF)
    ↓ TRUE          ↓ FALSE
Append row      Actualizar en Sheets
    ↓                   ↓
Generar Mensaje ←───────┘
    ↓
Telegram Response
```

**Datos guardados:**
- `chat_id` (bigint): ID del usuario de Telegram
- `tipo` (text): Tipo de lista (supermercado, libros, etc.)
- `titulo` (text): Título de la lista
- `items` (JSON array): Array de items `["item1", "item2"]`
- `completado` (boolean): Estado de completado
- `fecha` (timestamp): Fecha de creación
- `ID_compuesta` (text): Clave única `{chat_id}-{tipo}`

**Ejemplo de uso:**
```
Usuario: "agrega pan a mi lista de supermercado"
Sistema:
  1. Detecta tipo: supermercado
  2. Busca si existe lista
  3. Si existe: agrega "pan" al array items
  4. Si no existe: crea lista nueva con ["pan"]
  5. Responde: "✅ Agregado 'pan' a tu lista de supermercado"
```

---

#### 2. **Procesamiento Multimodal**

**A. Texto (Telegram)**
- Recibe mensajes de texto
- Procesa con AI Agent
- Responde en lenguaje natural

**B. Voz (Transcripción automática)**
```
Usuario envía audio
    ↓
Switch1 → ruta "audio"
    ↓
GetFileInfo (HTTP Request)
    ↓
Download File
    ↓
Transcribir audio2 (OpenAI Whisper)
    ↓
Set Audio
    ↓
AI Agent (procesa como texto)
```

**C. Imágenes (Análisis visual)**
```
Usuario envía imagen
    ↓
Switch1 → ruta "foto"
    ↓
Get Photo Info (HTTP Request)
    ↓
Download Photo
    ↓
Convertir a Base64 (Code)
    ↓
Procesar Imagen con GPT-4o (Vision)
    ↓
Extraer Respuesta Imagen
    ↓
Set Imagen
    ↓
AI Agent (procesa texto extraído)
```

**Casos de uso:**
- Foto de recibo → Extrae items para lista de supermercado
- Foto de libro → Agrega a lista de libros
- Screenshot → Extrae información relevante

---

#### 3. **Gestión de Calendario (Google Calendar)**

**Operaciones:**
- ✅ Crear evento
- ✅ Actualizar evento
- ✅ Eliminar evento
- ✅ Comprobar disponibilidad

**Integración:**
```
AI Agent tiene herramientas conectadas:
  - Crear evento1 (Google Calendar Tool)
  - Actualizar evento1 (Google Calendar Tool)
  - Eliminar evento1 (Google Calendar Tool)
  - Comprobar disponibilidad (Google Calendar Tool)

Cuando usuario dice: "Reunión con Juan mañana a las 3pm"
  → AI Agent invoca automáticamente la herramienta correcta
  → Crea evento en Google Calendar
  → Responde confirmación
```

**Prompt del sistema (fragmento):**
```
1. EVENTOS Y CALENDARIO (Google Calendar)
Palabras clave: reunión, cita, evento, junta, encuentro, cumpleaños...

Acciones:
- Crear Evento (Crear evento1)
- Consultar (Comprobar disponibilidad)
- Eliminar (Eliminar evento1)
- Actualizar (Actualizar evento1)
```

---

#### 4. **Sistema de Memoria (Sesión actual)**

**Configuración:**
- **Tipo:** Buffer Window Memory
- **Scope:** Por chat_id (cada usuario tiene su contexto)
- **Persistencia:** Durante la sesión activa

**Nodos involucrados:**
```
Simple Memory1 (Buffer Window Memory)
    ↓ conectado a
AI Agent (OpenAI Chat Model1)
```

**Limitaciones actuales:**
- ❌ No persiste entre sesiones
- ❌ No tiene búsqueda semántica
- ❌ No guarda embeddings
- ❌ Memoria limitada a ventana actual

**Mejora planeada:** Ver sección "Migración a arquitectura Memorae"

---

#### 5. **Base de Datos (Google Sheets)**

**Estructura actual:**

**Sheet: "Listas"**
```
Columnas:
- chat_id
- tipo
- titulo
- items (JSON string)
- completado
- fecha
- ID_compuesta (UNIQUE KEY)
```

**Sheet: "Tareas"**
```
Columnas:
- chat_id
- tipo
- contenido
- detalles (JSON)
- completado
- fecha
```

**Operaciones:**
- `Buscar Lista`: Lookup con filtros (chat_id + tipo)
- `Actualizar en Sheets`: Update usando ID_compuesta
- `Append row in sheet`: Insert nueva fila
- `Guardar en Sheets`: Insert genérico

**Limitaciones:**
- ⚠️ No escala > 1000 usuarios
- ⚠️ Lento con muchas filas
- ⚠️ Límites de API requests
- ⚠️ No profesional para producción

---

#### 6. **Arquitectura de IA**

**Modelo principal:**
- GPT-4o-mini (OpenAI)
- Configurado en: OpenAI Chat Model1

**Modelos especializados:**
- GPT-4o Vision: Análisis de imágenes
- Whisper: Transcripción de audio

**LangSmith (Configurado pero no activo):**
- Configuración presente para trazabilidad
- No implementado completamente

**Prompt System:**
```javascript
systemMessage: `Eres el asistente personal de Carlos Ahumada.

🔴 DIFERENCIACIÓN CRÍTICA DE ACCIONES:

1. EVENTOS Y CALENDARIO (Google Calendar)
2. TAREAS/PENDIENTES (Google Sheets)
3. LISTAS PERSONALIZADAS, NOTAS, RECORDATORIOS (Google Sheets)

🔒 REGLA ABSOLUTA PARA LISTAS/NOTAS/RECORDATORIOS:
- Responde SOLO con bloque JSON
- No mensajes humanos antes/después
- Usa formato "modificar_lista"
- Sistema gestiona mensajes de confirmación
`
```

---

### 🔧 ARQUITECTURA TÉCNICA ACTUAL

#### **Stack Tecnológico:**

**Backend:**
- n8n (v1.112.5) - Workflow automation
- Node.js - Runtime
- SQLite - n8n database
- Google Cloud VM - Hosting

**Servicios externos:**
- Google Sheets - Base de datos
- Google Calendar - Calendario
- OpenAI API - IA y procesamiento
- Telegram Bot API - Interfaz de usuario
- Cloudinary - (Configurado, no usado actualmente)

**Infraestructura:**
- Server: Google Cloud Compute Engine
- Instance: n8n-server
- Zone: southamerica-west1-b
- IP: 34.176.242.21
- Domain: n8n.menteautonoma.cl
- SSL: Caddy (Let's Encrypt)

---

#### **Diagrama de Arquitectura Actual:**

```
┌─────────────────────────────────────────────────────┐
│                   USUARIO                           │
│              (Telegram App)                         │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│              TELEGRAM BOT API                       │
│         (Webhook a n8n.menteautonoma.cl)           │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│          GOOGLE CLOUD VM (n8n-server)               │
│  ┌───────────────────────────────────────────────┐ │
│  │         Caddy Web Server                      │ │
│  │  - Reverse proxy                              │ │
│  │  - SSL termination                            │ │
│  │  - n8n.menteautonoma.cl → localhost:5678     │ │
│  └────────────────┬──────────────────────────────┘ │
│                   ↓                                 │
│  ┌───────────────────────────────────────────────┐ │
│  │      Docker Container: n8n                    │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │   Workflow: Super Humano Digital        │ │ │
│  │  │                                         │ │ │
│  │  │   ┌─────────────────────────┐          │ │ │
│  │  │   │  Telegram Trigger       │          │ │ │
│  │  │   └────────┬────────────────┘          │ │ │
│  │  │            ↓                            │ │ │
│  │  │   ┌─────────────────────────┐          │ │ │
│  │  │   │  Switch1                │          │ │ │
│  │  │   │  (texto/voz/foto)       │          │ │ │
│  │  │   └──┬────┬────┬────────────┘          │ │ │
│  │  │      ↓    ↓    ↓                       │ │ │
│  │  │   Texto Audio Foto                     │ │ │
│  │  │      ↓    ↓    ↓                       │ │ │
│  │  │   ┌─────────────────────────┐          │ │ │
│  │  │   │  AI Agent               │          │ │ │
│  │  │   │  + Memory               │          │ │ │
│  │  │   │  + Calendar Tools       │          │ │ │
│  │  │   └────────┬────────────────┘          │ │ │
│  │  │            ↓                            │ │ │
│  │  │   ┌─────────────────────────┐          │ │ │
│  │  │   │  Extraer Comando        │          │ │ │
│  │  │   └────────┬────────────────┘          │ │ │
│  │  │            ↓                            │ │ │
│  │  │   ┌─────────────────────────┐          │ │ │
│  │  │   │  ¿Tiene acción?         │          │ │ │
│  │  │   └──┬───────────────┬──────┘          │ │ │
│  │  │      ↓ TRUE          ↓ FALSE           │ │ │
│  │  │   Switch2      Telegram Response       │ │ │
│  │  │      ↓                                  │ │ │
│  │  │   (guardar/modificar/borrar/leer)     │ │ │
│  │  │      ↓                                  │ │ │
│  │  │   Buscar Lista                         │ │ │
│  │  │      ↓                                  │ │ │
│  │  │   Procesar Modificacion                │ │ │
│  │  │      ↓                                  │ │ │
│  │  │   ¿Es nueva lista?                     │ │ │
│  │  │      ↓           ↓                      │ │ │
│  │  │   Append    Actualizar                 │ │ │
│  │  │      ↓           ↓                      │ │ │
│  │  │   Generar Mensaje                      │ │ │
│  │  │      ↓                                  │ │ │
│  │  │   Telegram Response                    │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│              SERVICIOS EXTERNOS                     │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ Google       │  │ OpenAI API   │                │
│  │ Sheets       │  │ - GPT-4o-mini│                │
│  │ - Listas DB  │  │ - GPT-4o     │                │
│  └──────────────┘  │ - Whisper    │                │
│                    └──────────────┘                 │
│  ┌──────────────┐                                   │
│  │ Google       │                                   │
│  │ Calendar     │                                   │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

---

### 💰 COSTOS ACTUALES

```
Google Cloud VM (e2-micro): $10-15/mes
OpenAI API: $15-25/mes (según uso)
Domain (menteautonoma.cl): $12/año
Google Sheets: Gratis
Google Calendar: Gratis
Telegram Bot: Gratis
n8n: Gratis (self-hosted)
────────────────────────────────
TOTAL: ~$30-45/mes
```

---

## 🚀 MIGRACIÓN A ARQUITECTURA MEMORAE

### **ARQUITECTURA OBJETIVO (Estilo Memorae)**

```
┌─────────────────────────────────────────────────────┐
│                USUARIO FINAL                        │
│          (Telegram + Web Dashboard)                 │
└────────────┬────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│            NEXT.JS 15 APPLICATION                   │
│              (Vercel deployment)                    │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │           FRONTEND PAGES                    │  │
│  │  - /dashboard (Vista general)               │  │
│  │  - /listas (Gestión de listas)              │  │
│  │  - /tareas (Gestión de tareas)              │  │
│  │  - /calendario (Vista calendario)           │  │
│  │  - /analytics (Estadísticas)                │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │           API ROUTES                        │  │
│  │  /api/chat       - Chat con IA              │  │
│  │  /api/lists      - CRUD listas              │  │
│  │  /api/tasks      - CRUD tareas              │  │
│  │  /api/embeddings - Generar vectores         │  │
│  │  /api/search     - Búsqueda semántica       │  │
│  │  /api/telegram   - Webhook Telegram         │  │
│  │  /api/calendar   - Integración Calendar     │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │           SERVICES LAYER                    │  │
│  │  - AIService (OpenAI integration)           │  │
│  │  - DatabaseService (Supabase client)        │  │
│  │  - EmbeddingService (Vector generation)     │  │
│  │  - SearchService (RAG implementation)       │  │
│  │  - TelegramService (Bot management)         │  │
│  └─────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│              SUPABASE (Backend as a Service)        │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │        POSTGRESQL DATABASE                  │  │
│  │                                             │  │
│  │  Tables:                                    │  │
│  │  - lists (listas personalizadas)            │  │
│  │  - tasks (tareas pendientes)                │  │
│  │  - conversations (historial chat)           │  │
│  │  - reminders (recordatorios)                │  │
│  │  - users (usuarios)                         │  │
│  │  - embeddings (vectores para búsqueda)      │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │        VECTOR DATABASE (pgvector)           │  │
│  │  - Embeddings de conversaciones             │  │
│  │  - Búsqueda por similitud                   │  │
│  │  - Índices optimizados (ivfflat)            │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │        SUPABASE AUTH                        │  │
│  │  - Autenticación usuarios                   │  │
│  │  - OAuth (Google, Telegram)                 │  │
│  │  - JWT tokens                               │  │
│  │  - Row Level Security (RLS)                 │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │        SUPABASE REALTIME                    │  │
│  │  - Updates en tiempo real                   │  │
│  │  - WebSocket connections                    │  │
│  │  - Sincronización dashboard                 │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │        SUPABASE STORAGE                     │  │
│  │  - Imágenes de usuario                      │  │
│  │  - Archivos adjuntos                        │  │
│  └─────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│              SERVICIOS EXTERNOS                     │
│                                                     │
│  ┌──────────────────────────────────────────┐     │
│  │  OPENAI API                              │     │
│  │  - GPT-4o-mini (chat)                    │     │
│  │  - GPT-4o (imágenes)                     │     │
│  │  - Whisper (audio)                       │     │
│  │  - text-embedding-3-small (vectores)     │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│  ┌──────────────────────────────────────────┐     │
│  │  GOOGLE APIS                             │     │
│  │  - Google Calendar API                   │     │
│  │  - Google OAuth                          │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│  ┌──────────────────────────────────────────┐     │
│  │  TELEGRAM BOT API                        │     │
│  │  - Webhook a Next.js /api/telegram       │     │
│  └──────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

---

### **ESTRUCTURA DE ARCHIVOS DEL PROYECTO**

```
super-humano-digital/
├── .env.local                    # Variables de entorno
├── .env.example                  # Ejemplo de variables
├── next.config.ts                # Configuración Next.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── prisma/
│   ├── schema.prisma            # Schema de Prisma (sync con Supabase)
│   └── migrations/              # Migraciones de DB
│
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Landing page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Dashboard principal
│   │   │   └── layout.tsx
│   │   │
│   │   ├── listas/
│   │   │   ├── page.tsx         # Vista de listas
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx     # Detalle de lista
│   │   │   └── nueva/
│   │   │       └── page.tsx     # Crear lista nueva
│   │   │
│   │   ├── tareas/
│   │   │   └── page.tsx         # Vista de tareas
│   │   │
│   │   ├── calendario/
│   │   │   └── page.tsx         # Vista de calendario
│   │   │
│   │   ├── analytics/
│   │   │   └── page.tsx         # Estadísticas
│   │   │
│   │   └── api/
│   │       ├── chat/
│   │       │   └── route.ts     # Endpoint chat con IA
│   │       │
│   │       ├── lists/
│   │       │   ├── route.ts     # GET, POST listas
│   │       │   └── [id]/
│   │       │       └── route.ts # PUT, DELETE lista
│   │       │
│   │       ├── tasks/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       │
│   │       ├── embeddings/
│   │       │   └── route.ts     # Generar embeddings
│   │       │
│   │       ├── search/
│   │       │   └── route.ts     # Búsqueda semántica (RAG)
│   │       │
│   │       ├── telegram/
│   │       │   └── route.ts     # Webhook Telegram
│   │       │
│   │       ├── calendar/
│   │       │   ├── route.ts
│   │       │   └── events/
│   │       │       └── route.ts
│   │       │
│   │       └── reminders/
│   │           ├── route.ts
│   │           └── check/
│   │               └── route.ts # Cron job para enviar
│   │
│   ├── components/
│   │   ├── ui/                  # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── InputArea.tsx
│   │   │
│   │   ├── lists/
│   │   │   ├── ListCard.tsx
│   │   │   ├── ListItem.tsx
│   │   │   ├── AddItemForm.tsx
│   │   │   └── DeleteListButton.tsx
│   │   │
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskFilters.tsx
│   │   │
│   │   ├── calendar/
│   │   │   ├── CalendarView.tsx
│   │   │   └── EventCard.tsx
│   │   │
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase client (browser)
│   │   │   ├── server.ts        # Supabase client (server)
│   │   │   └── admin.ts         # Supabase admin client
│   │   │
│   │   ├── services/
│   │   │   ├── ai.service.ts           # OpenAI integration
│   │   │   ├── embedding.service.ts    # Embeddings
│   │   │   ├── search.service.ts       # RAG implementation
│   │   │   ├── telegram.service.ts     # Telegram Bot
│   │   │   ├── calendar.service.ts     # Google Calendar
│   │   │   ├── list.service.ts         # Lógica de listas
│   │   │   └── task.service.ts         # Lógica de tareas
│   │   │
│   │   ├── database/
│   │   │   ├── queries.ts       # Query helpers
│   │   │   └── migrations.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── date.ts
│   │   │   ├── format.ts
│   │   │   └── validation.ts
│   │   │
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── use-chat.ts
│   │   ├── use-lists.ts
│   │   ├── use-tasks.ts
│   │   ├── use-calendar.ts
│   │   └── use-auth.ts
│   │
│   ├── types/
│   │   ├── database.types.ts    # Tipos generados de Supabase
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   └── styles/
│       └── globals.css
│
├── supabase/
│   ├── config.toml              # Configuración local
│   ├── migrations/
│   │   ├── 20250101000000_initial_schema.sql
│   │   ├── 20250102000000_add_embeddings.sql
│   │   └── 20250103000000_add_functions.sql
│   │
│   └── functions/               # Edge Functions (opcional)
│       └── search-conversations/
│
└── docs/
    ├── ROADMAP.md
    ├── ARQUITECTURA.md          # Este archivo
    └── API.md                   # Documentación API
```

---

### **SCHEMA DE BASE DE DATOS (Supabase)**

```sql
-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- Tabla: users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id bigint UNIQUE NOT NULL,
  email text,
  nombre text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_users_chat_id ON users(chat_id);

-- ============================================

-- Tabla: lists
CREATE TABLE lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  tipo text NOT NULL,
  titulo text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  completado boolean DEFAULT false,
  fecha timestamptz DEFAULT now(),
  id_compuesta text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_lists_user_id ON lists(user_id);
CREATE INDEX idx_lists_chat_id ON lists(chat_id);
CREATE INDEX idx_lists_tipo ON lists(tipo);
CREATE INDEX idx_lists_id_compuesta ON lists(id_compuesta);
CREATE INDEX idx_lists_completado ON lists(completado);

-- Trigger para updated_at
CREATE TRIGGER update_lists_updated_at
  BEFORE UPDATE ON lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================

-- Tabla: tasks
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  tipo text NOT NULL,
  contenido text NOT NULL,
  detalles jsonb DEFAULT '{}'::jsonb,
  completado boolean DEFAULT false,
  prioridad text DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta')),
  fecha_creacion timestamptz DEFAULT now(),
  fecha_vencimiento timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_chat_id ON tasks(chat_id);
CREATE INDEX idx_tasks_completado ON tasks(completado);
CREATE INDEX idx_tasks_fecha_vencimiento ON tasks(fecha_vencimiento);

-- ============================================

-- Tabla: conversations (para memoria y RAG)
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  user_message text NOT NULL,
  ai_response text NOT NULL,
  context_used jsonb DEFAULT '[]'::jsonb,
  embedding vector(1536),  -- OpenAI text-embedding-3-small
  metadata jsonb DEFAULT '{}'::jsonb,
  timestamp timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_chat_id ON conversations(chat_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp DESC);

-- Índice vectorial para búsqueda semántica
CREATE INDEX idx_conversations_embedding ON conversations
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- ============================================

-- Tabla: reminders
CREATE TABLE reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  mensaje text NOT NULL,
  fecha_recordatorio timestamptz NOT NULL,
  enviado boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_fecha_recordatorio ON reminders(fecha_recordatorio);
CREATE INDEX idx_reminders_enviado ON reminders(enviado);

-- ============================================

-- Tabla: calendar_events (cache de Google Calendar)
CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  google_event_id text NOT NULL,
  summary text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  attendees jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  synced_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX idx_calendar_events_user_id ON calendar_events(user_id);
CREATE INDEX idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX idx_calendar_events_google_id ON calendar_events(google_event_id);

-- ============================================
-- FUNCIONES
-- ============================================

-- Función: update_updated_at_column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================

-- Función: search_conversations (RAG)
CREATE OR REPLACE FUNCTION search_conversations(
  query_embedding vector(1536),
  user_chat_id bigint,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  user_message text,
  ai_response text,
  similarity float,
  timestamp timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.user_message,
    c.ai_response,
    1 - (c.embedding <-> query_embedding) AS similarity,
    c.timestamp
  FROM conversations c
  WHERE c.chat_id = user_chat_id
    AND 1 - (c.embedding <-> query_embedding) > match_threshold
  ORDER BY c.embedding <-> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================

-- Función: get_user_stats
CREATE OR REPLACE FUNCTION get_user_stats(user_chat_id bigint)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_lists', (SELECT COUNT(*) FROM lists WHERE chat_id = user_chat_id),
    'total_tasks', (SELECT COUNT(*) FROM tasks WHERE chat_id = user_chat_id),
    'completed_tasks', (SELECT COUNT(*) FROM tasks WHERE chat_id = user_chat_id AND completado = true),
    'pending_reminders', (SELECT COUNT(*) FROM reminders WHERE chat_id = user_chat_id AND enviado = false),
    'total_conversations', (SELECT COUNT(*) FROM conversations WHERE chat_id = user_chat_id)
  ) INTO stats;

  RETURN stats;
END;
$$;

-- ============================================

-- Función: get_pending_reminders
CREATE OR REPLACE FUNCTION get_pending_reminders()
RETURNS TABLE (
  id uuid,
  chat_id bigint,
  mensaje text,
  fecha_recordatorio timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.chat_id,
    r.mensaje,
    r.fecha_recordatorio
  FROM reminders r
  WHERE r.enviado = false
    AND r.fecha_recordatorio <= now()
  ORDER BY r.fecha_recordatorio;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para lists
CREATE POLICY "Users can view own lists"
  ON lists FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own lists"
  ON lists FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own lists"
  ON lists FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own lists"
  ON lists FOR DELETE
  USING (user_id = auth.uid());

-- Políticas similares para tasks, conversations, reminders, calendar_events...

-- ============================================
-- VIEWS (Vistas útiles)
-- ============================================

-- Vista: active_lists
CREATE VIEW active_lists AS
SELECT
  l.*,
  jsonb_array_length(l.items) AS item_count
FROM lists l
WHERE l.completado = false
ORDER BY l.updated_at DESC;

-- Vista: recent_conversations
CREATE VIEW recent_conversations AS
SELECT
  c.id,
  c.chat_id,
  c.user_message,
  c.ai_response,
  c.timestamp
FROM conversations c
ORDER BY c.timestamp DESC
LIMIT 100;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para actualizar updated_at en lists
CREATE TRIGGER update_lists_updated_at
  BEFORE UPDATE ON lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar updated_at en tasks
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para actualizar updated_at en users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

### **CÓDIGO DE EJEMPLO: API ROUTE (Next.js)**

#### **`src/app/api/chat/route.ts`** (Endpoint principal de chat con RAG)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message, chatId } = await req.json();

    if (!message || !chatId) {
      return NextResponse.json(
        { error: 'Message and chatId are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 1. Generar embedding de la pregunta
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    // 2. Buscar contexto relevante en conversaciones pasadas (RAG)
    const { data: relevantConversations, error: searchError } = await supabase
      .rpc('search_conversations', {
        query_embedding: queryEmbedding,
        user_chat_id: chatId,
        match_threshold: 0.7,
        match_count: 5,
      });

    if (searchError) {
      console.error('Search error:', searchError);
    }

    // 3. Formatear contexto
    const context = relevantConversations
      ?.map(
        (conv: any) =>
          `Usuario: ${conv.user_message}\nAsistente: ${conv.ai_response}`
      )
      .join('\n\n');

    // 4. Construir prompt con contexto
    const systemMessage = `Eres el asistente personal Super Humano Digital.

${context ? `CONTEXTO DE CONVERSACIONES PREVIAS:\n${context}\n` : ''}

INSTRUCCIONES:
- Usa el contexto para responder de forma más personalizada
- Si el usuario pregunta sobre algo mencionado antes, usa esa información
- Para gestionar listas, responde con JSON en formato:
  \`\`\`json
  {"action": "modificar_lista", "data": {"tipo": "...", "operacion": "agregar/eliminar", "item": "..."}}
  \`\`\`
`;

    // 5. Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content || '';

    // 6. Guardar conversación con embedding
    const { error: insertError } = await supabase
      .from('conversations')
      .insert({
        chat_id: chatId,
        user_message: message,
        ai_response: aiResponse,
        embedding: queryEmbedding,
        context_used: relevantConversations || [],
      });

    if (insertError) {
      console.error('Insert error:', insertError);
    }

    // 7. Detectar acciones (listas, tareas, etc.)
    const jsonMatch = aiResponse.match(/```json\s*({[\s\S]*?})\s*```/);
    let action = null;

    if (jsonMatch) {
      try {
        action = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error('JSON parse error:', e);
      }
    }

    return NextResponse.json({
      response: aiResponse,
      action,
      contextUsed: relevantConversations?.length || 0,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

#### **`src/app/api/lists/route.ts`** (CRUD de listas)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET: Obtener todas las listas del usuario
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: 'chatId is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data: lists, error } = await supabase
      .from('lists')
      .select('*')
      .eq('chat_id', parseInt(chatId))
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ lists });
  } catch (error) {
    console.error('GET lists error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Crear nueva lista
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, tipo, titulo, items } = body;

    if (!chatId || !tipo) {
      return NextResponse.json(
        { error: 'chatId and tipo are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const idCompuesta = `${chatId}-${tipo}`;

    const { data: newList, error } = await supabase
      .from('lists')
      .insert({
        chat_id: chatId,
        tipo,
        titulo: titulo || `Lista de ${tipo}`,
        items: items || [],
        id_compuesta: idCompuesta,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ list: newList }, { status: 201 });
  } catch (error) {
    console.error('POST list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

#### **`src/app/api/lists/[id]/route.ts`** (Actualizar/Eliminar lista específica)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// PUT: Actualizar lista
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { items, completado, titulo } = body;

    const supabase = createClient();

    const { data: updatedList, error } = await supabase
      .from('lists')
      .update({
        items,
        completado,
        titulo,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ list: updatedList });
  } catch (error) {
    console.error('PUT list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar lista
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('lists')
      .delete()
      .eq('id', params.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

#### **`src/app/api/telegram/route.ts`** (Webhook de Telegram)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { TelegramService } from '@/lib/services/telegram.service';
import { AIService } from '@/lib/services/ai.service';

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // Extraer mensaje
    const message = update.message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text;

    if (!text) {
      return NextResponse.json({ ok: true });
    }

    // Procesar con IA
    const aiService = new AIService();
    const response = await aiService.processMessage(text, chatId);

    // Enviar respuesta por Telegram
    const telegramService = new TelegramService();
    await telegramService.sendMessage(chatId, response.text);

    // Si hay acción (lista, tarea, etc.), procesarla
    if (response.action) {
      // Lógica para procesar acción
      // ... (similar a tu flujo actual en n8n)
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
```

---

### **SERVICIOS (Services Layer)**

#### **`src/lib/services/ai.service.ts`**

```typescript
import OpenAI from 'openai';
import { EmbeddingService } from './embedding.service';
import { SearchService } from './search.service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export class AIService {
  private embeddingService: EmbeddingService;
  private searchService: SearchService;

  constructor() {
    this.embeddingService = new EmbeddingService();
    this.searchService = new SearchService();
  }

  async processMessage(message: string, chatId: number) {
    // 1. Buscar contexto relevante (RAG)
    const context = await this.searchService.searchConversations(
      message,
      chatId
    );

    // 2. Construir prompt
    const systemMessage = this.buildSystemMessage(context);

    // 3. Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message },
      ],
    });

    const aiResponse = completion.choices[0].message.content || '';

    // 4. Guardar conversación
    await this.embeddingService.saveConversation(
      chatId,
      message,
      aiResponse
    );

    // 5. Extraer acción si existe
    const action = this.extractAction(aiResponse);

    return {
      text: aiResponse,
      action,
      contextUsed: context.length,
    };
  }

  private buildSystemMessage(context: any[]) {
    const contextStr = context
      .map(c => `Usuario: ${c.user_message}\nAsistente: ${c.ai_response}`)
      .join('\n\n');

    return `Eres el asistente personal Super Humano Digital.

${contextStr ? `CONTEXTO:\n${contextStr}\n` : ''}

[... resto del prompt ...]`;
  }

  private extractAction(response: string) {
    const jsonMatch = response.match(/```json\s*({[\s\S]*?})\s*```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
```

---

#### **`src/lib/services/embedding.service.ts`**

```typescript
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export class EmbeddingService {
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  async saveConversation(
    chatId: number,
    userMessage: string,
    aiResponse: string
  ) {
    const supabase = createClient();

    // Generar embedding
    const embedding = await this.generateEmbedding(
      `${userMessage} ${aiResponse}`
    );

    // Guardar en Supabase
    const { error } = await supabase.from('conversations').insert({
      chat_id: chatId,
      user_message: userMessage,
      ai_response: aiResponse,
      embedding,
    });

    if (error) {
      console.error('Save conversation error:', error);
      throw error;
    }
  }
}
```

---

#### **`src/lib/services/search.service.ts`** (RAG Implementation)

```typescript
import { EmbeddingService } from './embedding.service';
import { createClient } from '@/lib/supabase/server';

export class SearchService {
  private embeddingService: EmbeddingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }

  async searchConversations(query: string, chatId: number) {
    // 1. Generar embedding de la query
    const queryEmbedding = await this.embeddingService.generateEmbedding(query);

    // 2. Buscar en Supabase usando función RPC
    const supabase = createClient();

    const { data, error } = await supabase.rpc('search_conversations', {
      query_embedding: queryEmbedding,
      user_chat_id: chatId,
      match_threshold: 0.7,
      match_count: 5,
    });

    if (error) {
      console.error('Search error:', error);
      return [];
    }

    return data || [];
  }
}
```

---

### **COMPONENTES REACT (Dashboard)**

#### **`src/components/lists/ListCard.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Check } from 'lucide-react';

interface ListCardProps {
  list: {
    id: string;
    tipo: string;
    titulo: string;
    items: string[];
    completado: boolean;
  };
  onUpdate: (id: string, items: string[]) => void;
  onDelete: (id: string) => void;
}

export function ListCard({ list, onUpdate, onDelete }: ListCardProps) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    const updatedItems = [...list.items, newItem];
    onUpdate(list.id, updatedItems);
    setNewItem('');
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = list.items.filter((_, i) => i !== index);
    onUpdate(list.id, updatedItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{list.titulo}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(list.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {list.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{item}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(index)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            placeholder="Agregar item..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

#### **`src/app/dashboard/page.tsx`** (Dashboard principal)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { ListCard } from '@/components/lists/ListCard';

export default function DashboardPage() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const chatId = localStorage.getItem('chatId'); // O de contexto de auth
      const response = await fetch(`/api/lists?chatId=${chatId}`);
      const data = await response.json();
      setLists(data.lists);
    } catch (error) {
      console.error('Fetch lists error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateList = async (id: string, items: string[]) => {
    try {
      await fetch(`/api/lists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      fetchLists(); // Refrescar
    } catch (error) {
      console.error('Update list error:', error);
    }
  };

  const handleDeleteList = async (id: string) => {
    try {
      await fetch(`/api/lists/${id}`, { method: 'DELETE' });
      fetchLists(); // Refrescar
    } catch (error) {
      console.error('Delete list error:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Mis Listas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            onUpdate={handleUpdateList}
            onDelete={handleDeleteList}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### **VARIABLES DE ENTORNO (`.env.local`)**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Google Calendar
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your-bot-username

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### **PLAN DE MIGRACIÓN: n8n → Next.js**

#### **FASE 1: Preparación (Semana 1)**
- [ ] Crear proyecto Next.js 15
- [ ] Setup Supabase (proyecto + schema)
- [ ] Migrar datos de Google Sheets a Supabase
- [ ] Configurar variables de entorno

#### **FASE 2: API Básica (Semana 2)**
- [ ] Implementar `/api/chat` (con RAG)
- [ ] Implementar `/api/lists` (CRUD)
- [ ] Implementar `/api/tasks` (CRUD)
- [ ] Implementar `/api/telegram` (webhook)

#### **FASE 3: Testing Paralelo (Semana 3)**
- [ ] Bot Telegram apuntando a Next.js
- [ ] Probar todos los flujos
- [ ] Comparar con n8n (mantener ambos activos)
- [ ] Corregir bugs

#### **FASE 4: Dashboard Web (Semana 4)**
- [ ] Crear páginas de dashboard
- [ ] Implementar auth con Supabase
- [ ] Componentes de listas/tareas
- [ ] Vista de calendario

#### **FASE 5: Features Avanzados (Semana 5-6)**
- [ ] Recordatorios programados
- [ ] Búsqueda semántica completa
- [ ] Analytics y estadísticas
- [ ] Optimizaciones de performance

#### **FASE 6: Deploy y Transición (Semana 7)**
- [ ] Deploy en Vercel
- [ ] Migrar dominio
- [ ] Apagar n8n workflows
- [ ] Monitoreo y ajustes

---

### **COMPARACIÓN: COSTO ACTUAL VS NUEVO SISTEMA**

#### **Sistema Actual (n8n):**
```
Google Cloud VM: $15/mes
OpenAI API: $20/mes
────────────────────────
TOTAL: $35/mes
```

#### **Sistema Nuevo (Next.js + Supabase Free):**
```
Supabase: $0 (free tier para <500 usuarios)
Vercel: $0 (free tier)
OpenAI API: $25/mes (más uso por embeddings)
Domain: $1/mes
────────────────────────
TOTAL: $26/mes (MÁS BARATO)
```

#### **Sistema Nuevo (Con planes Pro):**
```
Supabase Pro: $25/mes
Vercel Pro: $20/mes
OpenAI API: $30/mes
Domain: $1/mes
────────────────────────
TOTAL: $76/mes
```

**CONCLUSIÓN:** Con planes gratuitos, el nuevo sistema es MÁS BARATO que el actual 🎉

---

## 📈 MÉTRICAS Y MONITOREO

### **KPIs a trackear:**

1. **Usuarios:**
   - Usuarios activos diarios (DAU)
   - Usuarios activos mensuales (MAU)
   - Retention rate (7, 30 días)
   - Churn rate

2. **Engagement:**
   - Mensajes por usuario/día
   - Listas creadas por usuario
   - Tareas completadas
   - Uso de features (listas vs tareas vs calendario)

3. **Técnico:**
   - Response time API (<200ms)
   - Uptime (>99.5%)
   - Error rate (<1%)
   - Database size growth
   - API costs por usuario

4. **Negocio:**
   - Conversion rate (free → paid)
   - Monthly Recurring Revenue (MRR)
   - Customer Acquisition Cost (CAC)
   - Lifetime Value (LTV)

### **Herramientas de monitoreo:**

- **Vercel Analytics:** Performance y Web Vitals
- **Supabase Dashboard:** Database metrics
- **Sentry:** Error tracking
- **PostHog:** Product analytics
- **OpenAI Usage Dashboard:** API costs

---

## 🎯 NEXT STEPS INMEDIATOS

### **Esta semana (Prioridad ALTA):**
1. ✅ Completar flujos leer/borrar listas en n8n
2. 🔄 Crear proyecto en Supabase (FREE)
3. 🔄 Crear proyecto en Vercel (FREE)
4. 🔄 Iniciar proyecto Next.js con estructura base

### **Próxima semana:**
1. Implementar schema en Supabase
2. Migrar datos de Google Sheets
3. Implementar APIs básicas (/chat, /lists)
4. Configurar webhook Telegram

### **Objetivo mes 1:**
- ✅ Sistema funcionando en Next.js
- ✅ RAG básico implementado
- ✅ Dashboard web funcional
- ✅ n8n desactivado (solo backup)

---

**Última actualización:** 14 de Octubre, 2025
**Próxima revisión:** 21 de Octubre, 2025

---

**COSTO ESTIMADO TOTAL PARA MVP:**
- Desarrollo: $0 (tú mismo)
- Infraestructura: $26/mes (planes gratuitos)
- Tiempo: 6-8 semanas
- **ROI esperado:** $500-1000/mes con 50-100 usuarios pagando $9.99/mes

🚀 **¡LISTO PARA EMPEZAR!**
