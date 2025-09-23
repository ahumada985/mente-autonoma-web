# 🏢 Configuración Sistema Multi-Cliente

## 📋 Pasos para Configurar el Sistema Comercial

### 1. 🗄️ Configurar Base de Datos (Supabase)

Ejecuta estos comandos en tu **Supabase SQL Editor**:

```sql
-- 1. Agregar columna client_id a conversation_history
ALTER TABLE conversation_history
ADD COLUMN IF NOT EXISTS client_id TEXT DEFAULT 'mente_autonoma';

-- 2. Crear tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  domain TEXT,
  plan TEXT DEFAULT 'basic',
  custom_prompt TEXT,
  theme_colors JSONB DEFAULT '{"primary": "#6366f1", "secondary": "#8b5cf6"}',
  business_hours JSONB DEFAULT '{"enabled": false, "timezone": "America/Santiago", "schedule": {"monday": {"open": "09:00", "close": "18:00", "closed": false}}}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- 3. Insertar cliente por defecto (Mente Autónoma)
INSERT INTO clients (id, name, admin_email, domain, plan)
VALUES ('mente_autonoma', 'Mente Autónoma', 'ahumada.gb85@gmail.com', 'menteautonoma.cl', 'premium')
ON CONFLICT (id) DO NOTHING;

-- 4. Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_conversation_history_client_id ON conversation_history(client_id);
CREATE INDEX IF NOT EXISTS idx_conversation_history_client_date ON conversation_history(client_id, created_at);
CREATE INDEX IF NOT EXISTS idx_clients_active ON clients(active);
```

### 2. 🧪 Probar el Sistema

#### **Crear un Cliente de Prueba:**
```bash
curl -X POST http://localhost:3004/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "id": "restaurante_demo",
    "name": "Restaurante Demo",
    "admin_email": "demo@restaurante.com",
    "domain": "restaurantedemo.cl",
    "plan": "basic",
    "custom_prompt": "Eres un asistente de un restaurante especializado en comida italiana."
  }'
```

#### **Ver Todos los Clientes:**
```bash
curl http://localhost:3004/api/clients
```

#### **Ver Analytics de un Cliente:**
```bash
curl "http://localhost:3004/api/analytics-chatbot?client_id=restaurante_demo&days=7"
```

#### **Enviar Reporte Semanal:**
```bash
curl -X POST http://localhost:3004/api/weekly-reports \
  -H "Content-Type: application/json" \
  -d '{"clientId": "restaurante_demo"}'
```

---

## 🔧 Usando el Sistema

### **Para Cada Cliente Nuevo:**

1. **Crear Cliente:**
   ```bash
   POST /api/clients
   {
     "id": "nombre_unico_cliente",
     "name": "Nombre del Negocio",
     "admin_email": "admin@cliente.com",
     "domain": "www.cliente.com",
     "custom_prompt": "Prompt personalizado del chatbot"
   }
   ```

2. **Configurar Widget del Cliente:**
   - El widget debe incluir `client_id` en las llamadas a la API
   - Ejemplo: `client_id: "nombre_unico_cliente"`

3. **Analytics por Cliente:**
   - `/api/analytics-chatbot?client_id=CLIENTE_ID`
   - Datos separados automáticamente

4. **Reportes Automáticos:**
   - Reporte individual: `POST /api/weekly-reports {"clientId": "CLIENTE_ID"}`
   - Todos los clientes: `GET /api/weekly-reports`

---

## 📊 Gestión Comercial

### **Panel de Control (Para Ti):**

```bash
# Ver todos los clientes
curl http://localhost:3004/api/clients

# Ver estadísticas globales (todos los clientes)
curl http://localhost:3004/api/analytics-chatbot

# Enviar reportes a todos los clientes
curl http://localhost:3004/api/weekly-reports
```

### **Desactivar Cliente:**
```bash
curl -X DELETE "http://localhost:3004/api/clients?client_id=CLIENTE_ID"
```

### **Actualizar Cliente:**
```bash
curl -X PUT http://localhost:3004/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "id": "CLIENTE_ID",
    "plan": "premium",
    "active": true
  }'
```

---

## ⚙️ Automatización

### **Reportes Semanales Automáticos:**

Configura un **cron job** o **GitHub Actions** para enviar reportes cada lunes:

```bash
# Todos los lunes a las 9:00 AM
0 9 * * 1 curl http://tu-dominio.com/api/weekly-reports
```

### **Monitoreo de Uso:**

```bash
# Ver uso por cliente (últimos 30 días)
curl "http://localhost:3004/api/analytics-chatbot?client_id=CLIENTE_ID&days=30"
```

---

## 🔒 Estructura de Datos

### **Tabla `clients`:**
```sql
{
  id: "restaurante_maria",          -- ID único
  name: "Restaurante Doña María",   -- Nombre visible
  admin_email: "maria@rest.com",    -- Email para reportes
  domain: "restaurantemaria.cl",    -- Dominio del cliente
  plan: "basic",                    -- Plan: basic/premium
  custom_prompt: "...",             -- Prompt personalizado
  theme_colors: {...},              -- Colores del chatbot
  business_hours: {...},            -- Horarios de negocio
  active: true                      -- Cliente activo
}
```

### **Tabla `conversation_history`:**
```sql
{
  id: "...",
  client_id: "restaurante_maria",   -- 🆕 Identifica el cliente
  session_id: "...",
  message_text: "...",
  sender: "user|bot",
  created_at: "..."
}
```

---

## 🚀 Próximos Pasos

1. **✅ Sistema básico funcionando**
2. **✅ Identificación por cliente**
3. **✅ Reportes automáticos**
4. **🔄 Widget personalizable por cliente**
5. **🔄 Panel de administración web**

---

## 🧪 Comandos de Prueba Rápida

```bash
# 1. Crear cliente de prueba
curl -X POST http://localhost:3004/api/clients -H "Content-Type: application/json" -d '{"id": "test_client", "name": "Cliente Test", "admin_email": "test@test.com"}'

# 2. Ver cliente creado
curl http://localhost:3004/api/clients?client_id=test_client

# 3. Ver analytics del cliente
curl "http://localhost:3004/api/analytics-chatbot?client_id=test_client"

# 4. Enviar reporte de prueba
curl -X POST http://localhost:3004/api/weekly-reports -H "Content-Type: application/json" -d '{"clientId": "test_client"}'
```

¡Ya tienes un **sistema comercial completo** para vender chatbots! 🎉