import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Super Humano Digital | Asistente Personal Inteligente',
  description:
    'Tu asistente personal con memoria a largo plazo, listas inteligentes y procesamiento multimodal.',
  keywords: ['asistente', 'IA', 'RAG', 'telegram bot', 'lista de tareas'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
