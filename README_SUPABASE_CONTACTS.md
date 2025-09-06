# Configuración de la Tabla de Contactos en Supabase

## Descripción
Esta tabla almacena los mensajes enviados a través del formulario de contacto del sitio web.

## Pasos para Configurar

### 1. Acceder a Supabase
- Ve a tu proyecto en [Supabase](https://supabase.com)
- Navega a la sección "SQL Editor"

### 2. Ejecutar el Script SQL
- Copia el contenido del archivo `supabase_contacts_table.sql`
- Pégalo en el editor SQL de Supabase
- Ejecuta el script

### 3. Verificar la Creación
- Ve a la sección "Table Editor"
- Deberías ver la nueva tabla `contacts`

## Estructura de la Tabla

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | Identificador único (se genera automáticamente) |
| `name` | VARCHAR(255) | Nombre completo de la persona |
| `email` | VARCHAR(255) | Email de contacto |
| `company` | VARCHAR(255) | Empresa u organización (opcional) |
| `message` | TEXT | Mensaje del contacto |
| `contact_type` | VARCHAR(100) | Tipo de contacto (soporte, legal, privacidad, general) |
| `created_at` | TIMESTAMP | Fecha y hora de creación |
| `status` | VARCHAR(50) | Estado del contacto (new, read, replied, closed) |
| `source` | VARCHAR(100) | Origen del contacto |

## Políticas de Seguridad
- **RLS habilitado**: Solo se pueden insertar registros desde la aplicación
- **Inserción permitida**: Cualquier usuario puede insertar contactos
- **Lectura restringida**: Solo usuarios autenticados pueden leer (opcional)

## Uso en la Aplicación
La función `saveContact` en `src/lib/supabase.js` ya está configurada para usar esta tabla.

## Notas Importantes
- La tabla se crea automáticamente si no existe
- Los índices mejoran el rendimiento de las consultas
- El campo `status` permite seguimiento del estado de los contactos
- El campo `source` permite identificar desde dónde vino el contacto





