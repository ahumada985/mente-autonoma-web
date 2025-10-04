import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Desarrollo Web en Antofagasta | Mente Autónoma',
  description: 'Desarrollo web profesional en Antofagasta, Chile. Creamos sitios web, landing pages y e-commerce con WordPress y Next.js. Diseño responsive, SEO optimizado y soporte completo. Desde $100.000.',
  keywords: 'desarrollo web antofagasta, páginas web antofagasta, diseño web chile, wordpress antofagasta, nextjs antofagasta, landing page antofagasta, e-commerce chile, desarrollo web profesional, sitios web empresariales',
  authors: [{ name: 'Mente Autónoma' }],
  openGraph: {
    title: 'Desarrollo Web Profesional en Antofagasta | Mente Autónoma',
    description: 'Creamos sitios web modernos y optimizados para tu negocio. WordPress, Next.js, Landing Pages y E-commerce. Soporte completo en Antofagasta, Chile.',
    url: 'https://www.menteautonoma.cl/servicios-desarrollo-web',
    siteName: 'Mente Autónoma',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dysvptyfc/image/upload/v1756465870/logos/hp0ci35hkx5ld1azubdv.png',
        width: 1200,
        height: 630,
        alt: 'Mente Autónoma - Desarrollo Web en Antofagasta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollo Web Profesional en Antofagasta',
    description: 'Sitios web modernos y optimizados para tu negocio. WordPress, Next.js, Landing Pages y E-commerce.',
    images: ['https://res.cloudinary.com/dysvptyfc/image/upload/v1756465870/logos/hp0ci35hkx5ld1azubdv.png'],
  },
  alternates: {
    canonical: 'https://www.menteautonoma.cl/servicios-desarrollo-web',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ServiciosDesarrolloWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
