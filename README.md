# 🚀 Mente Autónoma - Plataforma Web de IA

Una plataforma moderna y potente que te permite crear, innovar y transformar tus ideas en realidad con Inteligencia Artificial.

## ✨ Características Principales

- 🎯 **Diseño Moderno**: Interfaz elegante y profesional con Tailwind CSS
- 📱 **Responsive**: Optimizado para todos los dispositivos
- ⚡ **Performance**: Core Web Vitals optimizados
- ♿ **Accesible**: Cumple estándares WCAG 2.1
- 🔍 **SEO Optimizado**: Meta tags, Schema.org y Google Search Console
- 📊 **Analytics**: Google Analytics 4 integrado
- 🗄️ **Base de Datos**: Supabase para formularios y leads
- 📧 **Email**: Sistema de envío automático con PDF adjunto
- 🎭 **Animaciones**: Transiciones fluidas con Framer Motion
- 🧪 **Testing**: Suite completa de tests automatizados

## 🏗️ Arquitectura Técnica

### **Frontend**
- **Framework**: Next.js 15.4.6 (App Router)
- **Lenguaje**: TypeScript/JavaScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Componentes**: UI personalizados y reutilizables

### **Backend**
- **APIs**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Email**: Nodemailer con Gmail
- **Autenticación**: Row Level Security (RLS)

### **Deploy & Hosting**
- **Plataforma**: Vercel
- **Build**: Generación estática optimizada
- **CDN**: Distribución global automática
- **SSL**: HTTPS automático

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- Cuenta de Gmail (para emails)

### **1. Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd mente-autonoma-web
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar variables de entorno**
Crear archivo `.env.local` en la raíz:
```bash
# Gmail App Password
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima

# Cloudinary (opcional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

### **4. Ejecutar en desarrollo**
```bash
npm run dev
```

### **5. Build para producción**
```bash
npm run build
npm start
```

## 🧪 Testing

### **Suite Completa de Testing**
```bash
# Instalar dependencias de testing
npm install --save-dev puppeteer lighthouse chrome-launcher axe-core

# Ejecutar todos los tests
node scripts/run-all-tests.js

# Tests individuales
node scripts/test-usability.js      # Testing de usabilidad
node scripts/test-accessibility.js  # Testing de accesibilidad  
node scripts/test-performance.js    # Testing de performance
```

### **Tipos de Testing**
- **Usabilidad**: Diferentes dispositivos y navegadores
- **Accesibilidad**: Estándares WCAG 2.1 con axe-core
- **Performance**: Core Web Vitals con Lighthouse
- **Responsive**: Adaptación a diferentes pantallas

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas y rutas (App Router)
│   ├── api/               # API Routes
│   ├── contacto/          # Página de contacto
│   ├── noticias/          # Sistema de noticias
│   ├── servicios-desarrollo-web/ # Página de servicios
│   ├── privacidad/        # Páginas legales
│   ├── terminos/
│   ├── cookies/
│   └── layout.tsx         # Layout principal
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes de UI base
│   ├── Header.jsx         # Header dinámico
│   ├── Footer.jsx         # Footer
│   ├── ContactModal.jsx   # Modal de contacto
│   ├── DemoModal.jsx      # Modal de simulaciones
│   └── SEO.jsx            # Componente SEO
├── lib/                    # Utilidades y configuraciones
│   ├── supabase.js        # Cliente de Supabase
│   ├── antiSpam.js        # Protección anti-spam
│   └── utils.ts           # Utilidades generales
└── globals.css             # Estilos globales

scripts/                    # Scripts de testing
├── test-usability.js       # Testing de usabilidad
├── test-accessibility.js   # Testing de accesibilidad
├── test-performance.js     # Testing de performance
└── run-all-tests.js        # Script principal

public/                     # Archivos estáticos
├── PDF/                    # PDFs para descarga
├── logos/                  # Logos del sitio
└── images/                 # Imágenes generales
```

## 🔧 Configuración de Servicios

### **Supabase**
1. Crear proyecto en [supabase.com](https://supabase.com)
2. Configurar tabla `contacts` con RLS
3. Obtener URL y clave anónima
4. Agregar a variables de entorno

### **Gmail App Password**
1. Activar verificación en 2 pasos
2. Generar contraseña de aplicación
3. Usar en `EMAIL_PASS`

### **Google Analytics**
1. Crear propiedad en [analytics.google.com](https://analytics.google.com)
2. Obtener ID de medición (G-XXXXXXXXXX)
3. Agregar a `NEXT_PUBLIC_GA_ID`

### **Google Search Console**
1. Verificar propiedad con etiqueta HTML meta
2. La etiqueta ya está implementada en `layout.tsx`
3. Esperar verificación automática

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Variables de Entorno en Vercel**
Agregar todas las variables de `.env.local` en el dashboard de Vercel.

## 📊 Monitoreo y Analytics

### **Google Analytics 4**
- Tracking automático de páginas
- Eventos personalizados implementados
- Core Web Vitals monitoreados

### **Performance Monitoring**
- Core Web Vitals en tiempo real
- Métricas de rendimiento
- Alertas automáticas

### **Uptime Monitoring**
- Verificación de disponibilidad
- Alertas de caída
- Reportes de performance

## 🔒 Seguridad

### **Protecciones Implementadas**
- **Anti-spam**: Validación de formularios
- **Rate Limiting**: Protección contra ataques
- **Row Level Security**: Seguridad a nivel de base de datos
- **HTTPS**: SSL automático en Vercel

### **Buenas Prácticas**
- Variables de entorno seguras
- Validación de entrada
- Sanitización de datos
- Headers de seguridad

## ♿ Accesibilidad

### **Características Implementadas**
- **ARIA Labels**: Etiquetas semánticas
- **Skip Links**: Navegación por teclado
- **Contraste**: Colores accesibles
- **Semántica**: HTML semántico correcto
- **Navegación**: Compatible con lectores de pantalla

### **Estándares Cumplidos**
- WCAG 2.1 AA
- Section 508
- EN 301 549

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Características**
- Imágenes adaptativas
- Navegación móvil optimizada
- Touch-friendly interfaces
- Performance optimizado para móviles

## 🔍 SEO

### **Meta Tags**
- Títulos únicos por página
- Descripciones optimizadas
- Open Graph tags
- Twitter Cards

### **Schema.org**
- Structured data implementado
- Información de organización
- Breadcrumbs
- Artículos de noticias

### **Performance**
- Core Web Vitals optimizados
- Lazy loading de imágenes
- Bundle splitting
- Minificación automática

## 🧪 Testing y Calidad

### **Automatización**
- Tests de usabilidad automatizados
- Tests de accesibilidad con axe-core
- Tests de performance con Lighthouse
- Reportes detallados

### **Cobertura**
- Todas las páginas principales
- Diferentes dispositivos
- Navegadores modernos
- Casos de uso críticos

## 📈 Mantenimiento

### **Tareas Regulares**
- Revisar métricas de performance
- Actualizar dependencias
- Monitorear errores
- Verificar accesibilidad

### **Herramientas Recomendadas**
- **Performance**: Lighthouse, WebPageTest
- **Accesibilidad**: axe DevTools, WAVE
- **SEO**: Google Search Console, PageSpeed Insights
- **Monitoreo**: Vercel Analytics, Sentry

## 🤝 Contribución

### **Guidelines**
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

### **Estándares de Código**
- ESLint configurado
- Prettier para formato
- TypeScript para type safety
- Componentes reutilizables

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

### **Contacto**
- **Email**: [tu-email@dominio.com]
- **Issues**: [GitHub Issues]
- **Documentación**: [Wiki del proyecto]

### **Recursos Útiles**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🎯 Roadmap

### **Fase 1 (Completada) ✅**
- [x] Sitio web base
- [x] Sistema de noticias
- [x] Formularios de contacto
- [x] SEO básico
- [x] Deploy en Vercel

### **Fase 2 (En Progreso) 🔄**
- [x] Google Analytics
- [x] Google Search Console
- [x] Testing automatizado
- [x] Accesibilidad
- [ ] Cloudinary integration

### **Fase 3 (Futuro) 🚀**
- [ ] Blog con CMS
- [ ] Sistema de usuarios
- [ ] Dashboard administrativo
- [ ] API pública
- [ ] PWA capabilities

---

**Desarrollado con ❤️ usando tecnologías modernas y mejores prácticas de la industria.**
