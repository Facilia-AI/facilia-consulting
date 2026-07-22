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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
