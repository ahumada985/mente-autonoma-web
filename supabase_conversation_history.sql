-- Tabla para historial de conversaciones del chatbot
CREATE TABLE IF NOT EXISTS conversation_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  message_id VARCHAR(255) NOT NULL,
  message_text TEXT NOT NULL,
  sender VARCHAR(10) NOT NULL CHECK (sender IN ('user', 'bot')),
  rating VARCHAR(20) CHECK (rating IN ('thumbs_up', 'thumbs_down')),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_conversation_history_session_id ON conversation_history(session_id);
CREATE INDEX IF NOT EXISTS idx_conversation_history_created_at ON conversation_history(created_at);
CREATE INDEX IF NOT EXISTS idx_conversation_history_sender ON conversation_history(sender);

-- RLS (Row Level Security) - Permitir acceso público para el chatbot
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura y escritura pública (para el chatbot)
CREATE POLICY "Allow public access to conversation_history" ON conversation_history
  FOR ALL USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_conversation_history_updated_at
  BEFORE UPDATE ON conversation_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE conversation_history IS 'Historial de conversaciones del chatbot de Mente Autónoma';
COMMENT ON COLUMN conversation_history.session_id IS 'ID único de la sesión de conversación';
COMMENT ON COLUMN conversation_history.message_id IS 'ID único del mensaje';
COMMENT ON COLUMN conversation_history.message_text IS 'Contenido del mensaje';
COMMENT ON COLUMN conversation_history.sender IS 'Quien envió el mensaje: user o bot';
COMMENT ON COLUMN conversation_history.rating IS 'Calificación del usuario: thumbs_up o thumbs_down';
COMMENT ON COLUMN conversation_history.feedback IS 'Comentario adicional del usuario';







