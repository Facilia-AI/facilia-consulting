import type { Metadata } from "next";
import "./globals.css";

const url = "https://facilia.dev";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Facilia Dev — AI-native software studio, built in Latin America",
  description:
    "Facilia Dev designs, builds and ships production software for ConTech, PropTech and InsurTech. Senior Latin American engineers + agentic tools like Claude Code and Codex. Makers of facilia.app, clinck.io and shelv.io.",
  keywords: [
    "software development", "AI-native", "ConTech", "PropTech", "InsurTech",
    "Latin America", "Claude Code", "Next.js", "Supabase", "nearshore engineering",
  ],
  openGraph: {
    title: "Facilia Dev — AI-native software studio",
    description:
      "World-class software, engineered in Latam. Production apps for ConTech, PropTech and InsurTech, built AI-native with Claude Code and Codex.",
    url,
    siteName: "Facilia Dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facilia Dev — AI-native software studio",
    description: "World-class software, engineered in Latam.",
  },
};

const themeScript = `try{var t=localStorage.getItem('facilia-theme')||'dark';var d=document.documentElement;d.classList.toggle('dark',t!=='light');d.classList.toggle('light',t==='light');}catch(e){document.documentElement.classList.add('dark');}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
