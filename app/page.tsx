"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DottedSurface } from "@/components/ui/dotted-surface";

/* ========================================================================
   Facilia Dev — AI-native software studio, built in Latin America
   Minimalist theme (21st.dev-inspired) · General Sans · light/dark
   ===================================================================== */

const CAL = "https://cal.com/javier-cristancho-oa5zrb";
const MAIL = "contacto@facilia.app";

type Lang = "en" | "es";

/* ================= i18n ================= */

const T = {
  en: {
    nav: { work: "Work", expertise: "What we build", stack: "How we build", why: "Why Latam", cta: "Book a call" },
    hero: {
      eyebrow: "AI-native software studio · Built in Latin America",
      h1a: "World-class software,",
      h1b: "engineered in Latam.",
      sub: "Facilia.dev helps ambitious teams ship AI-native products in weeks, not months. By combining senior Latin American engineers with agentic development, we turn ideas into production-ready software with remarkable speed and quality.",
      cta1: "Book a call",
      cta2: "See our work",
      trust: "In production today",
      stats: [
        ["3", "products live in production"],
        ["100%", "senior Latam engineering team"],
        ["0→1", "from idea to shipped, AI-native"],
      ],
      termTitle: "facilia-dev — zsh",
    },
    marquee: "The modern stack we build on",
    expertise: {
      eyebrow: "What we build",
      title: "We go deep where the real economy meets software",
      sub: "Not generalists-for-hire. We build for the industries that run on physical operations — and we build AI-native from day one.",
      items: [
        { tag: "ConTech", name: "Construction & field ops", desc: "Budgets, procurement, progress and cash in one source of truth. AI that reads invoices and statements to protect margin.", ref: "facilia.app" },
        { tag: "PropTech", name: "Real estate & the built world", desc: "Operations, maintenance and asset intelligence for buildings, portfolios and the teams that keep them running.", ref: "" },
        { tag: "InsurTech", name: "Risk, claims & compliance", desc: "Turning inspections, audits and field records into underwriting-grade, structured, decision-ready data.", ref: "clinck.io" },
        { tag: "AI-Native", name: "Greenfield products", desc: "Copilots, document intelligence, RAG and automation with agents in the core — products designed around AI, not bolted onto it.", ref: "" },
      ],
    },
    work: {
      eyebrow: "Selected work",
      title: "Products, live in production",
      sub: "Real software our clients and thousands of users depend on every day — designed, built and operated by Facilia Dev.",
      cta: "Visit",
      soon: "Live soon",
      items: [
        {
          key: "facilia", url: "https://facilia.app", host: "facilia.app", sector: "ConTech",
          name: "Facilia", tagline: "The AI operating system for contractors",
          desc: "AI agents that quote any job in minutes on APU 2026 prices, a Gantt that regenerates from the quote, and finance dashboards with cash flow and EBITDA per project — one source of truth for construction SMBs.",
          role: "Product · Engineering · Applied AI",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Claude"],
          screens: [
            { src: "facilia-cotizador.png", label: "AI Quoting", path: "facilia.app/cotizador" },
            { src: "facilia-gantt.png", label: "Gantt", path: "facilia.app/avance" },
            { src: "facilia-finanzas.png", label: "Finance", path: "facilia.app/finanzas" },
          ],
        },
        {
          key: "clinck", url: "https://clinck.io", host: "clinck.io", sector: "InsurTech · Ops",
          name: "Clinck", tagline: "Turn records into operational decisions",
          desc: "An AI-native platform that turns inspections, checklists and audits into live dashboards, KPIs and smart alerts for facilities, maintenance and EHS teams. Describe the form — AI builds it.",
          role: "Product · Engineering · Applied AI",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Claude"],
          screens: [{ src: "clinck.png", label: "", path: "clinck.io" }],
        },
        {
          key: "shelv", url: "https://shelv.io", host: "shelv.io", sector: "Community · Platform",
          name: "Shelv", tagline: "Where creators launch the future of LATAM",
          desc: "A launchpad and community for Latin American builders — product discovery, builder profiles, an ecosystem map and beta opportunities that connect the region's founders.",
          role: "Product · Engineering",
          stack: ["Next.js", "Supabase", "PostgreSQL"],
          screens: [{ src: "shelv.png", label: "", path: "shelv.io" }],
        },
        {
          key: "goquipo", url: "", host: "goquipo.co", sector: "Marketplace · Rentals",
          name: "GoQuipo", tagline: "Buy, sell & rent professional equipment",
          desc: "A national marketplace for professional equipment and machinery — verified sellers, escrow payments and nationwide coverage across construction, events, industrial, logistics and more.",
          role: "Product · Engineering",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Stripe"],
          screens: [{ src: "goquipo.png", label: "", path: "goquipo.co" }],
        },
      ],
    },
    mobile: {
      eyebrow: "Mobile",
      title: "We ship mobile, too",
      sub: "Native-feeling apps and mobile web — from consumer storefronts to field tools your team uses on site. The same AI-native engineering, in your users' pocket.",
      caption: "Mobile commerce · built by Facilia Dev",
      stack: ["React Native", "Expo", "iOS · Swift", "Android · Kotlin", "PWA"],
    },
    designwork: {
      eyebrow: "Product & design",
      title: "Design-led products, end to end",
      sub: "Beyond internal tools, we create and design consumer-facing products — brand, UX and engineering together. A few we've shipped:",
      items: [
        { key: "clinck-gastro", name: "Clinck", host: "clinck · gastro", sector: "Hospitality · Network", tagline: "The professional network of the gastronomic sector", desc: "Connect talent, restaurants and brands in one place — profiles, jobs, menus and reviews to hire, get hired and grow.", src: "clinck-gastro.png" },
        { key: "sentimetrik", name: "Sentimetrik", host: "sentimetrik", sector: "CX · Sentiment AI", tagline: "Feedback that turns into decisions", desc: "End-to-end feedback capture and sentiment analysis — from surveys to clear, actionable, data-driven decisions.", src: "sentimetrik.png" },
      ],
    },
    stack: {
      eyebrow: "How we build",
      title: "An AI-native engineering stack",
      sub: "We put frontier models in the loop of everyday engineering — planning, generating, reviewing and shipping with agents. Modern, secure and scalable, with last-generation tooling across the whole stack.",
      loop: ["Plan", "Generate", "Review", "Ship"],
      loopNote: "The agent loop we run on every feature.",
      layers: ["AI & Intelligent Systems", "Frontend", "Backend & Data", "Infrastructure & DevOps", "Quality Engineering", "Integrations", "Security", "Performance"],
      foot: "A modern, secure and scalable stack — AI-native by default, not a traditional software factory.",
    },
    why: {
      eyebrow: "Why Latam",
      title: "Quality software, built in Latin America",
      sub: "The talent is here. We pair senior engineers who care about craft with real AI leverage — in your timezone, without the coordination tax of far-shore.",
      points: [
        ["Real timezone overlap", "We work the same hours as US teams — sync when it matters, not on a 12-hour delay."],
        ["Senior & product-minded", "Engineers who own outcomes and push back on bad specs — not ticket-takers."],
        ["AI-native by default", "More shipped per engineer, with agents doing the toil and humans owning the judgment."],
        ["Skin in the game", "We build and run our own products. We'll build yours like owners, because that's how we build ours."],
      ],
    },
    models: {
      eyebrow: "How we work together",
      title: "Three ways to build with us",
      sub: "Pick the shape that fits your stage. All of them ship real software, fast.",
      items: [
        { tag: "01 · Product Studio", name: "Zero to one", desc: "You have an idea or an early product. We take it to a live, revenue-ready build — discovery, design, engineering and launch, end to end.", featured: false },
        { tag: "02 · Embedded Squad", name: "Staff augmentation, done right", desc: "Senior engineers embedded in your team, AI-native and shipping from week one. You keep the roadmap; we add velocity and craft.", featured: true },
        { tag: "03 · AI Retrofit", name: "Add AI to what you have", desc: "Copilots, document intelligence, automation and data pipelines layered onto your existing product — without a rewrite.", featured: false },
      ],
      cta: "Book a call",
    },
    final: {
      title: "Let's build something worth shipping.",
      sub: "Tell us what you're building. We'll show you how fast quality can move.",
      btn: "Book a call",
      alt: "or email us",
    },
    footer: {
      line: "© 2026 Facilia Dev · Built in Latin America",
      tagline: "AI-native software studio. We design, build and ship production software from Latin America.",
      explore: "Explore",
      product: "Product",
      contact: "Contact",
    },
    theme: { light: "Light", dark: "Dark" },
  },

  es: {
    nav: { work: "Proyectos", expertise: "Qué hacemos", stack: "Cómo construimos", why: "Por qué Latam", cta: "Agendar llamada" },
    hero: {
      eyebrow: "Estudio de software AI-native · Hecho en Latinoamérica",
      h1a: "Software de clase mundial,",
      h1b: "hecho en Latam.",
      sub: "Facilia.dev ayuda a equipos ambiciosos a lanzar productos AI-native en semanas, no meses. Combinando ingenieros senior latinoamericanos con desarrollo agéntico, convertimos ideas en software listo para producción con velocidad y calidad excepcionales.",
      cta1: "Agendar llamada",
      cta2: "Ver proyectos",
      trust: "Hoy en producción",
      stats: [
        ["3", "productos en producción"],
        ["100%", "equipo de ingeniería senior en Latam"],
        ["0→1", "de la idea al deploy, AI-native"],
      ],
      termTitle: "facilia-dev — zsh",
    },
    marquee: "El stack moderno con el que construimos",
    expertise: {
      eyebrow: "Qué hacemos",
      title: "Vamos a fondo donde la economía real se encuentra con el software",
      sub: "No somos generalistas de alquiler. Construimos para las industrias que corren sobre operaciones físicas — y lo hacemos AI-native desde el día uno.",
      items: [
        { tag: "ConTech", name: "Construcción y obra", desc: "Presupuesto, compras, avance y caja en una sola fuente de verdad. IA que lee facturas y extractos para proteger el margen.", ref: "facilia.app" },
        { tag: "PropTech", name: "Inmobiliario y entorno construido", desc: "Operación, mantenimiento e inteligencia de activos para edificios, portafolios y los equipos que los operan.", ref: "" },
        { tag: "InsurTech", name: "Riesgo, siniestros y cumplimiento", desc: "Convertimos inspecciones, auditorías y registros de campo en datos estructurados, listos para decidir y suscribir.", ref: "clinck.io" },
        { tag: "AI-Native", name: "Productos desde cero", desc: "Copilotos, inteligencia documental, RAG y automatización con agentes en el núcleo — productos diseñados alrededor de la IA, no con la IA pegada encima.", ref: "" },
      ],
    },
    work: {
      eyebrow: "Proyectos seleccionados",
      title: "Productos, vivos en producción",
      sub: "Software real del que nuestros clientes y miles de usuarios dependen cada día — diseñado, construido y operado por Facilia Dev.",
      cta: "Visitar",
      soon: "Pronto en vivo",
      items: [
        {
          key: "facilia", url: "https://facilia.app", host: "facilia.app", sector: "ConTech",
          name: "Facilia", tagline: "El sistema operativo con IA para contratistas",
          desc: "Agentes de IA que cotizan cualquier obra en minutos con precios APU 2026, un Gantt que se regenera desde la cotización, y tableros de finanzas con flujo de caja y EBITDA por obra — una sola fuente de verdad para las constructoras.",
          role: "Producto · Ingeniería · IA aplicada",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Claude"],
          screens: [
            { src: "facilia-cotizador.png", label: "Cotizador IA", path: "facilia.app/cotizador" },
            { src: "facilia-gantt.png", label: "Gantt", path: "facilia.app/avance" },
            { src: "facilia-finanzas.png", label: "Finanzas", path: "facilia.app/finanzas" },
          ],
        },
        {
          key: "clinck", url: "https://clinck.io", host: "clinck.io", sector: "InsurTech · Ops",
          name: "Clinck", tagline: "Convierte registros en decisiones operativas",
          desc: "Plataforma AI-native que convierte inspecciones, checklists y auditorías en tableros en vivo, KPIs y alertas inteligentes para equipos de facilities, mantenimiento y SST. Describe el formulario — la IA lo construye.",
          role: "Producto · Ingeniería · IA aplicada",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Claude"],
          screens: [{ src: "clinck.png", label: "", path: "clinck.io" }],
        },
        {
          key: "shelv", url: "https://shelv.io", host: "shelv.io", sector: "Comunidad · Plataforma",
          name: "Shelv", tagline: "Donde los creadores lanzan el futuro de LATAM",
          desc: "Una plataforma de lanzamiento y comunidad para builders latinoamericanos — descubrimiento de productos, perfiles de creadores, un mapa del ecosistema y oportunidades beta que conectan a los founders de la región.",
          role: "Producto · Ingeniería",
          stack: ["Next.js", "Supabase", "PostgreSQL"],
          screens: [{ src: "shelv.png", label: "", path: "shelv.io" }],
        },
        {
          key: "goquipo", url: "", host: "goquipo.co", sector: "Marketplace · Rentas",
          name: "GoQuipo", tagline: "Compra, vende y renta equipos profesionales",
          desc: "Un marketplace nacional de equipos y maquinaria profesional — vendedores verificados, pago en escrow y cobertura nacional para construcción, eventos, industria, logística y más.",
          role: "Producto · Ingeniería",
          stack: ["Next.js", "Supabase", "PostgreSQL", "Stripe"],
          screens: [{ src: "goquipo.png", label: "", path: "goquipo.co" }],
        },
      ],
    },
    mobile: {
      eyebrow: "Móvil",
      title: "También desarrollamos móvil",
      sub: "Apps con sensación nativa y web móvil — desde tiendas para consumidores hasta herramientas de campo que tu equipo usa en obra. La misma ingeniería AI-native, en el bolsillo de tus usuarios.",
      caption: "Comercio móvil · construido por Facilia Dev",
      stack: ["React Native", "Expo", "iOS · Swift", "Android · Kotlin", "PWA"],
    },
    designwork: {
      eyebrow: "Producto y diseño",
      title: "Productos con diseño, de punta a punta",
      sub: "Más allá de herramientas internas, creamos y diseñamos productos de cara al consumidor — marca, UX e ingeniería juntas. Algunos que hemos lanzado:",
      items: [
        { key: "clinck-gastro", name: "Clinck", host: "clinck · gastro", sector: "Gastronomía · Red", tagline: "La red profesional del sector gastronómico", desc: "Conecta talento, restaurantes y marcas en un solo lugar — perfiles, empleos, menús y reseñas para contratar, ser contratado y crecer.", src: "clinck-gastro.png" },
        { key: "sentimetrik", name: "Sentimetrik", host: "sentimetrik", sector: "CX · Sentiment AI", tagline: "Feedback que se convierte en decisiones", desc: "Captura de feedback y análisis de sentimiento de punta a punta — de las encuestas a decisiones claras, accionables y basadas en datos.", src: "sentimetrik.png" },
      ],
    },
    stack: {
      eyebrow: "Cómo construimos",
      title: "Un stack de ingeniería AI-native",
      sub: "Ponemos modelos de frontera dentro del ciclo diario de ingeniería — planear, generar, revisar y desplegar con agentes. Moderno, seguro y escalable, con herramientas de última generación en todo el stack.",
      loop: ["Planear", "Generar", "Revisar", "Desplegar"],
      loopNote: "El ciclo de agentes que corremos en cada feature.",
      layers: ["IA y sistemas inteligentes", "Frontend", "Backend y datos", "Infraestructura y DevOps", "Ingeniería de calidad", "Integraciones", "Seguridad", "Rendimiento"],
      foot: "Un stack moderno, seguro y escalable — AI-native por defecto, no una software factory tradicional.",
    },
    why: {
      eyebrow: "Por qué Latam",
      title: "Software de calidad, hecho en Latinoamérica",
      sub: "El talento está acá. Combinamos ingenieros senior que se preocupan por el oficio con apalancamiento real de IA — en tu zona horaria, sin el impuesto de coordinación del far-shore.",
      points: [
        ["Misma zona horaria", "Trabajamos las mismas horas que los equipos en EE.UU. — sincronizamos cuando importa, no con 12 horas de retraso."],
        ["Senior y con mentalidad de producto", "Ingenieros que se apropian del resultado y cuestionan specs malas — no ejecutores de tickets."],
        ["AI-native por defecto", "Más entregado por ingeniero, con agentes haciendo el trabajo pesado y humanos dueños del criterio."],
        ["Piel en el juego", "Construimos y operamos nuestros propios productos. El tuyo lo construimos como dueños, porque así construimos los nuestros."],
      ],
    },
    models: {
      eyebrow: "Cómo trabajamos juntos",
      title: "Tres formas de construir con nosotros",
      sub: "Elige la forma que encaja con tu etapa. Todas entregan software real, rápido.",
      items: [
        { tag: "01 · Product Studio", name: "De cero a uno", desc: "Tienes una idea o un producto temprano. Lo llevamos a un build vivo y listo para monetizar — discovery, diseño, ingeniería y lanzamiento, de punta a punta.", featured: false },
        { tag: "02 · Squad Embebido", name: "Staff augmentation, bien hecho", desc: "Ingenieros senior embebidos en tu equipo, AI-native y entregando desde la semana uno. Tú mantienes el roadmap; nosotros sumamos velocidad y oficio.", featured: true },
        { tag: "03 · AI Retrofit", name: "Suma IA a lo que ya tienes", desc: "Copilotos, inteligencia documental, automatización y pipelines de datos sobre tu producto actual — sin reescribir todo.", featured: false },
      ],
      cta: "Agendar llamada",
    },
    final: {
      title: "Construyamos algo que valga la pena desplegar.",
      sub: "Cuéntanos qué estás construyendo. Te mostramos qué tan rápido puede moverse la calidad.",
      btn: "Agendar llamada",
      alt: "o escríbenos",
    },
    footer: {
      line: "© 2026 Facilia Dev · Hecho en Latinoamérica",
      tagline: "Estudio de software AI-native. Diseñamos, construimos y desplegamos software en producción desde Latinoamérica.",
      explore: "Explorar",
      product: "Producto",
      contact: "Contacto",
    },
    theme: { light: "Claro", dark: "Oscuro" },
  },
} as const;

const TECH = [
  "Claude Code", "OpenAI Codex", "Cursor", "Windsurf", "MCP", "Supabase",
  "Next.js", "React", "TypeScript", "Vercel", "PostgreSQL", "Drizzle",
  "Tailwind CSS", "shadcn/ui", "LangGraph", "Playwright", "Cloudflare",
  "Stripe", "Resend", "Upstash", "GitHub Actions",
];

// Shared across languages — tech names are universal; only category titles are localized.
const STACK_ITEMS: string[][] = [
  [
    "Claude Code (Fable 5 · Opus 4.8 · Sonnet 5 · Haiku 4.5)", "OpenAI (GPT-5.5 · Codex)", "Gemini 2.5",
    "MCP (Model Context Protocol)", "AI Agents & Multi-Agent Systems", "Agentic Workflows",
    "RAG (Retrieval-Augmented Generation)", "Semantic Search", "Vector Databases", "Prompt Engineering",
    "AI Evaluations (Evals)", "AI Guardrails", "Structured Outputs", "Tool Calling", "Function Calling",
    "LLM Orchestration", "LangGraph", "LangChain", "AI Automation", "Computer Vision", "OCR",
    "Speech-to-Text & Text-to-Speech",
  ],
  [
    "Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix UI",
    "Framer Motion", "React Query (TanStack Query)", "Zustand", "React Hook Form", "Zod",
    "Server Components", "Edge Rendering", "SSG", "SSR", "ISR", "Progressive Web Apps (PWA)",
  ],
  [
    "Supabase", "PostgreSQL", "Row-Level Security (RLS)", "Edge Functions", "Realtime", "Authentication",
    "Storage", "Drizzle ORM", "Prisma", "Redis", "Upstash", "pgvector", "Vector Search",
    "Background Jobs", "Queues", "Webhooks", "REST APIs", "GraphQL", "tRPC", "OpenAPI", "Database Migrations",
  ],
  [
    "Vercel", "Cloudflare", "Docker", "GitHub Actions", "CI/CD", "Preview Deployments", "Edge Network",
    "CDN", "Environment Management", "Secrets Management", "Infrastructure as Code", "Automatic Rollbacks",
    "Performance Monitoring", "Error Tracking", "Logging", "Uptime Monitoring",
  ],
  [
    "Playwright", "Cypress", "Vitest", "Jest", "Testing Library", "End-to-End Testing", "Integration Testing",
    "Unit Testing", "API Testing", "Accessibility Testing", "Lighthouse", "Performance Audits",
    "Type Safety", "Code Quality", "ESLint", "Prettier",
  ],
  [
    "Stripe", "Resend", "Twilio", "WhatsApp Business API", "Clerk", "Auth0", "Google Workspace",
    "Microsoft 365", "Slack", "Discord", "HubSpot", "Salesforce", "Shopify", "Notion", "Airtable",
    "Zapier", "Make", "n8n", "GitHub API",
  ],
  [
    "OAuth", "JWT", "Passkeys", "Multi-Factor Authentication", "Encryption at Rest", "Encryption in Transit",
    "Secrets Management", "Role-Based Access Control", "Row-Level Security", "OWASP Best Practices",
    "Rate Limiting", "Audit Logs", "Secure API Design",
  ],
  [
    "Edge Computing", "CDN", "Image Optimization", "Code Splitting", "Lazy Loading", "Streaming SSR",
    "Caching Strategies", "Incremental Rendering", "Bundle Optimization", "Database Optimization",
  ],
];

const FILMSTRIP = [
  { src: "facilia-cotizador.png", label: "Facilia · Cotizador" },
  { src: "clinck.png", label: "Clinck" },
  { src: "clix.png", label: "CLIX" },
  { src: "facilia-gantt.png", label: "Facilia · Gantt" },
  { src: "loncho.png", label: "Loncho" },
  { src: "goquipo.png", label: "GoQuipo" },
  { src: "lama.png", label: "Lama" },
  { src: "facilia-finanzas.png", label: "Facilia · Finanzas" },
  { src: "shelv.png", label: "Shelv" },
];

const TERM: { k: "cmd" | "run" | "ok"; t: string }[] = [
  { k: "cmd", t: "facilia dev --new clinck.io" },
  { k: "run", t: "claude code · opus 4.8 → planning architecture" },
  { k: "ok", t: "supabase: 14 tables · RLS policies generated" },
  { k: "ok", t: "next.js 15 · app router · edge runtime" },
  { k: "run", t: "codex → inspection engine + unit tests" },
  { k: "ok", t: "218 tests passing · types clean" },
  { k: "cmd", t: "git push → vercel" },
  { k: "ok", t: "deployed to production · 200ms TTFB" },
];

/* ================= helpers ================= */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ w = 116, h = 23 }: { w?: number; h?: number }) {
  return (
    <>
      <Image src="/facilia_dark.png" alt="Facilia" width={w} height={h} priority className="hidden dark:block" />
      <Image src="/facilia_light.png" alt="Facilia" width={w} height={h} priority className="block dark:hidden" />
    </>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const t = (typeof window !== "undefined" ? window.localStorage.getItem("facilia-theme") : null) as "dark" | "light" | null;
    setTheme(t === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const nt = theme === "dark" ? "light" : "dark";
    setTheme(nt);
    const r = document.documentElement;
    r.classList.toggle("dark", nt === "dark");
    r.classList.toggle("light", nt === "light");
    try { window.localStorage.setItem("facilia-theme", nt); } catch {}
  };
  return (
    <button
      onClick={toggle}
      className="btn-min inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted hover:text-foreground hover:border-foreground/30"
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span>{theme === "dark" ? labels.light : labels.dark}</span>
    </button>
  );
}

/* ---------- Signature hero: live Claude Code session ---------- */

function Terminal({ title }: { title: string }) {
  return (
    <div className="scene relative">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[11px] text-muted">{title}</span>
        </div>
        <div className="space-y-1.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          {TERM.map((l, i) => (
            <div key={i} className="term-line flex gap-2" style={{ "--d": `${0.5 + i * 0.42}s` } as React.CSSProperties}>
              {l.k === "cmd" && <span className="shrink-0 text-accent">$</span>}
              {l.k === "run" && <span className="shrink-0 text-accent/70">»</span>}
              {l.k === "ok" && <span className="shrink-0 text-accent">✓</span>}
              <span className={l.k === "cmd" ? "text-foreground" : "text-muted"}>{l.t}</span>
            </div>
          ))}
          <div className="term-line flex gap-2 pt-1" style={{ "--d": `${0.5 + TERM.length * 0.42}s` } as React.CSSProperties}>
            <span className="shrink-0 text-accent">$</span>
            <span className="caret" />
          </div>
        </div>
      </div>
      <div className="chip-float absolute -left-4 top-[22%] hidden rounded-lg border border-border bg-background/90 px-3 py-1.5 font-mono text-[11px] text-accent shadow-lg backdrop-blur sm:block" style={{ animationDelay: "0.6s" }}>
        Claude · Opus 4.8
      </div>
      <div className="chip-float absolute -right-4 top-[52%] hidden rounded-lg border border-border bg-background/90 px-3 py-1.5 font-mono text-[11px] text-muted shadow-lg backdrop-blur sm:block" style={{ animationDelay: "1.8s" }}>
        Supabase · Postgres
      </div>
      <div className="chip-float absolute -left-2 bottom-[8%] hidden rounded-lg border border-border bg-background/90 px-3 py-1.5 font-mono text-[11px] text-muted shadow-lg backdrop-blur sm:block" style={{ animationDelay: "2.6s" }}>
        Codex · tests
      </div>
    </div>
  );
}

/* ---------- Dynamic product showcase ---------- */

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * 4.5).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * 4.5).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };
  return (
    <div className="scene" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref} className="scene-inner">
        {children}
      </div>
    </div>
  );
}

function useImgStatus() {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  return { ref, ok, onError: () => setOk(false) };
}

function ScreenImg({ src, name, active, kb }: { src: string; name: string; active: boolean; kb: boolean }) {
  const { ref, ok, onError } = useImgStatus();
  return (
    <div className="screen-fade absolute inset-0" style={{ opacity: active ? 1 : 0 }} aria-hidden={!active}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={`/projects/${src}`}
          alt={`${name} — ${src.replace(".png", "")}`}
          onError={onError}
          className={`h-full w-full object-cover object-top ${kb ? "kenburns" : ""}`}
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-card">
          <span className="text-2xl font-semibold text-accent">{name}</span>
          <span className="font-mono text-[11px] text-muted">/projects/{src}</span>
        </div>
      )}
    </div>
  );
}

function Showcase({ item }: { item: { name: string; screens: ReadonlyArray<{ src: string; label: string; path: string }> } }) {
  const [i, setI] = useState(0);
  const multi = item.screens.length > 1;

  useEffect(() => {
    if (!multi) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % item.screens.length), 4200);
    return () => clearInterval(id);
  }, [multi, item.screens.length]);

  const cur = item.screens[i];

  return (
    <div>
      <Tilt>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
          <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 flex-1 truncate rounded-md bg-foreground/[0.04] px-3 py-1 text-center font-mono text-[11px] text-muted">
              {cur.path}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
            {item.screens.map((s, idx) => (
              <ScreenImg key={s.src} src={s.src} name={item.name} active={idx === i} kb={idx === i} />
            ))}
          </div>
        </div>
      </Tilt>
      {multi && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.screens.map((s, idx) => (
            <button
              key={s.src}
              onClick={() => setI(idx)}
              aria-pressed={idx === i}
              className={`rounded-lg border px-3 py-1.5 font-mono text-[11.5px] transition ${idx === i ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted hover:text-foreground"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniShot({ src, label }: { src: string; label: string }) {
  const { ref, ok, onError } = useImgStatus();
  return (
    <div className="w-[300px] shrink-0 overflow-hidden rounded-lg border border-border bg-card sm:w-[360px]">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="h-2 w-2 rounded-full bg-muted/40" />
        <span className="ml-1.5 font-mono text-[10px] text-muted">{label}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={ref} src={`/projects/${src}`} alt={label} onError={onError} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card">
            <span className="text-sm font-semibold text-accent/80">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ScreenStrip() {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max gap-4">
        {[0, 1].map((g) => (
          <div key={g} className="flex gap-4 pr-4">
            {FILMSTRIP.map((f, idx) => (
              <MiniShot key={g + f.src + idx} src={f.src} label={f.label} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ src, label }: { src: string; label: string }) {
  const { ref, ok, onError } = useImgStatus();
  return (
    <div className="relative mx-auto w-[248px] sm:w-[288px]">
      <div className="relative overflow-hidden rounded-[2.6rem] border-[7px] border-[#111318] bg-background shadow-2xl shadow-black/40">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#111318]" />
        <div className="relative aspect-[9/19] w-full overflow-hidden bg-card">
          {ok ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={ref} src={`/projects/${src}`} alt={label} onError={onError} className="h-full w-full object-cover object-top" loading="lazy" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-card px-5 text-center">
              <span className="text-sm font-semibold text-accent">{label}</span>
              <span className="font-mono text-[10px] text-muted">/projects/{src}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Shared bits */
const eyebrow = "font-mono text-xs uppercase tracking-[0.2em] text-accent";
const h2cls = "mt-3 text-3xl font-medium tracking-[-0.02em] sm:text-4xl";
const subcls = "mt-4 max-w-2xl text-muted";
const btnPrimary = "btn-min rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90";

/* ================= page ================= */

export default function Page() {
  useReveal();
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("facilia-lang") as Lang | null) : null;
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage.setItem("facilia-lang", lang); } catch {}
  }, [lang]);

  const t = T[lang];

  return (
    <main className="relative">
      <DottedSurface />
      {/* ===================== NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2" aria-label="Facilia Dev">
            <Logo />
            <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">dev</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-muted md:flex">
            <a href="#work" className="transition hover:text-foreground">{t.nav.work}</a>
            <a href="#expertise" className="transition hover:text-foreground">{t.nav.expertise}</a>
            <a href="#stack" className="transition hover:text-foreground">{t.nav.stack}</a>
            <a href="#why" className="transition hover:text-foreground">{t.nav.why}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-border p-0.5" role="group" aria-label="Language / Idioma">
              {(["en", "es"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setLang(k)}
                  aria-pressed={lang === k}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium uppercase transition ${lang === k ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
                >
                  {k}
                </button>
              ))}
            </div>
            <a href={CAL} target="_blank" rel="noopener" className="btn-min hidden rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 sm:block">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      {/* ===================== HERO ===================== */}
      <section id="top" className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
          <div>
            <p className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-muted" style={{ animationDelay: "0.05s" }}>
              <span className="text-accent" aria-hidden>»</span> {t.hero.eyebrow}
            </p>
            <h1 className="rise text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.7rem]" style={{ animationDelay: "0.15s" }}>
              {t.hero.h1a} <span className="text-accent">{t.hero.h1b}</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.3s" }}>
              {t.hero.sub}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <a href={CAL} target="_blank" rel="noopener" className="btn-min rounded-lg bg-foreground px-6 py-3.5 font-medium text-background hover:opacity-90">
                {t.hero.cta1}
              </a>
              <a href="#work" className="font-medium text-foreground/80 transition hover:text-foreground">
                {t.hero.cta2} <span className="text-accent">»</span>
              </a>
            </div>
            <div className="rise mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7" style={{ animationDelay: "0.6s" }}>
              {t.hero.stats.map(([n, l]) => (
                <div key={l}>
                  <p className="text-3xl font-medium tracking-tight text-foreground">{n}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rise" style={{ animationDelay: "0.35s" }}>
            <Terminal title={t.hero.termTitle} />
          </div>
        </div>
      </section>

      {/* ===================== TECH MARQUEE ===================== */}
      <div className="border-y border-border py-6">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{t.marquee}</p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-slow flex w-max gap-3">
            {[0, 1].map((g) => (
              <div key={g} className="flex gap-3 pr-3">
                {TECH.map((tech, i) => (
                  <span key={g + tech + i} className="whitespace-nowrap rounded-lg border border-border bg-card px-4 py-2 font-mono text-[12.5px] text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== WHAT WE BUILD ===================== */}
      <section id="expertise" className="mx-auto max-w-6xl px-5 py-24">
        <p className={`reveal ${eyebrow}`}>{t.expertise.eyebrow}</p>
        <h2 className={`reveal ${h2cls} max-w-3xl`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.expertise.title}</h2>
        <p className={`reveal ${subcls}`} style={{ "--d": "0.16s" } as React.CSSProperties}>{t.expertise.sub}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.expertise.items.map((it, i) => (
            <div key={it.tag} className="reveal lift group relative overflow-hidden rounded-xl border border-border bg-card p-7" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent">{it.tag}</span>
                {it.ref && <span className="font-mono text-[11px] text-muted">↳ {it.ref}</span>}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{it.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{it.desc}</p>
              <div className="pointer-events-none absolute -right-8 -top-8 text-[7rem] font-semibold text-foreground/[0.03] transition-transform duration-500 group-hover:scale-110" aria-hidden>»</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WORK ===================== */}
      <section id="work" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className={`reveal ${eyebrow}`}>{t.work.eyebrow}</p>
          <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.work.title}</h2>
          <p className={`reveal ${subcls}`} style={{ "--d": "0.16s" } as React.CSSProperties}>{t.work.sub}</p>
        </div>

        <div className="reveal mt-12">
          <ScreenStrip />
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-5">
          <div className="space-y-20 lg:space-y-24">
            {t.work.items.map((p, i) => (
              <div key={p.key} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="reveal" style={{ "--d": "0.05s" } as React.CSSProperties}>
                  <Showcase item={p} />
                </div>
                <div className="reveal" style={{ "--d": "0.12s" } as React.CSSProperties}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-semibold tracking-tight">{p.name}</span>
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">{p.sector}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-accent/80">{p.tagline}</p>
                  <p className="mt-4 leading-relaxed text-muted">{p.desc}</p>
                  <p className="mt-5 font-mono text-[12px] uppercase tracking-wider text-muted/80">{p.role}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11.5px] text-muted">{s}</span>
                    ))}
                  </div>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener" className="btn-min mt-6 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/50 hover:text-accent">
                      {t.work.cta} {p.host} »
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted">
                      {p.host} · {t.work.soon}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRODUCT & DESIGN ===================== */}
      <section id="design" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className={`reveal ${eyebrow}`}>{t.designwork.eyebrow}</p>
          <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.designwork.title}</h2>
          <p className={`reveal ${subcls}`} style={{ "--d": "0.16s" } as React.CSSProperties}>{t.designwork.sub}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {t.designwork.items.map((it, i) => (
              <div key={it.key} className="reveal" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
                <Showcase item={{ name: it.name, screens: [{ src: it.src, label: "", path: it.host }] }} />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-xl font-semibold tracking-tight">{it.name}</span>
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">{it.sector}</span>
                </div>
                <p className="mt-1.5 font-mono text-sm text-accent/80">{it.tagline}</p>
                <p className="mt-3 leading-relaxed text-muted">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MOBILE ===================== */}
      <section id="mobile" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <p className={`reveal ${eyebrow}`}>{t.mobile.eyebrow}</p>
            <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.mobile.title}</h2>
            <p className={`reveal ${subcls}`} style={{ "--d": "0.16s" } as React.CSSProperties}>{t.mobile.sub}</p>
            <div className="reveal mt-6 flex flex-wrap gap-2" style={{ "--d": "0.22s" } as React.CSSProperties}>
              {t.mobile.stack.map((s) => (
                <span key={s} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11.5px] text-muted">{s}</span>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <Tilt>
              <PhoneFrame src="mobile-store.png" label={t.mobile.caption} />
            </Tilt>
          </div>
        </div>
      </section>

      {/* ===================== HOW WE BUILD / STACK ===================== */}
      <section id="stack" className="mx-auto max-w-6xl border-t border-border px-5 py-24">
        <p className={`reveal ${eyebrow}`}>{t.stack.eyebrow}</p>
        <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.stack.title}</h2>
        <p className={`reveal ${subcls}`} style={{ "--d": "0.16s" } as React.CSSProperties}>{t.stack.sub}</p>

        <div className="reveal mt-10 flex flex-col gap-2" style={{ "--d": "0.2s" } as React.CSSProperties}>
          <div className="flex flex-wrap gap-1.5">
            {t.stack.loop.map((step, i) => (
              <div
                key={step}
                className={`${i === 0 ? "chev-first" : "chev"} flex h-14 min-w-[9rem] flex-1 items-center justify-center text-lg font-medium transition-transform duration-300 hover:-translate-y-1`}
                style={{
                  background: i === 3 ? "rgb(var(--accent))" : `rgb(var(--accent) / ${0.12 + i * 0.14})`,
                  color: i === 3 ? "rgb(var(--accent-contrast))" : "rgb(var(--fg))",
                }}
              >
                {step}
              </div>
            ))}
          </div>
          <p className="font-mono text-[11.5px] text-muted">{t.stack.loopNote}</p>
        </div>

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2">
          {t.stack.layers.map((title, i) => (
            <div key={title} className="reveal lift rounded-xl border border-border bg-card p-6" style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {STACK_ITEMS[i].map((it) => (
                  <span key={it} className="rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[11px] text-muted">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="reveal mt-8 max-w-2xl text-sm text-muted" style={{ "--d": "0.1s" } as React.CSSProperties}>{t.stack.foot}</p>
      </section>

      {/* ===================== WHY LATAM ===================== */}
      <section id="why" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-24">
            <p className={`reveal ${eyebrow}`}>{t.why.eyebrow}</p>
            <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.why.title}</h2>
            <p className="reveal mt-4 leading-relaxed text-muted" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.why.sub}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.why.points.map(([ti, d], i) => (
              <div key={ti} className="reveal lift rounded-xl border border-border bg-card p-6" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-medium text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{ti}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ENGAGEMENT MODELS ===================== */}
      <section className="mx-auto max-w-6xl border-t border-border px-5 py-24">
        <p className={`reveal ${eyebrow}`}>{t.models.eyebrow}</p>
        <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.models.title}</h2>
        <p className="reveal mt-3 max-w-xl text-muted" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.models.sub}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.models.items.map((m, i) => (
            <div
              key={m.name}
              className={`reveal lift relative flex flex-col rounded-xl border p-7 ${m.featured ? "border-accent/40 bg-accent/[0.04]" : "border-border bg-card"}`}
              style={{ "--d": `${0.08 * i}s` } as React.CSSProperties}
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{m.tag}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{m.name}</h3>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">{m.desc}</p>
              <a href={CAL} target="_blank" rel="noopener" className={`${btnPrimary} mt-7 text-center`}>
                {t.models.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
          <div className="mx-auto flex w-fit items-center gap-2">
            <Logo w={150} h={30} />
            <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">dev</span>
          </div>
          <h2 className="reveal mx-auto mt-6 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">{t.final.title}</h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-muted" style={{ "--d": "0.1s" } as React.CSSProperties}>{t.final.sub}</p>
          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <a href={CAL} target="_blank" rel="noopener" className="btn-min inline-flex w-full items-center justify-center rounded-lg bg-foreground px-8 py-3.5 font-medium text-background hover:opacity-90 sm:w-auto">
              {t.final.btn} »
            </a>
            <a href={`mailto:${MAIL}`} className="btn-min inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-8 py-3.5 font-medium text-foreground hover:border-accent/50 hover:text-accent sm:w-auto">
              <MailIcon /> {MAIL}
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
            {/* brand */}
            <div>
              <div className="flex items-center gap-2">
                <Logo />
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">dev</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
              <a href={CAL} target="_blank" rel="noopener" className="btn-min mt-5 inline-flex rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                {t.nav.cta}
              </a>
            </div>

            {/* explore */}
            <nav>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.footer.explore}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#work" className="text-muted transition hover:text-foreground">{t.nav.work}</a></li>
                <li><a href="#expertise" className="text-muted transition hover:text-foreground">{t.nav.expertise}</a></li>
                <li><a href="#stack" className="text-muted transition hover:text-foreground">{t.nav.stack}</a></li>
                <li><a href="#why" className="text-muted transition hover:text-foreground">{t.nav.why}</a></li>
              </ul>
            </nav>

            {/* product + contact */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.footer.product}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="https://facilia.app" target="_blank" rel="noopener" className="text-muted transition hover:text-foreground">facilia.app</a></li>
              </ul>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.footer.contact}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href={`mailto:${MAIL}`} className="text-muted transition hover:text-foreground">{MAIL}</a></li>
                <li><a href={CAL} target="_blank" rel="noopener" className="text-muted transition hover:text-foreground">{t.nav.cta}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.line}</p>
            <ThemeToggle labels={t.theme} />
          </div>
        </div>
      </footer>
    </main>
  );
}
