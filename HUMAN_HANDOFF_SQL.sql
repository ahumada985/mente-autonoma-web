-- 🤝 Sistema de Derivación a Humanos (Human Handoff)
-- Ejecutar en Supabase SQL Editor

-- Crear tabla de tickets de soporte humano
CREATE TABLE IF NOT EXISTS human_handoff_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_query TEXT NOT NULL,
  bot_response TEXT,
  handoff_reason TEXT NOT NULL CHECK (handoff_reason IN ('complex_query', 'escalation_request', 'bot_failure', 'specialized_knowledge', 'complaint')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'closed')),
  assigned_to TEXT,
  user_contact JSONB, -- {email, phone, name, preferred_method}
  context_data JSONB, -- Datos adicionales del contexto
  created_at TIMESTAMP DEFAULT NOW(),
  assigned_at TIMESTAMP,
  resolved_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_handoff_client ON human_handoff_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_handoff_status ON human_handoff_tickets(status);
CREATE INDEX IF NOT EXISTS idx_handoff_priority ON human_handoff_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_handoff_assigned ON human_handoff_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_handoff_created ON human_handoff_tickets(created_at);

-- Crear tabla de respuestas de agentes humanos
CREATE TABLE IF NOT EXISTS human_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES human_handoff_tickets(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  response_text TEXT NOT NULL,
  internal_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de configuración de handoff por cliente
CREATE TABLE IF NOT EXISTS client_handoff_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT REFERENCES clients(id) ON DELETE CASCADE UNIQUE,
  enabled BOOLEAN DEFAULT true,
  triggers JSONB DEFAULT '["complex_query", "escalation_request"]', -- Cuándo activar handoff
  notification_methods JSONB DEFAULT '["telegram", "email"]', -- Cómo notificar
  business_hours JSONB DEFAULT '{"start": "09:00", "end": "18:00", "timezone": "America/Santiago", "days": [1,2,3,4,5]}',
  auto_response_template TEXT DEFAULT 'Hemos recibido tu consulta y un especialista te contactará pronto.',
  escalation_contacts JSONB, -- Lista de contactos para diferentes tipos de escalación
  max_response_time INTEGER DEFAULT 120, -- Minutos máximo de respuesta esperada
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insertar configuración default para clientes existentes
INSERT INTO client_handoff_config (client_id, enabled, triggers, notification_methods, escalation_contacts)
SELECT
  id,
  true,
  '["complex_query", "escalation_request", "bot_failure"]'::jsonb,
  '["telegram", "email"]'::jsonb,
  jsonb_build_object(
    'support_email', admin_email,
    'telegram_chat_id', telegram_chat_id,
    'phone', phone
  )
FROM clients
WHERE active = true
ON CONFLICT (client_id) DO NOTHING;

-- Insertar algunos tickets de ejemplo
INSERT INTO human_handoff_tickets (client_id, session_id, user_query, bot_response, handoff_reason, priority, user_contact, context_data) VALUES
(
  'pizzeria_luigi',
  'session_123_handoff',
  'Necesito hacer un pedido especial para una boda de 200 personas el próximo sábado, con pizzas sin gluten y opciones veganas específicas',
  'Entiendo que necesitas un pedido especial. Te derivo con nuestro especialista en eventos.',
  'specialized_knowledge',
  'high',
  '{"name": "María González", "email": "maria@email.com", "phone": "+56912345678", "preferred_method": "phone"}',
  '{"event_type": "boda", "guest_count": 200, "special_requirements": ["sin_gluten", "vegano"], "date": "2024-01-20"}'
),
(
  'ferreteria_juan',
  'session_456_handoff',
  'Tengo un problema con un taladro que compré hace 2 semanas, no funciona bien y quiero que me lo cambien',
  'Lamento los problemas con tu compra. Te conectaré con servicio técnico.',
  'complaint',
  'medium',
  '{"name": "Carlos Silva", "email": "carlos@email.com", "phone": "+56987654321", "preferred_method": "email"}',
  '{"product": "taladro", "purchase_date": "2024-01-01", "issue": "mal funcionamiento", "warranty_status": "vigente"}'
);

-- Función para crear trigger de actualización automática
CREATE OR REPLACE FUNCTION update_handoff_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualización automática
DROP TRIGGER IF EXISTS trigger_update_handoff_timestamp ON human_handoff_tickets;
CREATE TRIGGER trigger_update_handoff_timestamp
  BEFORE UPDATE ON human_handoff_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_handoff_timestamp();

-- Crear trigger para actualización de configuración
DROP TRIGGER IF EXISTS trigger_update_config_timestamp ON client_handoff_config;
CREATE TRIGGER trigger_update_config_timestamp
  BEFORE UPDATE ON client_handoff_config
  FOR EACH ROW
  EXECUTE FUNCTION update_handoff_timestamp();

-- Verificar inserción
SELECT
  t.id,
  t.client_id,
  t.handoff_reason,
  t.priority,
  t.status,
  t.user_query,
  t.created_at
FROM human_handoff_tickets t
ORDER BY t.created_at DESC;

-- Ver configuración por cliente
SELECT
  c.client_id,
  cl.name as client_name,
  c.enabled,
  c.triggers,
  c.notification_methods,
  c.business_hours
FROM client_handoff_config c
JOIN clients cl ON c.client_id = cl.id
ORDER BY cl.name;