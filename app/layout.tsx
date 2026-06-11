import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facilia Consulting — Consultora AI-Native para la Construcción",
  description:
    "Método F.Á.C.I.L.: transformamos la operación, las finanzas, las compras, la contabilidad y los proyectos de contratistas y firmas de arquitectura con inteligencia artificial y facilia.app.",
  openGraph: {
    title: "Facilia Consulting — Método F.Á.C.I.L.",
    description: "La consultora AI-Native de la construcción. Diagnóstico con IA sobre tus datos reales en 3 semanas.",
    locale: "es_CO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
