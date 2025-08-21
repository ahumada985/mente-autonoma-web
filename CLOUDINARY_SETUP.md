# 🚀 Configuración de Cloudinary para AIStudio

## 📋 Pasos para Configurar Cloudinary

### 1. Crear Cuenta en Cloudinary
- Ve a [cloudinary.com](https://cloudinary.com)
- Regístrate para una cuenta gratuita
- Obtén tus credenciales del Dashboard

### 2. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurar Upload Preset
En tu dashboard de Cloudinary:
- Ve a Settings > Upload
- Crea un nuevo upload preset
- Configúralo como "unsigned" para uso del frontend

### 4. Uso en el Proyecto
```typescript
import { uploadImage, getOptimizedImageUrl } from '@/lib/cloudinary';

// Subir imagen
const imageUrl = await uploadImage(file);

// Obtener imagen optimizada
const optimizedUrl = getOptimizedImageUrl('public_id', {
  width: 800,
  quality: 80,
  format: 'webp'
});
```

## 🔧 Características Implementadas

- ✅ Subida de imágenes automática
- ✅ Optimización automática de formatos
- ✅ Redimensionamiento inteligente
- ✅ Compresión de calidad
- ✅ Soporte para WebP automático
- ✅ URLs seguras (HTTPS)

## 📱 Responsive Images
El sistema automáticamente genera diferentes tamaños para dispositivos móviles y desktop.

