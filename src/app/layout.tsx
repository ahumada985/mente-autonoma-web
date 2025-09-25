import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "Mente Autónoma | Agencia IA y Desarrollo Web #1 Antofagasta Chile 2025",
  description: "🥇 Agencia líder desarrollo web, chatbots IA, automatización y marketing digital Antofagasta. ✅ Páginas web profesionales ✅ Hosting gratuito 1 año ✅ SEO avanzado ✅ Soporte 24/7. ¡Impulsa tu empresa minera/PyME con IA!",
  keywords: [
    // Palabras clave primarias - Alta competencia
    "desarrollo web Antofagasta",
    "agencia digital Antofagasta",
    "diseño web Antofagasta",
    "marketing digital Antofagasta",
    "SEO Antofagasta",

    // IA y automatización - Nicho especializado
    "chatbots IA Antofagasta",
    "inteligencia artificial Antofagasta",
    "automatización procesos Antofagasta",
    "agencia IA Chile",
    "soluciones IA empresas",

    // Long tail - Baja competencia
    "desarrollo web empresas mineras Antofagasta",
    "chatbot inteligente PyME Antofagasta",
    "automatización WhatsApp Business Antofagasta",
    "páginas web responsive Antofagasta",
    "agencia WordPress Antofagasta",

    // Geolocalización ampliada
    "desarrollo web norte Chile",
    "agencia digital Calama",
    "marketing digital región Antofagasta",
    "soluciones digitales minería Chile"
  ].join(", "),
  authors: [{ name: "Mente Autónoma", url: "https://menteautonoma.com" }],
  creator: "Mente Autónoma - Agencia Digital Antofagasta",
  publisher: "Mente Autónoma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://menteautonoma.com",
    languages: {
      'es-CL': 'https://menteautonoma.com',
      'es': 'https://menteautonoma.com/es'
    }
  },
  openGraph: {
    title: "🥇 Mente Autónoma | Agencia IA y Desarrollo Web #1 Antofagasta 2025",
    description: "Agencia líder en desarrollo web, chatbots IA, automatización y marketing digital en Antofagasta. Especialistas en soluciones digitales para empresas mineras y PyMEs. ¡Hosting gratuito por 1 año!",
    url: "https://menteautonoma.com",
    siteName: "Mente Autónoma",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://menteautonoma.com/og-image-2025.jpg",
        width: 1200,
        height: 630,
        alt: "Mente Autónoma - Agencia IA y Desarrollo Web Antofagasta"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "🥇 Mente Autónoma | Agencia IA #1 Antofagasta Chile",
    description: "Desarrollo web profesional, chatbots IA y automatización para empresas en Antofagasta. Hosting gratuito 1 año. ¡Impulsa tu negocio con IA!",
    images: ["https://menteautonoma.com/og-image-2025.jpg"],
    site: "@MenteAutonoma",
    creator: "@MenteAutonoma"
  },
  verification: {
    google: "6uAJ_W7unsMzxNPycHloURZdExPCiz1-J9wf7OkjbvQ",
    yandex: "verification_code_here",
    yahoo: "verification_code_here"
  },
  category: "Desarrollo Web y Tecnología",
  classification: "Agencia Digital",
  other: {
    "geo.region": "CL-AN",
    "geo.placename": "Antofagasta",
    "geo.position": "-23.6509;-70.3975",
    "ICBM": "-23.6509, -70.3975"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload recursos críticos para Core Web Vitals */}
        <link rel="preload" href="/logo_final.png" as="image" type="image/png" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS prefetching para recursos externos */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Favicon optimizado */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Schema Markup JSON-LD para SEO Local */}
        <Script id="schema-organization" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mente Autónoma",
              "alternateName": "Mente Autonoma",
              "url": "https://menteautonoma.com",
              "logo": "https://menteautonoma.com/logo_final.png",
              "image": "https://menteautonoma.com/og-image-2025.jpg",
              "description": "Agencia líder en desarrollo web, chatbots IA, automatización y marketing digital en Antofagasta, Chile.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Antofagasta",
                "addressLocality": "Antofagasta",
                "addressRegion": "Región de Antofagasta",
                "addressCountry": "CL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.6509,
                "longitude": -70.3975
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Antofagasta"
                },
                {
                  "@type": "City",
                  "name": "Calama"
                },
                {
                  "@type": "State",
                  "name": "Región de Antofagasta"
                }
              ],
              "serviceType": [
                "Desarrollo Web",
                "Diseño Web",
                "Marketing Digital",
                "SEO",
                "Chatbots IA",
                "Automatización de Procesos",
                "Inteligencia Artificial"
              ],
              "founder": {
                "@type": "Person",
                "name": "Mente Autónoma Team"
              },
              "foundingDate": "2024",
              "telephone": "+56-9-XXXX-XXXX",
              "email": "contacto@menteautonoma.com",
              "sameAs": [
                "https://www.facebook.com/menteautonoma",
                "https://www.instagram.com/menteautonoma",
                "https://www.linkedin.com/company/menteautonoma",
                "https://twitter.com/menteautonoma"
              ]
            }
          `}
        </Script>

        <Script id="schema-local-business" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://menteautonoma.com/#business",
              "name": "Mente Autónoma",
              "image": "https://menteautonoma.com/logo_final.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Antofagasta",
                "addressRegion": "Región de Antofagasta",
                "addressCountry": "Chile"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.6509,
                "longitude": -70.3975
              },
              "url": "https://menteautonoma.com",
              "telephone": "+56-9-XXXX-XXXX",
              "email": "contacto@menteautonoma.com",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "currenciesAccepted": "CLP, USD",
              "paymentAccepted": "Transferencia Bancaria, WebPay, PayPal"
            }
          `}
        </Script>

        <Script id="schema-service" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Desarrollo Web y Soluciones IA Antofagasta",
              "description": "Servicios profesionales de desarrollo web, chatbots IA, automatización y marketing digital para empresas en Antofagasta y el norte de Chile.",
              "provider": {
                "@type": "Organization",
                "name": "Mente Autónoma"
              },
              "areaServed": {
                "@type": "City",
                "name": "Antofagasta"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Digitales",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Desarrollo Web Profesional",
                      "description": "Páginas web responsive con hosting gratuito por 1 año"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Chatbots con Inteligencia Artificial",
                      "description": "Chatbots inteligentes para WhatsApp Business y sitios web"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Automatización de Procesos",
                      "description": "Automatización inteligente para empresas mineras y PyMEs"
                    }
                  }
                ]
              }
            }
          `}
        </Script>

        {/* Google tag (gtag.js) - Optimizado para rendimiento */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M0L8D041W7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M0L8D041W7', {
              page_title: 'Mente Autónoma - Agencia IA Antofagasta',
              custom_map: {'dimension1': 'Antofagasta'}
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
