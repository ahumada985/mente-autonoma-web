# 📚 Índice Completo del Proyecto - Super Humano Digital

## 🎯 Archivos de Inicio Rápido

### ⭐ EMPIEZA AQUÍ:
1. **RESUMEN_PROYECTO.md** - Resumen ejecutivo del proyecto completo
2. **GUIA_CONFIGURACION.md** - Paso a paso para configurar y ejecutar
3. **COMANDOS_RAPIDOS.md** - Comandos esenciales copiar/pegar

---

## 📖 Documentación Principal

### Arquitectura y Desarrollo
- **ARQUITECTURA_COMPLETA.md** - Arquitectura técnica detallada con código
- **ROADMAP_SUPER_HUMANO.md** - Plan de desarrollo a 3-6 meses
- **PLAN-MONETIZACION.md** - Estrategia de monetización

### Análisis del Sistema Anterior
- **ANALISIS_WORKFLOW.md** - Análisis del workflow n8n original
- **SUPER-HUMANO-DIGITAL.md** - Especificación inicial del proyecto

### Implementación
- **IMPLEMENTACION-COMPLETA.md** - Guía de implementación
- **RESUMEN-IMPLEMENTACION.md** - Resumen de lo implementado
- **CONFIGURACION_APLICADA.md** - Configuraciones aplicadas

### Prompts y IA
- **PROMPT-ACTUALIZADO.md** - Prompts actualizados del asistente

---

## 🗄️ Base de Datos

### Archivos SQL
- **supabase_schema.sql** ⭐ - Schema completo de Supabase (EJECUTADO)
  - 6 tablas creadas
  - Extensión pgvector
  - Funciones RPC para RAG
  - Row Level Security

### Migración
- **migrate_sheets_to_supabase.js** - Script de migración desde Google Sheets

---

## 💻 Proyecto Next.js

### 📁 asistente-app/ (PROYECTO PRINCIPAL)

```
asistente-app/
├── 📄 Configuración
│   ├── package.json            - Dependencias y scripts
│   ├── tsconfig.json           - Configuración TypeScript
│   ├── next.config.ts          - Configuración Next.js
│   ├── tailwind.config.ts      - Configuración Tailwind
│   ├── postcss.config.mjs      - PostCSS config
│   ├── .env.example            - Ejemplo de variables de entorno
│   ├── .gitignore              - Archivos ignorados por Git
│   └── README.md               - Documentación del proyecto
│
├── 📁 app/ (Next.js App Router)
│   ├── layout.tsx              - Layout global
│   ├── page.tsx                - Landing page principal
│   ├── globals.css             - Estilos globales
│   │
│   ├── 📁 api/ (REST APIs)
│   │   ├── 📁 chat/
│   │   │   └── route.ts        - ⭐ API de chat con RAG
│   │   │
│   │   ├── 📁 lists/
│   │   │   └── route.ts        - ⭐ CRUD de listas
│   │   │
│   │   └── 📁 telegram/webhook/
│   │       └── route.ts        - ⭐ Webhook Telegram
│   │
│   └── 📁 dashboard/
│       └── page.tsx            - Dashboard web
│
└── 📁 lib/ (Lógica de negocio)
    ├── supabase.ts             - Cliente Supabase
    │
    ├── 📁 services/
    │   ├── openai.ts           - OpenAI (GPT, Whisper, Embeddings)
    │   ├── rag.ts              - ⭐ RAG con búsqueda semántica
    │   └── lists.ts            - Lógica de listas
    │
    └── 📁 types/
        └── database.ts         - Tipos TypeScript
```

---

## 🔑 Archivos de Configuración

### Entorno
- **.env** - Variables de entorno (n8n antiguo, NO USAR)
- **asistente-app/.env.example** - ⭐ Plantilla de variables

### Scripts
- **start.bat** - Script de inicio (Windows)
- **start-n8n.bat** - Script para iniciar n8n (antiguo)

---

## 📂 Directorios Adicionales

### Workflows (n8n antiguo)
- **workflows/** - Workflows JSON de n8n (sistema anterior)

### Datos
- **data/** - Datos de prueba o backups

### Base de Datos
- **database/** - Archivos relacionados con la base de datos

### Configuración
- **config/** - Archivos de configuración adicionales

### Logs
- **logs/** - Archivos de log (n8n antiguo)
- **n8n_oauth.log** - Log de OAuth n8n
- **n8n_start.log** - Log de inicio n8n
- **n8n_startup.log** - Log de arranque n8n

### Node Modules
- **node_modules/** - Dependencias npm (n8n antiguo)

---

## 📋 Guías de Acceso

- **ACCESO_N8N_CLOUD.md** - Guía para acceder a n8n en Google Cloud
- **SOLUCIONAR_ACCESO.md** - Solución de problemas de acceso

### Instrucciones
- **COMIENZA-AQUI.md** - Punto de inicio (versión anterior)
- **INSTRUCCIONES_INICIO.md** - Instrucciones iniciales
- **INSTRUCCIONES_SETUP.md** - Setup del sistema
- **INSTRUCCIONES-FINALES-SIMPLE.md** - Instrucciones finales simplificadas

---

## 🎯 Guía de Lectura por Perfil

### 👨‍💻 Desarrollador (empezando el proyecto):
1. **RESUMEN_PROYECTO.md** - Entender el proyecto
2. **GUIA_CONFIGURACION.md** - Configurar entorno
3. **asistente-app/README.md** - Documentación técnica
4. **COMANDOS_RAPIDOS.md** - Comandos útiles

### 📊 Product Owner / Manager:
1. **RESUMEN_PROYECTO.md** - Overview ejecutivo
2. **ROADMAP_SUPER_HUMANO.md** - Plan a futuro
3. **PLAN-MONETIZACION.md** - Estrategia de monetización

### 🏗️ Arquitecto / Tech Lead:
1. **ARQUITECTURA_COMPLETA.md** - Arquitectura detallada
2. **supabase_schema.sql** - Diseño de base de datos
3. **asistente-app/lib/services/** - Revisar servicios

### 🔧 DevOps / Deploy:
1. **GUIA_CONFIGURACION.md** (Paso 5) - Deploy en Vercel
2. **COMANDOS_RAPIDOS.md** - Comandos de deploy
3. **asistente-app/.env.example** - Variables de entorno

---

## 🚀 Workflow de Trabajo

### Primera vez:
1. Leer **RESUMEN_PROYECTO.md**
2. Seguir **GUIA_CONFIGURACION.md**
3. Tener a mano **COMANDOS_RAPIDOS.md**

### Desarrollo diario:
1. `cd asistente-app && npm run dev`
2. Consultar **asistente-app/README.md** para referencia
3. Ver **ARQUITECTURA_COMPLETA.md** para patrones

### Antes de commit:
1. `npm run typecheck`
2. `npm run build`
3. Revisar cambios con `git status`

### Deploy:
1. Seguir sección "Deploy" en **GUIA_CONFIGURACION.md**
2. Usar comandos de **COMANDOS_RAPIDOS.md**

---

## 📊 Estado de Archivos

### ✅ Completados y Listos:
- Schema SQL (ejecutado en Supabase)
- Proyecto Next.js (código completo)
- Servicios (OpenAI, RAG, Listas)
- APIs REST (chat, lists, telegram)
- Dashboard web básico
- Documentación completa

### ⏳ Pendientes de Configuración:
- Variables de entorno (.env.local)
- API keys (Supabase, OpenAI, Telegram)
- Webhook de Telegram
- Deploy en Vercel

### 🗑️ Archivos Antiguos (n8n):
- workflows/
- .env (n8n)
- n8n_*.log
- package.json (raíz)
- node_modules (raíz)

---

## 🔍 Búsqueda Rápida

### ¿Dónde está...?

| Busco | Ubicación |
|---|---|
| Schema de base de datos | `supabase_schema.sql` |
| API de chat con RAG | `asistente-app/app/api/chat/route.ts` |
| Servicio de embeddings | `asistente-app/lib/services/rag.ts` |
| CRUD de listas | `asistente-app/lib/services/lists.ts` |
| Webhook Telegram | `asistente-app/app/api/telegram/webhook/route.ts` |
| Tipos TypeScript | `asistente-app/lib/types/database.ts` |
| Configuración Next.js | `asistente-app/next.config.ts` |
| Variables de entorno | `asistente-app/.env.example` |
| Comandos útiles | `COMANDOS_RAPIDOS.md` |
| Guía de setup | `GUIA_CONFIGURACION.md` |

---

## 📦 Archivos Importantes para Git

### ✅ Incluir en Git:
- Todo el directorio `asistente-app/` (excepto node_modules, .next)
- Todos los .md de documentación
- `supabase_schema.sql`
- `migrate_sheets_to_supabase.js`

### ❌ NO incluir en Git:
- `asistente-app/node_modules/`
- `asistente-app/.next/`
- `asistente-app/.env.local`
- `node_modules/` (raíz)
- `*.log`

---

## 🎓 Recursos de Aprendizaje

### Conceptos Clave:
- **RAG**: Ver `asistente-app/lib/services/rag.ts`
- **Embeddings**: Ver `asistente-app/lib/services/openai.ts`
- **Vector Search**: Ver `supabase_schema.sql` (función `search_conversations`)
- **Next.js 15 App Router**: Ver estructura de `asistente-app/app/`

### Ejemplos Prácticos:
- **API REST**: `asistente-app/app/api/*/route.ts`
- **React Server Components**: `asistente-app/app/page.tsx`
- **Client Components**: `asistente-app/app/dashboard/page.tsx`

---

## 📞 Contacto y Soporte

### Documentación Externa:
- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **OpenAI**: https://platform.openai.com/docs
- **Telegram Bot API**: https://core.telegram.org/bots/api

### Issues Conocidos:
Revisar **GUIA_CONFIGURACION.md** sección "Troubleshooting"

---

**Última actualización**: Octubre 14, 2025
**Versión del Proyecto**: 1.0.0

⭐ **Tip**: Marca este archivo como favorito para navegación rápida por el proyecto.
