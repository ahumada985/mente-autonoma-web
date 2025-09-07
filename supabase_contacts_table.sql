-- Tabla de contactos para el formulario de contacto
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  contact_type VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100) DEFAULT 'contact_form'
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Políticas de seguridad RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción desde la aplicación
CREATE POLICY "Allow insert from authenticated users" ON contacts
  FOR INSERT WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados (opcional)
CREATE POLICY "Allow read for authenticated users" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Comentarios de la tabla
COMMENT ON TABLE contacts IS 'Tabla para almacenar mensajes del formulario de contacto';
COMMENT ON COLUMN contacts.id IS 'Identificador único del contacto';
COMMENT ON COLUMN contacts.name IS 'Nombre completo de la persona';
COMMENT ON COLUMN contacts.email IS 'Email de contacto';
COMMENT ON COLUMN contacts.company IS 'Empresa o organización';
COMMENT ON COLUMN contacts.message IS 'Mensaje del contacto';
COMMENT ON COLUMN contacts.contact_type IS 'Tipo de contacto (soporte, legal, privacidad, general)';
COMMENT ON COLUMN contacts.created_at IS 'Fecha y hora de creación del contacto';
COMMENT ON COLUMN contacts.status IS 'Estado del contacto: new, read, replied, closed';
COMMENT ON COLUMN contacts.source IS 'Origen del contacto: contact_form, header_button, etc.';







