-- ============================================
-- SUPER HUMANO DIGITAL - SCHEMA COMPLETO
-- Base de datos: Mente Autónoma (Supabase)
-- ============================================

-- ============================================
-- EXTENSIONES NECESARIAS
-- ============================================

-- Habilitar extensión para vectores (embeddings/RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: users (Compartida - verificar si existe)
-- ============================================

-- Esta tabla puede existir ya, si no existe la creamos
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  nombre text,
  avatar_url text,
  chat_id bigint UNIQUE,  -- Para Telegram
  phone text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices para users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_chat_id ON users(chat_id);

-- ============================================
-- TABLA: assistant_lists (Listas personalizadas)
-- ============================================

CREATE TABLE IF NOT EXISTS assistant_lists (
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

-- Índices para assistant_lists
CREATE INDEX IF NOT EXISTS idx_assistant_lists_user_id ON assistant_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_lists_chat_id ON assistant_lists(chat_id);
CREATE INDEX IF NOT EXISTS idx_assistant_lists_tipo ON assistant_lists(tipo);
CREATE INDEX IF NOT EXISTS idx_assistant_lists_id_compuesta ON assistant_lists(id_compuesta);
CREATE INDEX IF NOT EXISTS idx_assistant_lists_completado ON assistant_lists(completado);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_assistant_lists_updated_at
  BEFORE UPDATE ON assistant_lists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: assistant_tasks (Tareas)
-- ============================================

CREATE TABLE IF NOT EXISTS assistant_tasks (
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

-- Índices para assistant_tasks
CREATE INDEX IF NOT EXISTS idx_assistant_tasks_user_id ON assistant_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_tasks_chat_id ON assistant_tasks(chat_id);
CREATE INDEX IF NOT EXISTS idx_assistant_tasks_completado ON assistant_tasks(completado);
CREATE INDEX IF NOT EXISTS idx_assistant_tasks_fecha_vencimiento ON assistant_tasks(fecha_vencimiento);
CREATE INDEX IF NOT EXISTS idx_assistant_tasks_prioridad ON assistant_tasks(prioridad);

-- Trigger para updated_at
CREATE TRIGGER update_assistant_tasks_updated_at
  BEFORE UPDATE ON assistant_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: assistant_conversations (Historial chat con embeddings)
-- ============================================

CREATE TABLE IF NOT EXISTS assistant_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  user_message text NOT NULL,
  ai_response text NOT NULL,
  context_used jsonb DEFAULT '[]'::jsonb,
  embedding vector(1536),  -- OpenAI text-embedding-3-small
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Índices para assistant_conversations
CREATE INDEX IF NOT EXISTS idx_assistant_conversations_user_id ON assistant_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_conversations_chat_id ON assistant_conversations(chat_id);
CREATE INDEX IF NOT EXISTS idx_assistant_conversations_created_at ON assistant_conversations(created_at DESC);

-- Índice vectorial para búsqueda semántica (RAG)
CREATE INDEX IF NOT EXISTS idx_assistant_conversations_embedding
  ON assistant_conversations
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- ============================================
-- TABLA: assistant_reminders (Recordatorios)
-- ============================================

CREATE TABLE IF NOT EXISTS assistant_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  mensaje text NOT NULL,
  fecha_recordatorio timestamptz NOT NULL,
  enviado boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Índices para assistant_reminders
CREATE INDEX IF NOT EXISTS idx_assistant_reminders_user_id ON assistant_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_reminders_chat_id ON assistant_reminders(chat_id);
CREATE INDEX IF NOT EXISTS idx_assistant_reminders_fecha_recordatorio ON assistant_reminders(fecha_recordatorio);
CREATE INDEX IF NOT EXISTS idx_assistant_reminders_enviado ON assistant_reminders(enviado);

-- ============================================
-- TABLA: assistant_calendar_events (Cache de Google Calendar)
-- ============================================

CREATE TABLE IF NOT EXISTS assistant_calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  chat_id bigint NOT NULL,
  google_event_id text NOT NULL,
  summary text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location text,
  attendees jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Índices para assistant_calendar_events
CREATE INDEX IF NOT EXISTS idx_assistant_calendar_events_user_id ON assistant_calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_assistant_calendar_events_chat_id ON assistant_calendar_events(chat_id);
CREATE INDEX IF NOT EXISTS idx_assistant_calendar_events_start_time ON assistant_calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_assistant_calendar_events_google_id ON assistant_calendar_events(google_event_id);

-- ============================================
-- FUNCIONES RPC (Para RAG y búsquedas)
-- ============================================

-- Función: search_conversations (Búsqueda semántica con embeddings)
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
  created_at timestamptz
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
    c.created_at
  FROM assistant_conversations c
  WHERE c.chat_id = user_chat_id
    AND c.embedding IS NOT NULL
    AND 1 - (c.embedding <-> query_embedding) > match_threshold
  ORDER BY c.embedding <-> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================

-- Función: get_user_stats (Estadísticas del usuario)
CREATE OR REPLACE FUNCTION get_user_stats(user_chat_id bigint)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_lists', (SELECT COUNT(*) FROM assistant_lists WHERE chat_id = user_chat_id),
    'total_tasks', (SELECT COUNT(*) FROM assistant_tasks WHERE chat_id = user_chat_id),
    'completed_tasks', (SELECT COUNT(*) FROM assistant_tasks WHERE chat_id = user_chat_id AND completado = true),
    'pending_tasks', (SELECT COUNT(*) FROM assistant_tasks WHERE chat_id = user_chat_id AND completado = false),
    'pending_reminders', (SELECT COUNT(*) FROM assistant_reminders WHERE chat_id = user_chat_id AND enviado = false),
    'total_conversations', (SELECT COUNT(*) FROM assistant_conversations WHERE chat_id = user_chat_id),
    'upcoming_events', (SELECT COUNT(*) FROM assistant_calendar_events WHERE chat_id = user_chat_id AND start_time > now())
  ) INTO stats;

  RETURN stats;
END;
$$;

-- ============================================

-- Función: get_pending_reminders (Para cron job)
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
  FROM assistant_reminders r
  WHERE r.enviado = false
    AND r.fecha_recordatorio <= now()
  ORDER BY r.fecha_recordatorio;
END;
$$;

-- ============================================

-- Función: mark_reminder_sent (Marcar recordatorio como enviado)
CREATE OR REPLACE FUNCTION mark_reminder_sent(reminder_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE assistant_reminders
  SET enviado = true
  WHERE id = reminder_id;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Seguridad
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE assistant_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_calendar_events ENABLE ROW LEVEL SECURITY;

-- Políticas para assistant_lists
CREATE POLICY "Users can view own lists"
  ON assistant_lists FOR SELECT
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can create own lists"
  ON assistant_lists FOR INSERT
  WITH CHECK (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can update own lists"
  ON assistant_lists FOR UPDATE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can delete own lists"
  ON assistant_lists FOR DELETE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

-- Políticas para assistant_tasks
CREATE POLICY "Users can view own tasks"
  ON assistant_tasks FOR SELECT
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can create own tasks"
  ON assistant_tasks FOR INSERT
  WITH CHECK (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON assistant_tasks FOR UPDATE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON assistant_tasks FOR DELETE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

-- Políticas para assistant_conversations
CREATE POLICY "Users can view own conversations"
  ON assistant_conversations FOR SELECT
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
  ON assistant_conversations FOR INSERT
  WITH CHECK (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

-- Políticas para assistant_reminders
CREATE POLICY "Users can view own reminders"
  ON assistant_reminders FOR SELECT
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can create own reminders"
  ON assistant_reminders FOR INSERT
  WITH CHECK (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can update own reminders"
  ON assistant_reminders FOR UPDATE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
  ON assistant_reminders FOR DELETE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

-- Políticas para assistant_calendar_events
CREATE POLICY "Users can view own events"
  ON assistant_calendar_events FOR SELECT
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can create own events"
  ON assistant_calendar_events FOR INSERT
  WITH CHECK (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can update own events"
  ON assistant_calendar_events FOR UPDATE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
  ON assistant_calendar_events FOR DELETE
  USING (chat_id = current_setting('app.chat_id')::bigint OR auth.uid() = user_id);

-- ============================================
-- VISTAS (Para consultas comunes)
-- ============================================

-- Vista: active_lists
CREATE OR REPLACE VIEW active_lists AS
SELECT
  l.*,
  jsonb_array_length(l.items) AS item_count
FROM assistant_lists l
WHERE l.completado = false
ORDER BY l.updated_at DESC;

-- Vista: pending_tasks
CREATE OR REPLACE VIEW pending_tasks AS
SELECT
  t.*
FROM assistant_tasks t
WHERE t.completado = false
ORDER BY
  CASE t.prioridad
    WHEN 'alta' THEN 1
    WHEN 'media' THEN 2
    WHEN 'baja' THEN 3
  END,
  t.fecha_vencimiento NULLS LAST;

-- Vista: recent_conversations
CREATE OR REPLACE VIEW recent_conversations AS
SELECT
  c.id,
  c.chat_id,
  c.user_message,
  c.ai_response,
  c.created_at
FROM assistant_conversations c
ORDER BY c.created_at DESC
LIMIT 100;

-- ============================================
-- TRIGGERS ADICIONALES
-- ============================================

-- Trigger para actualizar updated_at en users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS INICIALES / SEED (Opcional)
-- ============================================

-- Crear usuario de prueba si no existe
INSERT INTO users (email, nombre, chat_id)
VALUES ('test@menteautonoma.cl', 'Usuario Test', 999999999)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que todas las tablas se crearon
DO $$
BEGIN
  RAISE NOTICE 'Tablas creadas:';
  RAISE NOTICE '  - users';
  RAISE NOTICE '  - assistant_lists';
  RAISE NOTICE '  - assistant_tasks';
  RAISE NOTICE '  - assistant_conversations';
  RAISE NOTICE '  - assistant_reminders';
  RAISE NOTICE '  - assistant_calendar_events';
  RAISE NOTICE '';
  RAISE NOTICE 'Funciones RPC creadas:';
  RAISE NOTICE '  - search_conversations()';
  RAISE NOTICE '  - get_user_stats()';
  RAISE NOTICE '  - get_pending_reminders()';
  RAISE NOTICE '  - mark_reminder_sent()';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Schema del Super Humano Digital instalado correctamente!';
END $$;
