-- 📚 Sistema de Base de Conocimiento por Cliente
-- Ejecutar en Supabase SQL Editor

-- Crear tabla de base de conocimiento
CREATE TABLE IF NOT EXISTS client_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('about', 'services', 'faq', 'cases', 'values', 'policies')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_knowledge_client ON client_knowledge_base(client_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_client_type ON client_knowledge_base(client_id, document_type);
CREATE INDEX IF NOT EXISTS idx_knowledge_active ON client_knowledge_base(active);
CREATE INDEX IF NOT EXISTS idx_knowledge_search ON client_knowledge_base USING gin(to_tsvector('spanish', title || ' ' || content));

-- Insertar documentos de ejemplo para Pizzería Luigi
INSERT INTO client_knowledge_base (client_id, document_type, title, content, metadata) VALUES
(
  'pizzeria_luigi',
  'about',
  'Sobre Pizzería Luigi',
  'Somos una pizzería familiar italiana con más de 15 años de experiencia en Santiago. Fundada por Luigi Rossi en 2008, nos especializamos en pizzas artesanales hechas con ingredientes frescos e importados directamente de Italia. Nuestro horno de leña tradicional le da a nuestras pizzas ese sabor auténtico que nos caracteriza.',
  '{"founded": 2008, "specialty": "pizzas artesanales", "location": "Santiago"}'
),
(
  'pizzeria_luigi',
  'services',
  'Nuestros Servicios',
  'PIZZAS ARTESANALES: Más de 20 variedades de pizzas hechas en horno de leña
DELIVERY GRATIS: Entregas sin costo en un radio de 5km
CATERING: Servicios para eventos corporativos y familiares
TAKE AWAY: Retiro en local con descuento del 10%
RESERVAS: Mesas disponibles para grupos hasta 25 personas',
  '{"delivery_radius": "5km", "max_group": 25, "takeaway_discount": 10}'
),
(
  'pizzeria_luigi',
  'faq',
  'Horarios de Atención',
  'Lunes a Jueves: 18:00 - 23:30
Viernes y Sábados: 18:00 - 00:30
Domingos: 18:00 - 23:00

DELIVERY disponible en todos los horarios.
Última orden 30 minutos antes del cierre.',
  '{"category": "horarios", "delivery_cutoff": "30min", "priority": "high"}'
),
(
  'pizzeria_luigi',
  'faq',
  'Precios y Formas de Pago',
  'Pizzas personales: $8.000 - $12.000
Pizzas familiares: $15.000 - $22.000
Bebidas: $2.500 - $4.000

FORMAS DE PAGO:
- Efectivo
- Tarjetas de débito y crédito
- Transferencia bancaria
- WebPay

Delivery mínimo: $15.000',
  '{"min_delivery": 15000, "payment_methods": ["efectivo", "tarjetas", "transferencia", "webpay"]}'
),
(
  'pizzeria_luigi',
  'values',
  'Nuestros Valores',
  'CALIDAD: Utilizamos solo ingredientes frescos y de primera calidad
TRADICIÓN: Recetas familiares italianas transmitidas por generaciones
SERVICIO: Atención personalizada y calidez humana en cada pedido
COMUNIDAD: Apoyamos a productores locales y agricultura sustentable
PASIÓN: Amor por la cocina italiana en cada pizza que preparamos',
  '{"core_values": ["calidad", "tradición", "servicio", "comunidad", "pasión"]}'
);

-- Insertar documentos básicos para Ferretería Don Juan
INSERT INTO client_knowledge_base (client_id, document_type, title, content, metadata) VALUES
(
  'ferreteria_juan',
  'about',
  'Sobre Ferretería Don Juan',
  'Ferretería familiar con 25 años sirviendo a la comunidad. Nos especializamos en herramientas, materiales de construcción y asesoría técnica personalizada. Don Juan y su equipo te ayudan a encontrar exactamente lo que necesitas para tu proyecto.',
  '{"founded": 1998, "specialty": "herramientas y construcción"}'
),
(
  'ferreteria_juan',
  'services',
  'Nuestros Productos y Servicios',
  'HERRAMIENTAS: Manuales, eléctricas y especializadas
MATERIALES: Cemento, fierro, madera, pintura
PLOMERÍA: Cañerías, llaves, accesorios completos
ELECTRICIDAD: Cables, interruptores, luminarias
JARDÍN: Plantas, tierra, fertilizantes, herramientas
ASESORÍA: Consultas técnicas sin costo adicional',
  '{"categories": ["herramientas", "materiales", "plomería", "electricidad", "jardín"]}'
);

-- Verificar inserción
SELECT
  client_id,
  document_type,
  title,
  length(content) as content_length,
  created_at
FROM client_knowledge_base
ORDER BY client_id, document_type, created_at;