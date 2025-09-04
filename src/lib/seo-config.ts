// Configuración SEO para Mente Autónoma - Agencia de IA en Antofagasta

export const seoConfig = {
  // Palabras clave principales
  primaryKeywords: [
    "desarrollo web Antofagasta",
    "creación páginas web Antofagasta", 
    "diseño web Antofagasta",
    "agencia digital Antofagasta"
  ],

  // Palabras clave secundarias
  secondaryKeywords: [
    "desarrollo web profesional Antofagasta",
    "creación sitios web empresas Antofagasta",
    "diseño páginas web modernas Antofagasta",
    "agencia desarrollo web Antofagasta",
    "servicios desarrollo web Antofagasta",
    "desarrollo web WordPress Antofagasta",
    "creación landing pages Antofagasta"
  ],

  // Palabras clave de IA (diferenciador)
  aiKeywords: [
    "desarrollo web con IA Antofagasta",
    "agencia IA Antofagasta", 
    "soluciones digitales IA Antofagasta",
    "desarrollo web inteligente Antofagasta",
    "automatización web Antofagasta"
  ],

  // Palabras clave de cola larga
  longTailKeywords: [
    "mejor agencia desarrollo web Antofagasta",
    "desarrollo web empresas pequeñas Antofagasta",
    "creación páginas web profesionales Antofagasta",
    "diseño web responsive Antofagasta",
    "desarrollo web ecommerce Antofagasta",
    "agencia digital marketing Antofagasta",
    "desarrollo web con WordPress Antofagasta",
    "creación sitios web modernos Antofagasta"
  ],

  // Competidores locales identificados
  competitors: [
    "agencia digital Antofagasta",
    "desarrollo web Antofagasta",
    "diseño web Antofagasta", 
    "creación páginas web Antofagasta",
    "marketing digital Antofagasta"
  ],

  // Metadatos por página
  pages: {
    home: {
      title: "Mente Autónoma - Desarrollo Web Profesional en Antofagasta | Agencia de IA",
      description: "Agencia líder en desarrollo web y soluciones digitales con IA en Antofagasta. Creamos páginas web profesionales, sitios WordPress y aplicaciones modernas. ¡Hosting gratuito por 1 año!",
      keywords: "desarrollo web Antofagasta, creación páginas web Antofagasta, diseño web Antofagasta, agencia digital Antofagasta, agencia IA Antofagasta"
    },
    services: {
      title: "Desarrollo Web Profesional en Antofagasta | Mente Autónoma - Agencia de IA",
      description: "Agencia líder en desarrollo web en Antofagasta. Creamos páginas web profesionales, sitios WordPress y aplicaciones modernas con IA. ¡Hosting gratuito por 1 año!",
      keywords: "desarrollo web Antofagasta, creación páginas web Antofagasta, diseño web Antofagasta, WordPress Antofagasta, desarrollo web profesional Antofagasta"
    },
    contact: {
      title: "Contacto - Desarrollo Web en Antofagasta | Mente Autónoma",
      description: "Contacta con la mejor agencia de desarrollo web en Antofagasta. Consulta gratuita para tu proyecto web profesional con IA.",
      keywords: "contacto desarrollo web Antofagasta, consulta desarrollo web Antofagasta, cotización páginas web Antofagasta"
    }
  },

  // Estructura de URLs SEO-friendly
  urls: {
    home: "/",
    services: "/servicios-desarrollo-web",
    contact: "/contacto",
    about: "/nosotros",
    portfolio: "/portafolio",
    blog: "/noticias"
  },

  // Schema markup para SEO local
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mente Autónoma",
    "description": "Agencia de desarrollo web y soluciones digitales con IA en Antofagasta",
    "url": "https://menteautonoma.com",
    "telephone": "+56-9-XXXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Antofagasta",
      "addressLocality": "Antofagasta",
      "addressRegion": "Antofagasta",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.6509",
      "longitude": "-70.3975"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-23.6509",
        "longitude": "-70.3975"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web WordPress",
            "description": "Desarrollo de sitios web profesionales con WordPress"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Desarrollo Web Moderno",
            "description": "Desarrollo de aplicaciones web con tecnologías modernas"
          }
        }
      ]
    }
  }
};

// Función para generar metadatos dinámicos
export function generateMetadata(page: keyof typeof seoConfig.pages) {
  return seoConfig.pages[page];
}

// Función para obtener palabras clave por categoría
export function getKeywordsByCategory(category: 'primary' | 'secondary' | 'ai' | 'longTail') {
  switch(category) {
    case 'primary':
      return seoConfig.primaryKeywords;
    case 'secondary':
      return seoConfig.secondaryKeywords;
    case 'ai':
      return seoConfig.aiKeywords;
    case 'longTail':
      return seoConfig.longTailKeywords;
    default:
      return seoConfig.primaryKeywords;
  }
}
