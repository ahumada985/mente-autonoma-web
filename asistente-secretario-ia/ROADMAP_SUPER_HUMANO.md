# 🚀 ROADMAP: Super Humano Digital

## 📊 Estado Actual

### ✅ COMPLETADO:
- [x] Sistema de listas personalizadas (crear, agregar, eliminar items)
- [x] Detección automática lista nueva vs existente
- [x] Actualización sin borrar datos existentes
- [x] Procesamiento multimodal (texto, voz, imágenes)
- [x] Integración con Google Calendar (crear, actualizar, eliminar eventos)
- [x] Base de datos en Google Sheets
- [x] Arquitectura n8n con flujos visuales
- [x] Telegram Bot con respuestas personalizadas

### 🔄 EN PROGRESO:
- [ ] Flujo LEER listas ("muéstrame mi lista de X")
- [ ] Flujo BORRAR listas completas

---

## 🔴 PRIORIDAD ALTA (Próximas 2-4 semanas)

### 1. Completar funciones básicas de listas
**Tareas:**
- [ ] Implementar comando "leer_listas" en n8n
  - Buscar lista por tipo y chat_id
  - Formatear items como lista bonita
  - Enviar por Telegram
- [ ] Implementar comando "borrar_lista" en n8n
  - Buscar lista por ID_compuesta
  - Eliminar fila completa en Sheets
  - Confirmar eliminación

**Tiempo estimado:** 2-3 días

---

### 2. Migración a Supabase (CRÍTICO para monetizar)
**Por qué es importante:**
- Google Sheets NO es profesional para producto comercial
- No escala con muchos usuarios
- Inversionistas lo verán mal
- Necesario para siguiente fase (embeddings)

**Tareas:**
- [ ] Crear proyecto en Supabase
- [ ] Diseñar schema de base de datos:
  ```sql
  -- Tabla: lists
  CREATE TABLE lists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id bigint NOT NULL,
    tipo text NOT NULL,
    titulo text,
    items jsonb NOT NULL,
    completado boolean DEFAULT false,
    fecha timestamptz DEFAULT now(),
    id_compuesta text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  -- Tabla: conversations (para memoria)
  CREATE TABLE conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id bigint NOT NULL,
    user_message text NOT NULL,
    ai_response text NOT NULL,
    timestamp timestamptz DEFAULT now(),
    embedding vector(1536),
    metadata jsonb
  );

  -- Tabla: tasks
  CREATE TABLE tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id bigint NOT NULL,
    tipo text NOT NULL,
    contenido text NOT NULL,
    detalles jsonb,
    completado boolean DEFAULT false,
    fecha_creacion timestamptz DEFAULT now(),
    fecha_vencimiento timestamptz
  );

  -- Índices
  CREATE INDEX idx_lists_chat_tipo ON lists(chat_id, tipo);
  CREATE INDEX idx_conversations_chat ON conversations(chat_id);
  CREATE INDEX idx_conversations_embedding ON conversations
    USING ivfflat (embedding vector_cosine_ops);
  ```

- [ ] Migrar datos existentes de Google Sheets a Supabase
- [ ] Actualizar workflows n8n para usar Supabase:
  - Cambiar nodos Google Sheets por HTTP Request a Supabase API
  - Usar Supabase REST API o SDK
- [ ] Probar todos los flujos con nueva base de datos

**Tiempo estimado:** 5-7 días

**Costo:** $25/mes (Supabase Pro)

---

### 3. Sistema de recordatorios con notificaciones
**Objetivo:** "Recuérdame comprar pan mañana a las 10am"

**Tareas:**
- [ ] Agregar tabla `reminders` en Supabase:
  ```sql
  CREATE TABLE reminders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id bigint NOT NULL,
    mensaje text NOT NULL,
    fecha_recordatorio timestamptz NOT NULL,
    enviado boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
  );
  ```
- [ ] Crear workflow n8n con Schedule Trigger:
  - Ejecutar cada 5 minutos
  - Buscar recordatorios pendientes (fecha <= now, enviado = false)
  - Enviar mensaje por Telegram
  - Marcar como enviado
- [ ] Actualizar prompt del AI Agent para detectar recordatorios:
  ```
  "action": "crear_recordatorio",
  "data": {
    "mensaje": "comprar pan",
    "fecha": "2025-10-15T10:00:00Z"
  }
  ```
- [ ] Crear flujo para parsear fechas naturales:
  - "mañana a las 10am"
  - "en 2 horas"
  - "el viernes"

**Tiempo estimado:** 4-5 días

---

### 4. Búsqueda en listas
**Objetivo:** "¿Qué tengo en mi lista de supermercado?"

**Tareas:**
- [ ] Actualizar AI Agent prompt para detectar consultas:
  ```
  "action": "leer_listas",
  "data": {
    "tipo": "supermercado"
  }
  ```
- [ ] Crear workflow "Leer Lista" en n8n:
  - Buscar en Supabase por chat_id + tipo
  - Formatear items como lista numerada
  - Si no existe: "No tienes lista de X"
- [ ] Agregar comando "mostrar todas mis listas":
  - Query: SELECT DISTINCT tipo FROM lists WHERE chat_id = X
  - Responder con tipos de listas existentes

**Tiempo estimado:** 2-3 días

---

## 🟡 PRIORIDAD MEDIA (1-2 meses)

### 5. Memoria a largo plazo con embeddings
**Objetivo:** Sistema recuerda conversaciones pasadas

**Arquitectura:**
```
Usuario pregunta algo
    ↓
Convertir pregunta a embedding (OpenAI Embeddings)
    ↓
Buscar conversaciones similares en Supabase
    (usando vector similarity search)
    ↓
Recuperar top 5 conversaciones relevantes
    ↓
Pasar a GPT-4 como contexto adicional
    ↓
Generar respuesta informada
```

**Tareas:**
- [ ] Setup OpenAI Embeddings en n8n:
  - API endpoint: `https://api.openai.com/v1/embeddings`
  - Modelo: `text-embedding-3-small` (más barato)
- [ ] Workflow "Guardar Conversación con Embedding":
  - Después de cada interacción del usuario
  - Generar embedding del mensaje + respuesta
  - Guardar en tabla `conversations`
- [ ] Workflow "Recuperar Contexto":
  - Antes de enviar mensaje al AI Agent
  - Generar embedding de la pregunta
  - Buscar en Supabase:
    ```sql
    SELECT * FROM conversations
    WHERE chat_id = X
    ORDER BY embedding <-> '[query_embedding]'
    LIMIT 5;
    ```
  - Agregar al contexto del AI Agent
- [ ] Optimizar:
  - Solo guardar conversaciones "importantes"
  - Filtrar por relevancia (similarity score > 0.7)

**Tiempo estimado:** 7-10 días

**Costo adicional:**
- OpenAI Embeddings: ~$0.0001 por 1K tokens (~$2-5/mes)
- Supabase ya incluye vector search

---

### 6. RAG (Retrieval Augmented Generation)
**Objetivo:** IA responde preguntas sobre TUS datos

**Casos de uso:**
- "¿Qué libros agregué este mes?"
- "¿Cuántas tareas completé esta semana?"
- "¿Qué eventos tengo mañana?"

**Tareas:**
- [ ] Crear funciones de búsqueda en Supabase:
  ```sql
  -- Buscar por fecha
  CREATE FUNCTION get_items_by_date(
    user_id bigint,
    start_date timestamptz,
    end_date timestamptz
  ) RETURNS TABLE (...);

  -- Buscar por completado
  CREATE FUNCTION get_completed_tasks(
    user_id bigint,
    periodo text
  ) RETURNS TABLE (...);
  ```

- [ ] Integrar RAG en AI Agent:
  - Detectar preguntas tipo "¿qué...?" "¿cuántos...?" "¿cuándo...?"
  - Ejecutar búsqueda en base de datos
  - Pasar resultados al AI para generar respuesta natural

- [ ] Agregar herramientas (tools) al AI Agent:
  ```javascript
  tools: [
    {
      name: "search_lists",
      description: "Busca items en listas del usuario",
      parameters: { tipo: string, fecha_desde: date }
    },
    {
      name: "count_tasks",
      description: "Cuenta tareas completadas",
      parameters: { periodo: string }
    }
  ]
  ```

**Tiempo estimado:** 5-7 días

---

### 7. Interfaz Web (Dashboard)
**Objetivo:** Ver y editar listas desde navegador

**Stack tecnológico:**
- Next.js 15 (ya lo usas)
- Prisma (ya lo tienes configurado)
- Supabase Auth (usuarios)
- TailwindCSS (ya lo usas)

**Tareas:**
- [ ] Crear páginas:
  - `/dashboard` - Vista general
  - `/listas` - Todas las listas
  - `/tareas` - Todas las tareas
  - `/calendario` - Vista de calendario
- [ ] Implementar auth con Supabase:
  - Login con Telegram (OAuth)
  - Vincular chat_id con usuario
- [ ] CRUD de listas:
  - Ver items
  - Agregar/eliminar items (click)
  - Marcar como completado
  - Drag & drop para reordenar
- [ ] Sincronización real-time:
  - Usar Supabase Realtime
  - Actualizar dashboard cuando llegue mensaje de Telegram

**Tiempo estimado:** 10-14 días

---

### 8. Análisis y estadísticas
**Tareas:**
- [ ] Dashboard con métricas:
  - Total de listas creadas
  - Items agregados por semana
  - Tareas completadas vs pendientes
  - Gráficos de uso
- [ ] Insights automáticos:
  - "Agregaste 15 items esta semana, 50% más que la anterior"
  - "Tu lista más usada es: supermercado"

**Tiempo estimado:** 5-7 días

---

## 🟢 PRIORIDAD BAJA (3+ meses)

### 9. Integraciones adicionales
- [ ] Notion (exportar listas)
- [ ] Todoist (sincronizar tareas)
- [ ] Gmail (crear tareas desde emails)
- [ ] Spotify (agregar canciones a listas)

### 10. Comandos por voz naturales
- [ ] "Comprar pan" → Agrega a lista supermercado automáticamente
- [ ] "Terminar tarea X" → Marca como completada
- [ ] Sin necesidad de estructura rígida

### 11. IA proactiva
- [ ] Sugerencias automáticas:
  - "Cada domingo agregas leche, ¿quieres que te recuerde?"
  - "Tienes 5 tareas pendientes de hace 1 semana"
- [ ] Detección de patrones
- [ ] Recordatorios inteligentes

---

## 📈 MÉTRICAS DE ÉXITO

### KPIs para monetización:
- [ ] **Usuarios activos diarios:** 100+ en 3 meses
- [ ] **Retention 30 días:** >40%
- [ ] **Mensajes por usuario/día:** >5
- [ ] **Tiempo de respuesta:** <2 segundos
- [ ] **Uptime:** >99.5%
- [ ] **NPS Score:** >50

### Hitos técnicos:
- [ ] Migración a Supabase completada
- [ ] Sistema de embeddings funcionando
- [ ] RAG respondiendo preguntas correctamente
- [ ] Dashboard web funcional
- [ ] API documentada para integraciones

---

## 💰 ESTRATEGIA DE MONETIZACIÓN

### Fase 1: MVP Gratuito (Ahora - 3 meses)
- Todo gratis
- Obtener primeros 100-500 usuarios
- Validar product-market fit
- Recopilar feedback

### Fase 2: Freemium (3-6 meses)
**Plan Gratuito:**
- 50 items en listas
- 10 tareas activas
- Sin búsqueda semántica
- Solo Telegram

**Plan Pro ($9.99/mes):**
- Listas ilimitadas
- Búsqueda semántica
- RAG completo
- Dashboard web
- Integraciones premium
- Soporte prioritario

### Fase 3: B2B (6+ meses)
**Plan Equipos ($49.99/mes):**
- Todo de Pro
- Listas compartidas
- Admin dashboard
- Analytics avanzados
- API access
- Custom integraciones

---

## 🎯 SIGUIENTES PASOS INMEDIATOS

### Esta semana:
1. ✅ Completar flujos leer/borrar listas (2 días)
2. 🔄 Crear proyecto Supabase y diseñar schema (1 día)
3. 🔄 Comenzar migración de Google Sheets → Supabase (2 días)

### Próxima semana:
1. Terminar migración a Supabase
2. Actualizar todos los workflows n8n
3. Testing completo
4. Comenzar sistema de recordatorios

### Próximo mes:
1. Recordatorios funcionando
2. Búsqueda en listas
3. Comenzar embeddings y memoria

---

## 📚 RECURSOS TÉCNICOS

### Documentación clave:
- Supabase Vector Docs: https://supabase.com/docs/guides/ai
- OpenAI Embeddings: https://platform.openai.com/docs/guides/embeddings
- n8n Supabase Node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/
- LangChain RAG: https://js.langchain.com/docs/tutorials/rag

### Costos estimados mensuales:

**Fase Actual (Google Sheets):**
- Google Cloud VM: $20
- OpenAI API: $10
- **TOTAL: $30/mes**

**Después de migración (Supabase):**
- Google Cloud VM: $20
- Supabase Pro: $25
- OpenAI API + Embeddings: $15
- **TOTAL: $60/mes**

**Con web dashboard:**
- Todo lo anterior: $60
- Vercel Pro: $20
- **TOTAL: $80/mes**

**Por usuario (con 1000 usuarios):**
- $80 / 1000 = **$0.08 por usuario/mes**
- Cobrar $9.99/mes = **Margen de $9.91 por usuario**

---

## 🔥 COMPETENCIA: Memorae

### Lo que ellos tienen mejor:
- ✅ Memoria semántica con embeddings
- ✅ RAG completo
- ✅ Interfaz web pulida
- ✅ Experiencia de usuario refinada

### Nuestras ventajas:
- ✅ Procesamiento de imágenes (ellos no)
- ✅ Sistema de listas más flexible
- ✅ Costo operativo más bajo
- ✅ Arquitectura n8n (más fácil de modificar)
- ✅ Self-hosted (control total)

### Para superarlos necesitamos:
1. 🔴 Memoria semántica (2-3 semanas)
2. 🔴 RAG funcional (1-2 semanas)
3. 🟡 Interfaz web competitiva (3-4 semanas)
4. 🟡 Marketing y UX refinado (ongoing)

**Tiempo total para igualarlos: 2-3 meses de desarrollo intensivo**

---

## ✅ CHECKLIST DE PREPARACIÓN PARA LANZAMIENTO

### Técnico:
- [ ] Migración a Supabase completada
- [ ] Todos los flujos probados y funcionando
- [ ] Embeddings y búsqueda semántica activa
- [ ] RAG respondiendo preguntas correctamente
- [ ] Sistema de recordatorios estable
- [ ] Dashboard web funcional
- [ ] Uptime monitoring configurado
- [ ] Backups automáticos diarios
- [ ] Rate limiting implementado
- [ ] Error logging (Sentry)

### Legal y negocio:
- [ ] Términos de servicio
- [ ] Política de privacidad
- [ ] Empresa constituida
- [ ] Stripe/PayPal configurado
- [ ] Facturación automática
- [ ] Sistema de soporte (email/chat)

### Marketing:
- [ ] Landing page
- [ ] Video demo
- [ ] Documentación de usuario
- [ ] FAQ completo
- [ ] Presencia en redes sociales
- [ ] Product Hunt launch preparado

---

## 🎯 OBJETIVO FINAL

**En 6 meses:**
- 1000+ usuarios activos
- $5,000+ MRR (Monthly Recurring Revenue)
- Producto competitivo con Memorae
- Ready para levantar inversión seed ($100K-$500K)

**En 12 meses:**
- 10,000+ usuarios activos
- $50,000+ MRR
- Equipo de 2-3 personas
- Series A ready ($1M-$3M)

---

**Última actualización:** 14 de Octubre, 2025
**Próxima revisión:** 21 de Octubre, 2025
