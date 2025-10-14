# 🚀 IMPLEMENTACIÓN COMPLETA - OCR/VISIÓN + MODIFICAR LISTAS

**Fecha:** 2025-10-09
**Funcionalidades:** OCR/Visión y Modificar Listas

---

## 📋 RESUMEN DE CAMBIOS

### 1️⃣ OCR/VISIÓN
- Detectar imágenes en Telegram
- Procesar con GPT-4o (modelo con visión)
- Extraer texto o analizar imagen

### 2️⃣ MODIFICAR LISTAS
- Leer listas existentes de Google Sheets
- Agregar items a listas
- Eliminar items de listas
- Borrar listas completas
- Consultar listas guardadas

---

## 🔧 PARTE 1: OCR/VISIÓN

### PASO 1: Agregar detección de foto en Switch

En el nodo **"Switch1"**, agrega una tercera opción:

**Condiciones:**
```javascript
={{ $json.message.photo ? "foto" : "ninguno" }}
```

**Output key:** `foto`

### PASO 2: Crear nodo "Get Photo Info"

**Tipo:** HTTP Request
**URL:**
```javascript
=https://api.telegram.org/bot7753848250:AAFdSOS4jvYpTUDXztgdiA_1K3fvFKNa1uY/getFile?file_id={{$json.message.photo[$json.message.photo.length - 1].file_id}}
```

**Explicación:** Telegram envía múltiples tamaños de foto, tomamos la más grande (última en el array)

### PASO 3: Crear nodo "Download Photo"

**Tipo:** HTTP Request
**URL:**
```javascript
=https://api.telegram.org/file/bot7753848250:AAFdSOS4jvYpTUDXztgdiA_1K3fvFKNa1uY/{{$node["Get Photo Info"].json.result.file_path}}
```

**Response Format:** File

### PASO 4: Crear nodo "Procesar Imagen con GPT-4"

**Tipo:** HTTP Request
**Method:** POST
**URL:** `https://api.openai.com/v1/chat/completions`

**Headers:**
```json
{
  "Authorization": "Bearer {{$credentials.openAiApi.apiKey}}",
  "Content-Type": "application/json"
}
```

**Body (JSON):**
```json
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Extrae todo el texto que veas en esta imagen. Si no hay texto, describe lo que ves en la imagen."
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/jpeg;base64,{{$binary.data.toString('base64')}}"
          }
        }
      ]
    }
  ],
  "max_tokens": 1000
}
```

### PASO 5: Crear nodo "Extraer Respuesta Imagen"

**Tipo:** Code
**JavaScript:**
```javascript
const response = $input.item.json;
const chatId = $node["Telegram Trigger"].json.message.chat.id;

return [{
  json: {
    chat_id: chatId,
    ai_response: "📷 " + response.choices[0].message.content,
    has_action: false
  }
}];
```

### PASO 6: Conectar al flujo

**Conexiones:**
```
Switch1 (output: foto) → Get Photo Info → Download Photo → Procesar Imagen con GPT-4 → Extraer Respuesta Imagen → Telegram Response
```

---

## 🔧 PARTE 2: MODIFICAR LISTAS

### PASO 1: Crear nodo "Switch por Acción"

Después del nodo **"¿Tiene acción?"**, agrega un Switch para diferenciar acciones:

**Tipo:** Switch
**Conditions:**

1. **Crear/Guardar** (output: `guardar`)
```javascript
={{ ['crear_lista', 'crear_nota', 'crear_tarea', 'crear_recordatorio'].includes($json.action) }}
```

2. **Modificar Lista** (output: `modificar`)
```javascript
={{ $json.action === 'modificar_lista' }}
```

3. **Borrar Lista** (output: `borrar`)
```javascript
={{ $json.action === 'borrar_lista' }}
```

4. **Leer Listas** (output: `leer`)
```javascript
={{ $json.action === 'leer_listas' }}
```

### PASO 2: MODIFICAR LISTA - Nodo "Buscar Lista Existente"

**Tipo:** Google Sheets
**Operation:** Lookup
**Document:** 1vmIpxm3PJ8mDvhDEavBqbEHE9Aq28r0sXRSf6ndcTpE
**Sheet:** `Listas`

**Lookup Column:** `tipo`
**Lookup Value:**
```javascript
={{ $json.data.tipo }}
```

### PASO 3: MODIFICAR LISTA - Nodo "Procesar Modificación"

**Tipo:** Code
**JavaScript:**
```javascript
const chatId = $json.chat_id;
const operacion = $json.data.operacion; // 'agregar' o 'eliminar'
const nuevoItem = $json.data.item;

// Datos de la lista existente
const filaExistente = $node["Buscar Lista Existente"].json;

if (!filaExistente) {
  return [{
    json: {
      chat_id: chatId,
      ai_response: "❌ No encontré esa lista. ¿Quieres crearla primero?",
      has_action: false
    }
  }];
}

// Parsear items existentes
let items = [];
try {
  if (filaExistente.items && filaExistente.items !== '') {
    items = JSON.parse(filaExistente.items);
  }
} catch(e) {
  items = [];
}

// Realizar operación
if (operacion === 'agregar') {
  items.push(nuevoItem);
  var mensaje = `✅ Agregado "${nuevoItem}" a tu lista de ${$json.data.tipo}`;
} else if (operacion === 'eliminar') {
  const index = items.findIndex(i => i.toLowerCase().includes(nuevoItem.toLowerCase()));
  if (index !== -1) {
    const eliminado = items.splice(index, 1)[0];
    var mensaje = `🗑️ Eliminado "${eliminado}" de tu lista de ${$json.data.tipo}`;
  } else {
    return [{
      json: {
        chat_id: chatId,
        ai_response: `❌ No encontré "${nuevoItem}" en tu lista`,
        has_action: false
      }
    }];
  }
}

// Retornar datos actualizados para Google Sheets
return [{
  json: {
    row_id: filaExistente.row_number || filaExistente.rowIndex,
    tipo: $json.data.tipo,
    items: JSON.stringify(items),
    chat_id: chatId,
    ai_response: mensaje,
    titulo: filaExistente.titulo
  }
}];
```

### PASO 4: MODIFICAR LISTA - Nodo "Actualizar en Sheets"

**Tipo:** Google Sheets
**Operation:** Update
**Document:** 1vmIpxm3PJ8mDvhDEavBqbEHE9Aq28r0sXRSf6ndcTpE
**Sheet:** `Listas`

**Columns:**
```javascript
items: ={{ $json.items }}
```

**Key:** Row ID/Row Number (depende de versión de n8n)

### PASO 5: BORRAR LISTA - Nodo "Eliminar Lista de Sheets"

**Tipo:** Google Sheets
**Operation:** Delete
**Document:** 1vmIpxm3PJ8mDvhDEavBqbEHE9Aq28r0sXRSf6ndcTpE
**Sheet:** `Listas`

**Primero necesitas buscar la lista (como en modificar), luego:**

**Row ID:**
```javascript
={{ $node["Buscar Lista Existente"].json.row_number }}
```

### PASO 6: LEER LISTAS - Nodo "Obtener Listas"

**Tipo:** Google Sheets
**Operation:** Read
**Document:** 1vmIpxm3PJ8mDvhDEavBqbEHE9Aq28r0sXRSf6ndcTpE
**Sheet:** `Listas`

**Filter:**
```javascript
={{ $json.data.tipo === 'todas' ? '' : $json.data.tipo }}
```

### PASO 7: LEER LISTAS - Nodo "Formatear Respuesta Listas"

**Tipo:** Code
**JavaScript:**
```javascript
const chatId = $node["Extraer Comando"].json.chat_id;
const tipo = $node["Extraer Comando"].json.data.tipo;
const listas = $input.all();

if (tipo === 'todas') {
  // Listar todas las listas
  let mensaje = "📚 Tus listas:\n\n";
  listas.forEach(lista => {
    let items = [];
    try {
      if (lista.json.items) {
        items = JSON.parse(lista.json.items);
      }
    } catch(e) {}
    mensaje += `📋 ${lista.json.tipo} (${items.length} items)\n`;
  });

  return [{
    json: {
      chat_id: chatId,
      ai_response: mensaje,
      has_action: false
    }
  }];
} else {
  // Mostrar una lista específica
  if (listas.length === 0) {
    return [{
      json: {
        chat_id: chatId,
        ai_response: `❌ No encontré la lista de ${tipo}`,
        has_action: false
      }
    }];
  }

  const lista = listas[0].json;
  let items = [];
  try {
    if (lista.items) {
      items = JSON.parse(lista.items);
    }
  } catch(e) {}

  let mensaje = `📋 Lista de ${tipo}:\n\n`;
  if (items.length === 0) {
    mensaje += "La lista está vacía";
  } else {
    items.forEach(item => {
      mensaje += `☐ ${item}\n`;
    });
  }

  return [{
    json: {
      chat_id: chatId,
      ai_response: mensaje,
      has_action: false
    }
  }];
}
```

---

## 🔗 CONEXIONES FINALES

### Flujo principal:
```
Telegram Trigger → Switch1
  ├─ texto → Set Texto → AI Agent
  ├─ audio → GetFileInfo → Download File → Transcribir → Set Audio → AI Agent
  └─ foto → Get Photo Info → Download Photo → Procesar Imagen → Extraer Respuesta → Telegram Response

AI Agent → Extraer Comando → ¿Tiene acción? → Switch por Acción
  ├─ guardar → Guardar en Sheets (actual) → Telegram Response
  ├─ modificar → Buscar Lista → Procesar Modificación → Actualizar Sheets → Telegram Response
  ├─ borrar → Buscar Lista → Eliminar de Sheets → Telegram Response
  └─ leer → Obtener Listas → Formatear Respuesta → Telegram Response
```

---

## 🎯 PROMPT ACTUALIZADO DEL AI

Agrega estas acciones al prompt del AI Agent:

```
MODIFICAR LISTA (AGREGAR):
Usuario: "Agrégale 'Sapiens' a mi lista de libros"
```json
{"action":"modificar_lista","data":{"tipo":"libros","operacion":"agregar","item":"Sapiens"}}
```

MODIFICAR LISTA (ELIMINAR):
Usuario: "Elimina 'Pan' de mi lista de supermercado"
```json
{"action":"modificar_lista","data":{"tipo":"supermercado","operacion":"eliminar","item":"Pan"}}
```

BORRAR LISTA:
Usuario: "Borra la lista de compras"
```json
{"action":"borrar_lista","data":{"tipo":"compras"}}
```

LEER UNA LISTA:
Usuario: "¿Qué tengo en mi lista de supermercado?"
```json
{"action":"leer_listas","data":{"tipo":"supermercado"}}
```

LEER TODAS LAS LISTAS:
Usuario: "¿Qué listas tengo?"
```json
{"action":"leer_listas","data":{"tipo":"todas"}}
```
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### OCR/Visión:
- [ ] Agregar opción "foto" en Switch1
- [ ] Crear nodo "Get Photo Info"
- [ ] Crear nodo "Download Photo"
- [ ] Crear nodo "Procesar Imagen con GPT-4"
- [ ] Crear nodo "Extraer Respuesta Imagen"
- [ ] Conectar flujo de fotos
- [ ] Probar con imagen de prueba

### Modificar Listas:
- [ ] Crear nodo "Switch por Acción"
- [ ] Crear nodo "Buscar Lista Existente"
- [ ] Crear nodo "Procesar Modificación"
- [ ] Crear nodo "Actualizar en Sheets"
- [ ] Crear nodo "Eliminar Lista de Sheets"
- [ ] Crear nodo "Obtener Listas"
- [ ] Crear nodo "Formatear Respuesta Listas"
- [ ] Conectar todos los flujos
- [ ] Actualizar prompt del AI
- [ ] Probar: agregar item
- [ ] Probar: eliminar item
- [ ] Probar: borrar lista
- [ ] Probar: leer lista
- [ ] Probar: leer todas las listas

---

## 📊 RESULTADO FINAL

Con estas implementaciones alcanzarás:
- **13/14 casos de uso de Memorae.ai = 93% de cobertura** 🎉
- Solo faltarán recordatorios programados (Fase 2)

---

## 🆘 NOTAS IMPORTANTES

1. **API Key de OpenAI**: Asegúrate de tener créditos, GPT-4o es más caro que gpt-4o-mini
2. **Row ID vs Row Number**: Dependiendo de tu versión de n8n, puede ser uno u otro
3. **Testing**: Prueba cada funcionalidad por separado antes de integrar todo

