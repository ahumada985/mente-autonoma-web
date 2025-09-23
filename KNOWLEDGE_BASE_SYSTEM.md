# 📚 Sistema de Base de Conocimiento por Cliente

## 🎯 PROPUESTA DE IMPLEMENTACIÓN

### **Estructura de Base de Datos:**

```sql
-- Tabla de documentos por cliente
CREATE TABLE client_knowledge_base (
  id UUID PRIMARY KEY,
  client_id TEXT REFERENCES clients(id),
  document_type TEXT, -- 'about', 'services', 'faq', 'cases', 'values', 'policies'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_knowledge_client_type ON client_knowledge_base(client_id, document_type);
CREATE INDEX idx_knowledge_search ON client_knowledge_base USING gin(to_tsvector('spanish', content));
```

### **Tipos de Documentos por Cliente:**

#### **1. 📖 Información Básica (`about`):**
```json
{
  "title": "Sobre Pizzería Luigi",
  "content": "Somos una pizzería familiar italiana con 20 años de experiencia. Fundada en 2003 por Luigi Rossi, ofrecemos auténticas pizzas artesanales con ingredientes importados de Italia.",
  "metadata": {
    "founded": 2003,
    "specialty": "pizzas artesanales",
    "location": "Santiago Centro"
  }
}
```

#### **2. 🛠️ Servicios (`services`):**
```json
{
  "title": "Nuestros Servicios",
  "content": "- Pizzas artesanales (15 variedades)\n- Delivery gratis en Santiago Centro\n- Catering para eventos\n- Clases de cocina italiana\n- Reservas para grupos",
  "metadata": {
    "delivery_area": "Santiago Centro",
    "min_delivery": 15000,
    "group_capacity": 50
  }
}
```

#### **3. ❓ Preguntas Frecuentes (`faq`):**
```json
{
  "title": "¿Cuál es el horario de atención?",
  "content": "Lunes a Jueves: 18:00 - 23:00\nViernes y Sábados: 18:00 - 24:00\nDomingos: Cerrado",
  "metadata": {
    "category": "horarios",
    "priority": "high"
  }
}
```

#### **4. 🏆 Casos de Éxito (`cases`):**
```json
{
  "title": "Evento Corporativo Banco de Chile",
  "content": "Atendimos exitosamente a 200 ejecutivos del Banco de Chile con nuestro servicio de catering. Entregamos 80 pizzas artesanales en tiempo récord.",
  "metadata": {
    "client": "Banco de Chile",
    "people": 200,
    "year": 2024
  }
}
```

#### **5. 💎 Valores y Cultura (`values`):**
```json
{
  "title": "Nuestros Valores",
  "content": "Calidad: Ingredientes frescos y de origen.\nTradición: Recetas familiares italianas.\nServicio: Atención personalizada y calidez humana.\nComunidad: Apoyamos a productores locales.",
  "metadata": {
    "core_values": ["calidad", "tradición", "servicio", "comunidad"]
  }
}
```

#### **6. 📋 Políticas y Procedimientos (`policies`):**
```json
{
  "title": "Política de Devoluciones",
  "content": "Si no estás satisfecho con tu pedido, lo reemplazamos sin costo. Tiempo límite: 30 minutos desde la entrega. Solo aplicable a productos con defectos de calidad.",
  "metadata": {
    "time_limit": "30 minutos",
    "conditions": ["defectos de calidad"]
  }
}
```

---

## 🔧 **API de Gestión de Conocimiento:**

### **Endpoints Necesarios:**

```typescript
// Subir documento
POST /api/knowledge-base
{
  "client_id": "pizzeria_luigi",
  "document_type": "services",
  "title": "Nuestro Menú",
  "content": "Pizza Margherita $12.000..."
}

// Obtener conocimiento del cliente
GET /api/knowledge-base?client_id=pizzeria_luigi&type=services

// Buscar en la base de conocimiento
GET /api/knowledge-base/search?client_id=pizzeria_luigi&q=horarios

// Actualizar documento
PUT /api/knowledge-base/{id}

// Eliminar documento
DELETE /api/knowledge-base/{id}
```

---

## 🤖 **Integración con el Chatbot:**

### **Flujo de Respuesta Inteligente:**

```typescript
async function generateResponse(userMessage: string, clientId: string) {
  // 1. Buscar en la base de conocimiento del cliente
  const relevantDocs = await searchKnowledgeBase(clientId, userMessage);

  // 2. Construir contexto personalizado
  const context = relevantDocs.map(doc => `${doc.title}: ${doc.content}`).join('\n');

  // 3. Prompt personalizado con conocimiento específico
  const prompt = `
    Eres el asistente de ${clientData.name}.

    INFORMACIÓN ESPECÍFICA:
    ${context}

    CUSTOM PROMPT: ${clientData.custom_prompt}

    Usuario pregunta: ${userMessage}

    Responde basándote ÚNICAMENTE en la información proporcionada.
  `;

  // 4. Enviar a OpenAI con contexto enriquecido
  return await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
}
```

---

## 📂 **Panel de Administración por Cliente:**

### **Interfaz Sugerida:**

```
📚 BASE DE CONOCIMIENTO - Pizzería Luigi

┌─ Información Básica ─────────────────┐
│ ✅ Sobre nosotros                    │
│ ✅ Historia de la empresa            │
│ ⚠️  Ubicación y contacto (falta)     │
└──────────────────────────────────────┘

┌─ Servicios ──────────────────────────┐
│ ✅ Menú de pizzas                    │
│ ✅ Servicios de delivery             │
│ ❌ Catering (no configurado)         │
└──────────────────────────────────────┘

┌─ Acciones ───────────────────────────┐
│ [+ Agregar Documento] [📤 Importar]  │
│ [🔍 Vista Previa] [📊 Analytics]     │
└──────────────────────────────────────┘
```

---

## 💰 **Planes y Limitaciones:**

### **Plan Basic:**
- ✅ 5 documentos máximo
- ✅ Tipos básicos (about, services, faq)

### **Plan Pro:**
- ✅ 20 documentos máximo
- ✅ Todos los tipos de documentos
- ✅ Búsqueda avanzada

### **Plan Premium:**
- ✅ Documentos ilimitados
- ✅ IA vectorial para búsqueda semántica
- ✅ Importación automática desde web
- ✅ Análisis de gaps de conocimiento

---

## 🚀 **Implementación por Fases:**

### **Fase 1:** Base de datos y API básica
### **Fase 2:** Interface de gestión de documentos
### **Fase 3:** Integración con chatbot
### **Fase 4:** Búsqueda semántica avanzada
### **Fase 5:** Análisis automático de contenido

¿Te parece una buena propuesta? ¿Por dónde empezamos?