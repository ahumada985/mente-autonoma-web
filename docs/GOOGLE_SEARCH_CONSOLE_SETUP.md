# Configuración de Google Search Console - Guía Paso a Paso

## 🚨 Problema Actual
Tienes **dos métodos de verificación** activos y Google está confundido:
1. ✅ Meta tag HTML (en layout.tsx) - **FUNCIONANDO**
2. ❌ Archivo TXT (googleverification.txt) - **CAUSANDO CONFLICTO**

## 🔧 Solución Paso a Paso

### Paso 1: Limpiar Verificaciones Existentes
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Selecciona tu propiedad
3. Ve a **Configuración > Propiedad**
4. Haz clic en **"Eliminar propiedad"** para limpiar todo

### Paso 2: Agregar Nueva Propiedad
1. Haz clic en **"Agregar propiedad"**
2. Selecciona **"Prefijo de URL"**
3. Ingresa: `https://menteautonoma.com` (o tu dominio real)
4. Haz clic en **"Continuar"**

### Paso 3: Verificación con Meta Tag (RECOMENDADO)
1. Selecciona **"Etiqueta HTML"**
2. Copia el código que te da Google
3. Reemplaza el código en `src/app/layout.tsx`:

```typescript
verification: {
  google: "TU_NUEVO_CODIGO_AQUI",
},
```

### Paso 4: Verificación Alternativa con Archivo HTML
Si el meta tag no funciona, usa el archivo HTML:
1. Selecciona **"Archivo HTML"**
2. Descarga el archivo que te da Google
3. Súbelo a la carpeta `public/` de tu proyecto
4. Asegúrate de que sea accesible en: `https://tudominio.com/archivo.html`

### Paso 5: Verificar
1. Haz clic en **"Verificar"**
2. Si funciona, verás ✅ "Propiedad verificada"
3. Si no funciona, espera 24-48 horas y vuelve a intentar

## 🛠️ Archivos que Necesitas Modificar

### 1. Limpiar archivo de verificación TXT
```bash
# Eliminar este archivo para evitar conflictos
rm public/googleverification.txt
```

### 2. Actualizar layout.tsx
```typescript
// En src/app/layout.tsx, línea 29-31
verification: {
  google: "TU_NUEVO_CODIGO_DE_GOOGLE",
},
```

### 3. Verificar que el meta tag esté en el HTML
```html
<!-- Debe aparecer en el <head> de tu sitio -->
<meta name="google-site-verification" content="TU_CODIGO" />
```

## 🔍 Cómo Verificar que Funciona

### 1. Inspeccionar el HTML
1. Ve a tu sitio web
2. Haz clic derecho > **"Inspeccionar"**
3. Busca en el `<head>` el meta tag de verificación
4. Debe aparecer: `<meta name="google-site-verification" content="...">`

### 2. Verificar en Google Search Console
1. Ve a **"Cobertura"** en el menú lateral
2. Debe mostrar páginas indexadas
3. Ve a **"Rendimiento"** para ver búsquedas

### 3. Probar con Google
```bash
# Buscar tu sitio en Google
site:menteautonoma.com
```

## 📊 Qué Verás en Search Console

### Datos Disponibles (24-48 horas después de verificar):
- **Cobertura**: Páginas indexadas
- **Rendimiento**: Búsquedas, clics, impresiones
- **Mejoras**: Errores de SEO
- **Enlaces**: Backlinks a tu sitio

### Métricas Importantes:
- **Impresiones**: Cuántas veces aparece tu sitio
- **Clics**: Cuántas veces hacen clic
- **CTR**: Porcentaje de clics (objetivo: 3-5%)
- **Posición promedio**: Posición en resultados

## 🚀 Próximos Pasos Después de Verificar

### 1. Enviar Sitemap
1. Ve a **"Sitemaps"** en Search Console
2. Agrega: `https://tudominio.com/sitemap.xml`
3. Haz clic en **"Enviar"**

### 2. Configurar Google Analytics
1. Ve a **"Configuración"** en Search Console
2. Conecta con Google Analytics
3. Esto te dará datos más detallados

### 3. Monitorear Errores
1. Ve a **"Cobertura"** semanalmente
2. Revisa errores de indexación
3. Corrige problemas técnicos

## ❌ Errores Comunes y Soluciones

### Error: "No se puede verificar"
**Solución:**
- Espera 24-48 horas
- Verifica que el meta tag esté en el HTML
- Asegúrate de que el sitio esté online

### Error: "Propiedad ya existe"
**Solución:**
- Elimina la propiedad anterior
- Espera 24 horas
- Crea una nueva propiedad

### Error: "Meta tag no encontrado"
**Solución:**
- Verifica que esté en `layout.tsx`
- Asegúrate de que se esté renderizando
- Prueba con archivo HTML como alternativa

## 📞 Si Necesitas Ayuda

1. **Verifica el HTML**: Inspecciona tu sitio para ver el meta tag
2. **Espera tiempo**: Google puede tardar 24-48 horas
3. **Prueba alternativas**: Meta tag, archivo HTML, DNS
4. **Contacta soporte**: Si nada funciona, contacta Google

---

**Recuerda**: Una vez que Search Console esté funcionando, podrás ver exactamente cómo están funcionando tus palabras clave SEO y hacer ajustes basados en datos reales.
