-- Tablas para sistema de feedbacks y ratings del chatbot
-- Ejecutar en Supabase SQL Editor

-- Tabla de ratings (👍👎)
CREATE TABLE IF NOT EXISTS chatbot_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  rating VARCHAR(20) NOT NULL CHECK (rating IN ('thumbs_up', 'thumbs_down')),
  user_id VARCHAR(255) DEFAULT 'anonymous',
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de feedbacks (comentarios)
CREATE TABLE IF NOT EXISTS chatbot_feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  feedback TEXT NOT NULL,
  user_id VARCHAR(255) DEFAULT 'anonymous',
  user_agent TEXT,
  page_url TEXT,
  is_processed BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de conversaciones (para contexto)
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  user_id VARCHAR(255) DEFAULT 'anonymous',
  response_time_ms INTEGER,
  tokens_used INTEGER,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_ratings_session_id ON chatbot_ratings(session_id);
CREATE INDEX IF NOT EXISTS idx_ratings_created_at ON chatbot_ratings(created_at);
CREATE INDEX IF NOT EXISTS idx_ratings_rating ON chatbot_ratings(rating);

CREATE INDEX IF NOT EXISTS idx_feedbacks_session_id ON chatbot_feedbacks(session_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON chatbot_feedbacks(created_at);
CREATE INDEX IF NOT EXISTS idx_feedbacks_processed ON chatbot_feedbacks(is_processed);

CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON chatbot_conversations(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_ratings_updated_at 
    BEFORE UPDATE ON chatbot_ratings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedbacks_updated_at 
    BEFORE UPDATE ON chatbot_feedbacks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Vista para estadísticas de satisfacción
CREATE OR REPLACE VIEW chatbot_satisfaction_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_ratings,
  COUNT(CASE WHEN rating = 'thumbs_up' THEN 1 END) as thumbs_up,
  COUNT(CASE WHEN rating = 'thumbs_down' THEN 1 END) as thumbs_down,
  ROUND(
    (COUNT(CASE WHEN rating = 'thumbs_up' THEN 1 END)::NUMERIC / COUNT(*)) * 100, 
    2
  ) as satisfaction_rate
FROM chatbot_ratings
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Vista para feedbacks no procesados
CREATE OR REPLACE VIEW unprocessed_feedbacks AS
SELECT 
  f.*,
  c.user_message,
  c.bot_response,
  c.created_at as conversation_date
FROM chatbot_feedbacks f
LEFT JOIN chatbot_conversations c ON f.message_id = c.id::TEXT
WHERE f.is_processed = FALSE
ORDER BY f.created_at DESC;

-- Políticas RLS (Row Level Security)
ALTER TABLE chatbot_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción pública (cualquiera puede calificar)
CREATE POLICY "Allow public insert on ratings" ON chatbot_ratings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on feedbacks" ON chatbot_feedbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on conversations" ON chatbot_conversations
  FOR INSERT WITH CHECK (true);

-- Política para permitir lectura pública (para analytics)
CREATE POLICY "Allow public read on ratings" ON chatbot_ratings
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on feedbacks" ON chatbot_feedbacks
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on conversations" ON chatbot_conversations
  FOR SELECT USING (true);

-- Política para permitir actualización de feedbacks (para marcar como procesados)
CREATE POLICY "Allow public update on feedbacks" ON chatbot_feedbacks
  FOR UPDATE USING (true);
