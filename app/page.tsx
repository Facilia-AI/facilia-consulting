"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ========================================================================
   Facilia Dev — AI-native software studio, built in Latin America
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
      sub: "Facilia Dev designs, builds and ships production software for ConTech, PropTech and InsurTech — pairing senior Latin American engineers with agentic tools like Claude Code and Codex to move fast without cutting corners.",
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
    marquee: "Products engineered by Facilia Dev",
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
    stack: {
      eyebrow: "How we build",
      title: "An AI-native engineering stack",
      sub: "We put frontier models in the loop of everyday engineering — planning, generating, reviewing and shipping with agents, on a modern stack that's boring exactly where it should be.",
      loop: ["Plan", "Generate", "Review", "Ship"],
      loopNote: "The agent loop we run on every feature.",
      layers: [
        { l: "AI & Agents", items: ["Claude Code — Opus 4.8 · Sonnet 5 · Haiku 4.5", "OpenAI Codex", "MCP tool servers", "RAG, evals & guardrails"] },
        { l: "Frontend", items: ["Next.js 14 · App Router", "React 18 · TypeScript", "Tailwind CSS", "Server components & edge"] },
        { l: "Backend & Data", items: ["Supabase", "PostgreSQL · Row-Level Security", "Edge functions", "Type-safe ORM (Drizzle / Prisma)"] },
        { l: "Delivery", items: ["Vercel", "CI/CD & preview deploys", "Observability", "End-to-end type safety"] },
      ],
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
    footer: { line: "© 2026 Facilia Dev · AI-native software studio · Built in Latin America", rights: "Products" },
  },

  es: {
    nav: { work: "Proyectos", expertise: "Qué hacemos", stack: "Cómo construimos", why: "Por qué Latam", cta: "Agendar llamada" },
    hero: {
      eyebrow: "Estudio de software AI-native · Hecho en Latinoamérica",
      h1a: "Software de clase mundial,",
      h1b: "hecho en Latam.",
      sub: "Facilia Dev diseña, construye y despliega software en producción para ConTech, PropTech e InsurTech — combinando ingenieros senior latinoamericanos con herramientas agénticas como Claude Code y Codex para ir rápido sin bajar la calidad.",
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
    marquee: "Productos construidos por Facilia Dev",
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
    stack: {
      eyebrow: "Cómo construimos",
      title: "Un stack de ingeniería AI-native",
      sub: "Ponemos modelos de frontera dentro del ciclo diario de ingeniería — planear, generar, revisar y desplegar con agentes, sobre un stack moderno que es aburrido justo donde debe serlo.",
      loop: ["Planear", "Generar", "Revisar", "Desplegar"],
      loopNote: "El ciclo de agentes que corremos en cada feature.",
      layers: [
        { l: "IA y Agentes", items: ["Claude Code — Opus 4.8 · Sonnet 5 · Haiku 4.5", "OpenAI Codex", "Servidores de herramientas MCP", "RAG, evals y guardrails"] },
        { l: "Frontend", items: ["Next.js 14 · App Router", "React 18 · TypeScript", "Tailwind CSS", "Server components y edge"] },
        { l: "Backend y Datos", items: ["Supabase", "PostgreSQL · Row-Level Security", "Edge functions", "ORM type-safe (Drizzle / Prisma)"] },
        { l: "Entrega", items: ["Vercel", "CI/CD y preview deploys", "Observabilidad", "Type safety de punta a punta"] },
      ],
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
    footer: { line: "© 2026 Facilia Dev · Estudio de software AI-native · Hecho en Latinoamérica", rights: "Productos" },
  },
} as const;

const TECH = [
  "Claude Code", "Opus 4.8", "Sonnet 5", "Haiku 4.5", "OpenAI Codex", "Next.js",
  "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel",
  "MCP", "RAG", "Edge Functions", "Row-Level Security",
];

const FILMSTRIP = [
  { src: "facilia-cotizador.png", label: "Facilia · Cotizador" },
  { src: "clinck.png", label: "Clinck" },
  { src: "facilia-gantt.png", label: "Facilia · Gantt" },
  { src: "goquipo.png", label: "GoQuipo" },
  { src: "facilia-finanzas.png", label: "Facilia · Finanzas" },
  { src: "shelv.png", label: "Shelv" },
];

const TERM: { k: "cmd" | "run" | "ok" | "out"; t: string }[] = [
  { k: "cmd", t: "facilia dev --new clinck.io" },
  { k: "run", t: "claude code · opus 4.8 → planning architecture" },
  { k: "ok", t: "supabase: 14 tables · RLS policies generated" },
  { k: "ok", t: "next.js 14 · app router · edge runtime" },
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

function ChevronDivider() {
  const row = Array.from({ length: 28 });
  return (
    <div className="overflow-hidden bg-ink py-3" aria-hidden>
      <div className="marquee-track flex w-max gap-4">
        {[0, 1].map((g) => (
          <div key={g} className="flex gap-4 pr-4">
            {row.map((_, i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 4l8 8-8 8" stroke={i % 4 === 0 ? "#2EC98E" : "#2A3A47"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Signature hero: live Claude Code session ---------- */

function Terminal({ title }: { title: string }) {
  return (
    <div className="scene relative">
      <div className="frame-shadow relative overflow-hidden rounded-2xl border border-white/12 bg-ink2/95">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[11px] text-white/40">{title}</span>
        </div>
        {/* body */}
        <div className="space-y-1.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          {TERM.map((l, i) => (
            <div key={i} className="term-line flex gap-2" style={{ "--d": `${0.5 + i * 0.42}s` } as React.CSSProperties}>
              {l.k === "cmd" && <span className="shrink-0 text-emerald2">$</span>}
              {l.k === "run" && <span className="shrink-0 text-amber-300">»</span>}
              {l.k === "ok" && <span className="shrink-0 text-emerald2">✓</span>}
              {l.k === "out" && <span className="shrink-0 text-white/30"> </span>}
              <span className={l.k === "cmd" ? "text-white" : l.k === "ok" ? "text-white/70" : l.k === "run" ? "text-white/80" : "text-white/40"}>
                {l.t}
              </span>
            </div>
          ))}
          <div className="term-line flex gap-2 pt-1" style={{ "--d": `${0.5 + TERM.length * 0.42}s` } as React.CSSProperties}>
            <span className="shrink-0 text-emerald2">$</span>
            <span className="caret" />
          </div>
        </div>
      </div>
      {/* floating tech chips */}
      <div className="chip-float absolute -left-4 top-[22%] hidden rounded-lg border border-emerald2/30 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-emerald2 shadow-lg backdrop-blur sm:block" style={{ animationDelay: "0.6s" }}>
        Claude · Opus 4.8
      </div>
      <div className="chip-float absolute -right-4 top-[52%] hidden rounded-lg border border-white/15 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-white/85 shadow-lg backdrop-blur sm:block" style={{ animationDelay: "1.8s" }}>
        Supabase · Postgres
      </div>
      <div className="chip-float absolute -left-2 bottom-[8%] hidden rounded-lg border border-amber-300/30 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-amber-200 shadow-lg backdrop-blur sm:block" style={{ animationDelay: "2.6s" }}>
        Codex · tests
      </div>
    </div>
  );
}

/* ---------- Dynamic product showcase (tilt · browser frame · Ken Burns · auto-rotate) ---------- */

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
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink2 to-ink">
          <span className="font-display text-2xl font-extrabold text-emerald2">{name}</span>
          <span className="font-mono text-[11px] text-white/40">/projects/{src}</span>
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
        <div className="frame-shadow overflow-hidden rounded-xl border border-white/12 bg-ink2">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center font-mono text-[11px] text-white/45">
              {cur.path}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
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
              className={`rounded-lg border px-3 py-1.5 font-mono text-[11.5px] transition ${idx === i ? "border-emerald2/50 bg-emerald2/15 text-emerald2" : "border-white/12 text-white/50 hover:text-white"}`}
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
    <div className="w-[300px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-ink2 sm:w-[360px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-1.5 font-mono text-[10px] text-white/40">{label}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={ref} src={`/projects/${src}`} alt={label} onError={onError} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink2 to-ink">
            <span className="font-display text-sm font-bold text-emerald2/80">{label}</span>
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
    <main>
      {/* ===================== NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2" aria-label="Facilia Dev">
            <Image src="/facilia_dark.png" alt="Facilia" width={116} height={23} priority />
            <span className="rounded-full bg-emerald2/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald2">dev</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex">
            <a href="#work" className="transition hover:text-white">{t.nav.work}</a>
            <a href="#expertise" className="transition hover:text-white">{t.nav.expertise}</a>
            <a href="#stack" className="transition hover:text-white">{t.nav.stack}</a>
            <a href="#why" className="transition hover:text-white">{t.nav.why}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-white/15 p-0.5" role="group" aria-label="Language / Idioma">
              {(["en", "es"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setLang(k)}
                  aria-pressed={lang === k}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold uppercase transition ${lang === k ? "bg-emerald2 text-ink" : "text-white/55 hover:text-white"}`}
                >
                  {k}
                </button>
              ))}
            </div>
            <a href={CAL} target="_blank" rel="noopener" className="btn-glow hidden rounded-lg bg-emerald2 px-4 py-2 text-sm font-semibold text-ink sm:block">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      {/* ===================== HERO ===================== */}
      <section id="top" className="blueprint relative overflow-hidden bg-ink text-white">
        <div className="aurora pointer-events-none absolute -right-40 -top-52 h-[560px] w-[560px] rounded-full bg-emerald2/12 blur-[130px]" aria-hidden />
        <div className="aurora-2 pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-deep/25 blur-[120px]" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
          <div>
            <p className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-emerald2/30 bg-emerald2/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald2" style={{ animationDelay: "0.05s" }}>
              <span aria-hidden>»</span> {t.hero.eyebrow}
            </p>
            <h1 className="rise font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.7rem]" style={{ fontWeight: 800, animationDelay: "0.15s" }}>
              {t.hero.h1a} <span className="grad-text">{t.hero.h1b}</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/65" style={{ animationDelay: "0.3s" }}>
              {t.hero.sub}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <a href={CAL} target="_blank" rel="noopener" className="btn-glow rounded-xl bg-emerald2 px-6 py-3.5 font-semibold text-ink">
                {t.hero.cta1}
              </a>
              <a href="#work" className="font-semibold text-emerald2 underline decoration-emerald2/50 decoration-2 underline-offset-4 transition hover:text-white">
                {t.hero.cta2} »
              </a>
            </div>
            <div className="rise mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7" style={{ animationDelay: "0.6s" }}>
              {t.hero.stats.map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-extrabold text-emerald2">{n}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white/50">{l}</p>
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
      <div className="border-y border-white/10 bg-ink py-6">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">{t.marquee}</p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-slow flex w-max gap-3">
            {[0, 1].map((g) => (
              <div key={g} className="flex gap-3 pr-3">
                {TECH.map((tech, i) => (
                  <span key={g + tech + i} className="whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[12.5px] text-white/70">
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
        <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.expertise.eyebrow}</p>
        <h2 className="reveal mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
          {t.expertise.title}
        </h2>
        <p className="reveal mt-4 max-w-2xl text-ink/60" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.expertise.sub}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.expertise.items.map((it, i) => (
            <div key={it.tag} className="reveal lift group relative overflow-hidden rounded-2xl border border-ink/8 bg-white p-7" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-ink px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald2">{it.tag}</span>
                {it.ref && <span className="font-mono text-[11px] text-ink/35">↳ {it.ref}</span>}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{it.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{it.desc}</p>
              <div className="pointer-events-none absolute -right-8 -top-8 text-[7rem] font-display font-black text-ink/[0.03] transition-transform duration-500 group-hover:scale-110" aria-hidden>»</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WORK ===================== */}
      <section id="work" className="bg-ink py-24 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald2">{t.work.eyebrow}</p>
          <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
            {t.work.title}
          </h2>
          <p className="reveal mt-4 max-w-2xl text-white/60" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.work.sub}</p>
        </div>

        {/* dynamic filmstrip of all product screens */}
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
                    <span className="font-display text-2xl font-extrabold">{p.name}</span>
                    <span className="rounded-full border border-emerald2/30 bg-emerald2/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald2">{p.sector}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-emerald2/80">{p.tagline}</p>
                  <p className="mt-4 leading-relaxed text-white/65">{p.desc}</p>
                  <p className="mt-5 font-mono text-[12px] uppercase tracking-wider text-white/40">{p.role}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[11.5px] text-white/70">{s}</span>
                    ))}
                  </div>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener" className="btn-glow mt-6 inline-flex items-center gap-1.5 rounded-lg border border-emerald2/40 px-4 py-2 text-sm font-semibold text-emerald2 hover:bg-emerald2 hover:text-ink">
                      {t.work.cta} {p.host} »
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/50">
                      {p.host} · {t.work.soon}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW WE BUILD / STACK ===================== */}
      <section id="stack" className="mx-auto max-w-6xl px-5 py-24">
        <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.stack.eyebrow}</p>
        <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
          {t.stack.title}
        </h2>
        <p className="reveal mt-4 max-w-2xl text-ink/60" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.stack.sub}</p>

        {/* agent loop */}
        <div className="reveal mt-10 flex flex-col gap-2" style={{ "--d": "0.2s" } as React.CSSProperties}>
          <div className="flex flex-wrap gap-1.5">
            {t.stack.loop.map((step, i) => (
              <div
                key={step}
                className={`${i === 0 ? "chev-first" : "chev"} flex h-14 min-w-[9rem] flex-1 items-center justify-center font-display text-lg font-extrabold transition-transform duration-300 hover:-translate-y-1`}
                style={{ background: i === 3 ? "#2EC98E" : `rgba(46,201,142,${0.18 + i * 0.2})`, color: i === 3 ? "#16202A" : "#16202A" }}
              >
                {step}
              </div>
            ))}
          </div>
          <p className="font-mono text-[11.5px] text-ink/40">{t.stack.loopNote}</p>
        </div>

        {/* layers */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.stack.layers.map((layer, i) => (
            <div key={layer.l} className="reveal lift rounded-2xl border border-ink/8 bg-white p-6" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-deep">0{i + 1}</span>
                <h3 className="font-display text-[15px] font-bold">{layer.l}</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {layer.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13px] leading-snug text-ink/65">
                    <span className="text-emerald2" aria-hidden>»</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ChevronDivider />

      {/* ===================== WHY LATAM ===================== */}
      <section id="why" className="blueprint bg-ink py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-24">
            <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald2">{t.why.eyebrow}</p>
            <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
              {t.why.title}
            </h2>
            <p className="reveal mt-4 leading-relaxed text-white/60" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.why.sub}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.why.points.map(([ti, d], i) => (
              <div key={ti} className="reveal lift lift-dark rounded-2xl border border-white/10 bg-ink2 p-6" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald2/15 font-display font-bold text-emerald2">0{i + 1}</span>
                <h3 className="mt-4 font-display text-base font-bold">{ti}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ENGAGEMENT MODELS ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.models.eyebrow}</p>
        <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
          {t.models.title}
        </h2>
        <p className="reveal mt-3 max-w-xl text-ink/60" style={{ "--d": "0.16s" } as React.CSSProperties}>{t.models.sub}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.models.items.map((m, i) => (
            <div
              key={m.name}
              className={`reveal lift relative flex flex-col rounded-2xl border p-7 ${m.featured ? "lift-dark border-deep bg-ink text-white shadow-[0_28px_70px_-28px_rgba(11,92,68,0.55)]" : "border-ink/8 bg-white"}`}
              style={{ "--d": `${0.08 * i}s` } as React.CSSProperties}
            >
              <p className={`font-mono text-[11px] uppercase tracking-wider ${m.featured ? "text-emerald2" : "text-deep"}`}>{m.tag}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{m.name}</h3>
              <p className={`mt-4 flex-1 text-[14px] leading-relaxed ${m.featured ? "text-white/70" : "text-ink/65"}`}>{m.desc}</p>
              <a
                href={CAL}
                target="_blank"
                rel="noopener"
                className={`btn-glow mt-7 rounded-xl px-5 py-3 text-center font-semibold ${m.featured ? "bg-emerald2 text-ink hover:bg-white" : "bg-ink text-white hover:bg-deep"}`}
              >
                {t.models.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="blueprint bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Image src="/facilia_dark.png" alt="" width={150} height={30} className="mx-auto" />
          <h2 className="reveal mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.final.title}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-white/55" style={{ "--d": "0.1s" } as React.CSSProperties}>{t.final.sub}</p>
          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-4" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <a href={CAL} target="_blank" rel="noopener" className="btn-glow inline-block rounded-xl bg-emerald2 px-8 py-4 font-semibold text-ink">
              {t.final.btn} »
            </a>
            <a href={`mailto:${MAIL}`} className="font-semibold text-emerald2 underline decoration-emerald2/50 decoration-2 underline-offset-4 transition hover:text-white">
              {t.final.alt}: {MAIL}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-white/45">
          <p>{t.footer.line}</p>
          <div className="flex gap-6">
            <a href="https://facilia.app" target="_blank" rel="noopener" className="transition hover:text-white">facilia.app</a>
            <a href="https://clinck.io" target="_blank" rel="noopener" className="transition hover:text-white">clinck.io</a>
            <a href="https://shelv.io" target="_blank" rel="noopener" className="transition hover:text-white">shelv.io</a>
            <a href={`mailto:${MAIL}`} className="transition hover:text-white">{MAIL}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
