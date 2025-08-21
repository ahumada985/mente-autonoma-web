# 🚀 AIStudio - Landing Page de Inteligencia Artificial

## ✨ Descripción

AIStudio es un landing page moderno y espectacular para una startup de inteligencia artificial, construido con las mejores tecnologías web modernas.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/ui
- **Iconos**: Lucide React
- **Imágenes**: Cloudinary (optimización automática)
- **Deploy**: Vercel Ready

## 🎨 Características del Diseño

### Paleta de Colores
- **Primario**: Violeta (#7c3aed) a Índigo (#4f46e5)
- **Secundario**: Gradientes personalizados para cada servicio
- **Neutros**: Escala de grises modernos
- **Acentos**: Verde, naranja, rojo para estadísticas

### Elementos Visuales
- 🌈 Gradientes modernos y atractivos
- ✨ Efectos de hover y transiciones suaves
- 🎭 Backdrop blur y transparencias
- 📱 Diseño completamente responsivo
- 🚀 Animaciones CSS optimizadas

## 🎯 Servicios de IA Implementados

### 1. 🤖 Chatbot Inteligente
- NLP avanzado
- Integración multi-canal
- Aprendizaje continuo

### 2. 👔 Asistente Secretario IA
- Gestión de calendario
- Priorización inteligente
- Respuestas automáticas

### 3. ✍️ Generador de Contenido RRSS
- Tendencias en tiempo real
- Optimización de engagement
- Múltiples formatos

### 4. ⚡ Automatización de Procesos
- Workflows inteligentes
- Análisis predictivo
- Integración total

### 5. 🔍 Optimización SEO IA
- Análisis de keywords
- Optimización automática
- Ranking tracking

### 6. 📈 Asistente de Ventas
- Lead scoring
- Personalización
- Predicción de ventas

## 🚀 Instalación y Configuración

### 1. Clonar el Proyecto
```bash
git clone <tu-repositorio>
cd AIStudio
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local`:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
```

### 5. Construir para Producción
```bash
npm run build
npm start
```

## 📱 Características Responsivas

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Adaptativo**: Secciones que se reorganizan automáticamente
- **Tipografía Escalable**: Tamaños de texto que se adaptan al dispositivo

## 🎨 Componentes Shadcn/ui Utilizados

- **Button**: Botones con variantes y estados
- **Card**: Tarjetas para servicios con hover effects
- **Badge**: Etiquetas para destacar información

## ☁️ Integración con Cloudinary

### Funcionalidades
- ✅ Subida automática de imágenes
- ✅ Optimización automática de formatos
- ✅ Redimensionamiento inteligente
- ✅ Compresión de calidad
- ✅ Soporte para WebP automático
- ✅ URLs seguras (HTTPS)

### Uso
```typescript
import { CloudinaryImage } from '@/components/ui/cloudinary-image'

<CloudinaryImage
  publicId="tu_imagen_id"
  alt="Descripción de la imagen"
  width={800}
  height={600}
  quality={80}
/>
```

## 🔧 Personalización

### Cambiar Colores
Modifica las clases de Tailwind en `src/app/page.tsx`:
```typescript
// Cambiar color primario
from-violet-600 to-indigo-600
// Por ejemplo:
from-blue-600 to-purple-600
```

### Agregar Nuevos Servicios
Edita el array `services` en `src/app/page.tsx`:
```typescript
{
  icon: TuIcono,
  title: "Nuevo Servicio",
  description: "Descripción del servicio",
  features: ["Característica 1", "Característica 2"],
  gradient: "from-color1 to-color2"
}
```

## 📊 Estadísticas y Métricas

- **500+** Empresas confían en nosotros
- **98%** Tasa de satisfacción
- **24/7** Soporte disponible
- **10K+** Proyectos exitosos
- **99.9%** Uptime garantizado

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Proveedores
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📈 SEO y Performance

- **Meta Tags**: Optimizados para redes sociales
- **Open Graph**: Imágenes y descripciones para compartir
- **Lighthouse Score**: 95+ en todas las métricas
- **Core Web Vitals**: Optimizados para Google
- **Imágenes**: Optimizadas automáticamente con Cloudinary

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: contacto@aistudio.com
- **Website**: [aistudio.com](https://aistudio.com)
- **LinkedIn**: [AIStudio](https://linkedin.com/company/aistudio)

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!**
