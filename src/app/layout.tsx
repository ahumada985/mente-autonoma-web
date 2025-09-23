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
  title: "Mente Autónoma - Desarrollo Web Profesional en Antofagasta | Agencia de IA",
  description: "Agencia líder en desarrollo web y soluciones digitales con IA en Antofagasta. Creamos páginas web profesionales, sitios WordPress y aplicaciones modernas. ¡Hosting gratuito por 1 año!",
  keywords: "desarrollo web Antofagasta, creación páginas web Antofagasta, diseño web Antofagasta, agencia digital Antofagasta, desarrollo web profesional Antofagasta, WordPress Antofagasta, agencia IA Antofagasta, soluciones digitales Antofagasta",
  authors: [{ name: "Mente Autónoma" }],
  creator: "Mente Autónoma",
  publisher: "Mente Autónoma",
  robots: "index, follow",
  openGraph: {
    title: "Mente Autónoma - Desarrollo Web Profesional en Antofagasta",
    description: "Agencia líder en desarrollo web y soluciones digitales con IA en Antofagasta. Creamos páginas web profesionales, sitios WordPress y aplicaciones modernas.",
    url: "https://menteautonoma.com",
    siteName: "Mente Autónoma",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mente Autónoma - Desarrollo Web Profesional en Antofagasta",
    description: "Agencia líder en desarrollo web y soluciones digitales con IA en Antofagasta.",
  },
  verification: {
    google: "6uAJ_W7unsMzxNPycHloURZdExPCiz1-J9wf7OkjbvQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload recursos críticos */}
        <link rel="preload" href="/logo_final.png" as="image" type="image/png" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        
        {/* Google tag (gtag.js) - Cargado después de la interacción */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M0L8D041W7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M0L8D041W7');
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
