import type { Metadata } from "next";
import "./globals.css";

// Canonical marketing domain. In production we always resolve share URLs
// (og:url, og:image, canonical) to facilia.dev so link previews are stable
// regardless of the Vercel-assigned domain; preview deploys use their own URL.
const CANONICAL_URL = "https://facilia.dev";
const url =
  process.env.VERCEL_ENV === "production"
    ? CANONICAL_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : CANONICAL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Facilia — We build products. Some become companies.",
  description:
    "Facilia is a product company that builds its own ventures and partners with ambitious teams to turn ideas into products, businesses and technology that scales.",
  keywords: [
    "product studio", "venture builder", "product development", "software development partner",
    "fractional CTO", "AI-native product development", "startup product development", "venture building",
    "Facilia", "Latin America",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Facilia — We build products. Some become companies.",
    description:
      "A product company that builds its own ventures and partners with ambitious teams to turn ideas into products, businesses and technology that scales.",
    url,
    siteName: "Facilia",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facilia — We build products. Some become companies.",
    description: "A product company that builds its own ventures and partners with ambitious teams.",
  },
};

const themeScript = `try{var t=localStorage.getItem('facilia-theme')||'light';var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.classList.toggle('light',t!=='dark');}catch(e){document.documentElement.classList.add('light');}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
