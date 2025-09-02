import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiApp - Construye algo increíble",
  description: "Una plataforma moderna y potente que te permite crear, innovar y transformar tus ideas en realidad.",
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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
