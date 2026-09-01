"use client";

import { useEffect, useRef, useState } from "react";
import { DottedSurface } from "@/components/ui/dotted-surface";

/* ========================================================================
   Facilia — We build products. Some become companies.
   Product company · venture builder · product-engineering partner
   ===================================================================== */

const CAL = "https://cal.com/javier-cristancho-oa5zrb";
const MAIL = "contacto@facilia.app";

type Lang = "en" | "es";

/* ---------------- Ventures (data-driven — add new ones here) ---------------- */

type Status = "exploring" | "building" | "launching" | "operating" | "spinning" | "partner";

const STATUS: Record<Status, { en: string; es: string; tone: "active" | "live" | "quiet" | "ink" }> = {
  exploring: { en: "Exploring", es: "Explorando", tone: "quiet" },
  building: { en: "Building", es: "Construyendo", tone: "active" },
  launching: { en: "Launching", es: "Lanzando", tone: "active" },
  operating: { en: "Operating", es: "Operando", tone: "live" },
  spinning: { en: "Spinning out", es: "Escindiéndose", tone: "ink" },
  partner: { en: "Partner-built", es: "Con socios", tone: "ink" },
};

const VENTURES = [
  {
    key: "facilia",
    name: "Facilia.app",
    category: { en: "Construction Software", es: "Software de construcción" },
    status: "building" as Status,
    href: "https://facilia.app",
    host: "facilia.app",
    img: "facilia-venture.png",
    blurb: {
      en: "Software that helps construction contractors quote projects faster and operate with better control — from budgets to progress and cash.",
      es: "Software que ayuda a los contratistas de construcción a cotizar obras más rápido y operar con mejor control — del presupuesto al avance y la caja.",
    },
  },
  {
    key: "decua",
    name: "Decúa",
    category: { en: "Construction · Home Services", es: "Construcción · Servicios para el hogar" },
    status: "operating" as Status,
    href: "https://decua.co",
    host: "decua.co",
    img: "decua.png",
    blurb: {
      en: "Intelligent remodeling — plan, quote and remodel a home or office from a single place, with design, estimates, execution and live project tracking.",
      es: "Remodelación inteligente — planea, cotiza y remodela tu hogar u oficina desde un solo lugar, con diseño, cotización, ejecución y seguimiento en vivo.",
    },
  },
  {
    key: "shelv",
    name: "Shelv",
    category: { en: "Builder Community · LATAM", es: "Comunidad de builders · LATAM" },
    status: "launching" as Status,
    href: "https://shelv.io",
    host: "shelv.io",
    img: "shelv-venture.png",
    blurb: {
      en: "A launchpad and community where Latin American builders discover products, connect and launch what they're building.",
      es: "Una plataforma de lanzamiento y comunidad donde los builders latinoamericanos descubren productos, se conectan y lanzan lo que están construyendo.",
    },
  },
  {
    key: "monitor",
    name: "Monitor",
    category: { en: "Industrial · Predictive Maintenance", es: "Industrial · Mantenimiento predictivo" },
    status: "building" as Status,
    href: "",
    host: "",
    img: "monitor-venture.png",
    blurb: {
      en: "AI-powered predictive maintenance systems that help industrial companies prevent failures, reduce downtime and extend asset life.",
      es: "Sistemas de mantenimiento predictivo con IA que ayudan a las empresas industriales a prevenir fallas, reducir el downtime y extender la vida de sus activos.",
    },
  },
  {
    key: "combo",
    name: "Combo",
    category: { en: "Experiences · AI Planning", es: "Experiencias · Planeación con IA" },
    status: "building" as Status,
    href: "",
    host: "",
    img: "combo-venture.png",
    blurb: {
      en: "An agentic platform for planning unforgettable group experiences.",
      es: "Una plataforma agéntica para planear experiencias grupales inolvidables.",
    },
  },
  {
    key: "clinck",
    name: "Clinck",
    category: { en: "Advertising · Print Production", es: "Publicidad · Producción gráfica" },
    status: "building" as Status,
    href: "",
    host: "",
    img: "clinck-venture.png",
    blurb: {
      en: "The operating system for advertising and graphic-production companies.",
      es: "El sistema operativo para empresas de publicidad y producción gráfica.",
    },
  },
  {
    key: "muevo",
    name: "Muevo",
    category: { en: "Electric Mobility · Marketplace", es: "Movilidad eléctrica · Marketplace" },
    status: "exploring" as Status,
    href: "",
    host: "",
    img: "muevo-venture.png",
    blurb: {
      en: "A vertical platform for Colombia's electric mobility market — an EV marketplace built on intelligence around the vehicle: valuation, residual value, battery health and cost of ownership, so buying used stops feeling like a bet.",
      es: "Una plataforma vertical para el mercado de movilidad eléctrica en Colombia — un marketplace de vehículos eléctricos con inteligencia alrededor del vehículo: valoración, valor residual, estado de batería y costo de propiedad, para que comprar un usado deje de sentirse como una apuesta.",
    },
  },
];

/* Products built with partners — proof of the build capability (real, shipped). */
const BUILDS = [
  { img: "clinck.png", name: "Clinck" },
  { img: "shelv.png", name: "Shelv" },
  { img: "goquipo.png", name: "GoQuipo" },
  { img: "sentimetrik.png", name: "Sentimetrik" },
  { img: "clix.png", name: "CLIX" },
  { img: "loncho.png", name: "Loncho" },
  { img: "lama.png", name: "Lama" },
  { img: "clinck-gastro.png", name: "Clinck · Gastro" },
];

/* ================= i18n ================= */

const T = {
  en: {
    nav: { build: "Build", ventures: "Ventures", partner: "Partner", about: "About", cta: "Build with us" },
    hero: {
      kicker: "Product & venture builder",
      h1a: "We build products.",
      h1b: "Some become companies.",
      sub: "Facilia is a product company that builds its own ventures and partners with ambitious teams to turn ideas into products, businesses and technology that scales.",
      cta1: "Build with us",
      cta2: "See what we're building",
    },
    thesis: {
      eyebrow: "What we do",
      title: "We don't just build software. We build things that can become businesses.",
      modes: [
        { k: "Build", d: "We find problems worth solving and create products around them." },
        { k: "Partner", d: "We work with people who know a market, customer or problem deeply, and turn that insight into a product." },
        { k: "CTO", d: "We provide product and technical leadership for companies that need to build, launch or scale technology." },
      ],
    },
    ventures: {
      eyebrow: "Ventures",
      title: "Things we're building.",
      sub: "Products of our own — some operating, some just getting started.",
      visit: "Visit",
      soon: "Coming soon",
    },
    builds: {
      eyebrow: "Built with partners",
      title: "And things we've built with others.",
      sub: "Products we've designed and shipped alongside founders and teams.",
    },
    partner: {
      eyebrow: "Partner",
      title: "Have something worth building?",
      sub: "We partner with founders, operators and companies that have a problem worth solving, an idea worth testing or a product worth scaling.",
      note: "Sometimes we build our own company. Sometimes we build yours with you. Sometimes we become the team responsible for making technology happen.",
      items: [
        { k: "Product", d: "We help turn an idea into a clear product." },
        { k: "Engineering", d: "We design and build the technology." },
        { k: "CTO", d: "We provide technical and product leadership." },
        { k: "Venture", d: "We explore building something together for the long term." },
      ],
    },
    how: {
      eyebrow: "How we build",
      title: "A product-building loop.",
      steps: [
        ["Find", "Find problems worth solving."],
        ["Test", "Validate before overbuilding."],
        ["Build", "Prototype and ship."],
        ["Launch", "Put it in the hands of real users."],
        ["Scale", "Double down on what works."],
      ],
    },
    ai: {
      eyebrow: "AI-native",
      title: "Built differently.",
      body: "AI-native tools and agents let small, senior teams move from idea to working product faster than ever. We use AI across research, product, engineering and operations — as leverage for builders, not as a replacement for judgment.",
    },
    why: {
      eyebrow: "Why Facilia",
      title: "We build from the inside.",
      points: [
        ["Builders, not vendors", "We care about the product, not just the deliverable."],
        ["Product + engineering", "We don't separate deciding what to build from building it."],
        ["AI-native", "Modern AI tooling increases the leverage of small, senior teams."],
        ["Ownership", "We build our own products, so we know the difference between shipping software and building a business."],
        ["Long-term", "The best partnerships don't end at launch."],
      ],
    },
    about: {
      eyebrow: "About",
      body: "Facilia is a product company based in Latin America. We build products of our own and partner with ambitious teams to build theirs. Our ambition is a portfolio of useful products — and the experience, infrastructure and talent to build the next one faster.",
    },
    final: { title: "Let's build something worth building.", cta: "Build with us", cta2: "See our ventures" },
    footer: { line: "© 2026 Facilia · Product & venture builder · Built in Latin America", theme: { light: "Light", dark: "Dark" } },
  },

  es: {
    nav: { build: "Construimos", ventures: "Ventures", partner: "Alianzas", about: "Nosotros", cta: "Construyamos juntos" },
    hero: {
      kicker: "Product & venture builder",
      h1a: "Construimos productos.",
      h1b: "Algunos se vuelven empresas.",
      sub: "Facilia es una empresa de producto que construye sus propias ventures y se alía con equipos ambiciosos para convertir ideas en productos, negocios y tecnología que escala.",
      cta1: "Construyamos juntos",
      cta2: "Mira lo que estamos construyendo",
    },
    thesis: {
      eyebrow: "Qué hacemos",
      title: "No solo construimos software. Construimos cosas que pueden volverse negocios.",
      modes: [
        { k: "Build", d: "Encontramos problemas que vale la pena resolver y creamos productos alrededor de ellos." },
        { k: "Partner", d: "Trabajamos con quienes conocen a fondo un mercado, cliente o problema, y convertimos ese insight en producto." },
        { k: "CTO", d: "Damos liderazgo de producto y técnico a empresas que necesitan construir, lanzar o escalar tecnología." },
      ],
    },
    ventures: {
      eyebrow: "Ventures",
      title: "Lo que estamos construyendo.",
      sub: "Productos propios — algunos operando, otros apenas comenzando.",
      visit: "Visitar",
      soon: "Pronto",
    },
    builds: {
      eyebrow: "Construido con socios",
      title: "Y cosas que hemos construido con otros.",
      sub: "Productos que hemos diseñado y lanzado junto a founders y equipos.",
    },
    partner: {
      eyebrow: "Alianzas",
      title: "¿Tienes algo que valga la pena construir?",
      sub: "Nos aliamos con founders, operadores y empresas que tienen un problema que vale la pena resolver, una idea que vale la pena probar o un producto que vale la pena escalar.",
      note: "A veces construimos nuestra propia empresa. A veces construimos la tuya contigo. A veces nos volvemos el equipo responsable de hacer que la tecnología pase.",
      items: [
        { k: "Producto", d: "Ayudamos a convertir una idea en un producto claro." },
        { k: "Ingeniería", d: "Diseñamos y construimos la tecnología." },
        { k: "CTO", d: "Damos liderazgo técnico y de producto." },
        { k: "Venture", d: "Exploramos construir algo juntos a largo plazo." },
      ],
    },
    how: {
      eyebrow: "Cómo construimos",
      title: "Un ciclo de construcción de producto.",
      steps: [
        ["Find", "Encontrar problemas que valga la pena resolver."],
        ["Test", "Validar antes de sobre-construir."],
        ["Build", "Prototipar y lanzar."],
        ["Launch", "Ponerlo en manos de usuarios reales."],
        ["Scale", "Redoblar en lo que funciona."],
      ],
    },
    ai: {
      eyebrow: "AI-native",
      title: "Construido distinto.",
      body: "Las herramientas y agentes AI-native permiten que equipos pequeños y senior pasen de la idea a un producto funcionando más rápido que nunca. Usamos IA en research, producto, ingeniería y operaciones — como apalancamiento para builders, no como reemplazo del criterio.",
    },
    why: {
      eyebrow: "Por qué Facilia",
      title: "Construimos desde adentro.",
      points: [
        ["Builders, no proveedores", "Nos importa el producto, no solo el entregable."],
        ["Producto + ingeniería", "No separamos decidir qué construir de construirlo."],
        ["AI-native", "El tooling moderno de IA aumenta el apalancamiento de equipos pequeños y senior."],
        ["Ownership", "Construimos productos propios, así que sabemos la diferencia entre entregar software y construir un negocio."],
        ["Largo plazo", "Las mejores alianzas no terminan en el lanzamiento."],
      ],
    },
    about: {
      eyebrow: "Nosotros",
      body: "Facilia es una empresa de producto con base en Latinoamérica. Construimos productos propios y nos aliamos con equipos ambiciosos para construir los suyos. Nuestra ambición es un portafolio de productos útiles — y la experiencia, infraestructura y talento para construir el siguiente más rápido.",
    },
    final: { title: "Construyamos algo que valga la pena.", cta: "Construyamos juntos", cta2: "Ver nuestras ventures" },
    footer: { line: "© 2026 Facilia · Product & venture builder · Hecho en Latinoamérica", theme: { light: "Claro", dark: "Oscuro" } },
  },
} as const;

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

function useImgStatus() {
  const ref = useRef<HTMLImageElement>(null);
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  return { ref, ok, onError: () => setOk(false) };
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M9 11 L24 24 L9 37" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 11 L40 24 L25 37" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ className }: { className?: string }) {
  return <Chevron className={className ?? "h-8 w-8 text-foreground sm:h-9 sm:w-9"} />;
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
function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const t = (typeof window !== "undefined" ? window.localStorage.getItem("facilia-theme") : null) as "dark" | "light" | null;
    setTheme(t === "dark" ? "dark" : "light");
  }, []);
  const toggle = () => {
    const nt = theme === "dark" ? "light" : "dark";
    setTheme(nt);
    const r = document.documentElement;
    r.classList.toggle("dark", nt === "dark");
    r.classList.toggle("light", nt !== "dark");
    try { window.localStorage.setItem("facilia-theme", nt); } catch {}
  };
  return (
    <button onClick={toggle} className="btn-min inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground" aria-label="Toggle theme">
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span>{theme === "dark" ? labels.light : labels.dark}</span>
    </button>
  );
}

function StatusDot({ status, lang }: { status: Status; lang: Lang }) {
  const s = STATUS[status];
  const dot =
    s.tone === "live" ? "bg-accent" : s.tone === "active" ? "bg-accent/60" : s.tone === "ink" ? "bg-foreground/70" : "bg-muted/50";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${s.tone === "live" ? "animate-pulse" : ""}`} />
      {s[lang]}
    </span>
  );
}

function VentureShot({ src, name }: { src: string; name: string }) {
  const { ref, ok, onError } = useImgStatus();
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-card">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={ref} src={`/projects/${src}`} alt={`${name}`} onError={onError} className="shot h-full w-full object-cover object-center" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-card">
          <span className="display text-4xl text-foreground/70">{name}</span>
        </div>
      )}
    </div>
  );
}

function VentureCard({ v, lang, t }: { v: (typeof VENTURES)[number]; lang: Lang; t: { visit: string; soon: string } }) {
  const linked = v.href.length > 0;
  const inner = (
    <>
      <div className="overflow-hidden rounded-xl">
        <VentureShot src={v.img} name={v.name} />
      </div>
      <div className="mt-6 flex items-start justify-between gap-4 px-1">
        <p className="text-sm text-muted">{v.category[lang]}</p>
        <StatusDot status={v.status} lang={lang} />
      </div>
      <p className="mt-3 flex-1 px-1 leading-relaxed text-muted">{v.blurb[lang]}</p>
      {linked ? (
        <span className="mt-6 inline-flex items-center gap-1.5 px-1 pb-1 text-sm font-medium text-foreground transition group-hover:text-accent">
          {t.visit} {v.host} <Arrow />
        </span>
      ) : (
        <span className="mt-6 px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{t.soon}</span>
      )}
    </>
  );
  const cls = "venture group flex h-full flex-col rounded-2xl border border-border bg-card p-4 sm:p-5";
  return linked ? (
    <a href={v.href} target="_blank" rel="noopener" className={cls}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function CarouselArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="btn-min flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground hover:border-foreground/60"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: dir === "prev" ? "scaleX(-1)" : "none" }}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function VenturesCarousel({ lang, t }: { lang: Lang; t: { visit: string; soon: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amt = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 12) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: amt * dir, behavior: "smooth" });
    }
  };

  // Auto-advance — pauses on hover / touch, respects reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let paused = false;
    const on = () => (paused = true);
    const off = () => (paused = false);
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("touchstart", on, { passive: true });
    const id = setInterval(() => { if (!paused) step(1); }, 3800);
    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", on);
      el.removeEventListener("mouseleave", off);
      el.removeEventListener("touchstart", on);
    };
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VENTURES.map((v) => (
          <div key={v.key} data-card className="w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[320px] lg:w-[360px]">
            <VentureCard v={v} lang={lang} t={t} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-2">
        <CarouselArrow dir="prev" onClick={() => step(-1)} />
        <CarouselArrow dir="next" onClick={() => step(1)} />
      </div>
    </div>
  );
}

function BuildShot({ src, name }: { src: string; name: string }) {
  const { ref, ok, onError } = useImgStatus();
  return (
    <figure className="w-[260px] shrink-0 sm:w-[320px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-card">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={ref} src={`/projects/${src}`} alt={name} onError={onError} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center"><span className="display text-xl text-foreground/60">{name}</span></div>
        )}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{name}</figcaption>
    </figure>
  );
}

/* Shared class helpers */
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.24em] text-muted";
const h2cls = "display mt-5 text-4xl leading-[1.03] sm:text-5xl";
const btnInk = "btn-min inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background hover:opacity-90";
const btnGhost = "btn-min inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-[15px] font-medium text-foreground hover:border-foreground/60";

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
        <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <a href="#top" aria-label="Facilia.dev"><Logo /></a>
          <div className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#thesis" className="transition hover:text-foreground">{t.nav.build}</a>
            <a href="#ventures" className="transition hover:text-foreground">{t.nav.ventures}</a>
            <a href="#partner" className="transition hover:text-foreground">{t.nav.partner}</a>
            <a href="#about" className="transition hover:text-foreground">{t.nav.about}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-border p-0.5 sm:flex" role="group" aria-label="Language">
              {(["en", "es"] as const).map((k) => (
                <button key={k} onClick={() => setLang(k)} aria-pressed={lang === k}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase transition ${lang === k ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}>
                  {k}
                </button>
              ))}
            </div>
            <a href={CAL} target="_blank" rel="noopener" className="btn-min rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      {/* ===================== HERO (compact) ===================== */}
      <section id="top" className="mx-auto max-w-[1180px] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16">
        <p className="rise text-sm text-muted" style={{ animationDelay: "0.05s" }}>{t.hero.kicker}</p>
        <h1 className="rise display display-light mt-5 text-4xl leading-[1.04] sm:text-5xl lg:text-[4rem]" style={{ animationDelay: "0.12s" }}>
          {t.hero.h1a} <span className="text-muted">{t.hero.h1b}</span>
        </h1>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <p className="rise max-w-xl text-[17px] leading-relaxed text-muted" style={{ animationDelay: "0.24s" }}>{t.hero.sub}</p>
          <div className="rise flex flex-wrap items-center gap-3 lg:justify-end" style={{ animationDelay: "0.32s" }}>
            <a href={CAL} target="_blank" rel="noopener" className={btnInk}>{t.hero.cta1} <Arrow /></a>
            <a href="#ventures" className={btnGhost}>{t.hero.cta2}</a>
          </div>
        </div>
      </section>

      {/* ===================== VENTURES (second — right after hero) ===================== */}
      <section id="ventures" className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`reveal ${eyebrow}`}>{t.ventures.eyebrow}</p>
              <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.ventures.title}</h2>
            </div>
            <p className="reveal max-w-sm text-muted" style={{ "--d": "0.14s" } as React.CSSProperties}>{t.ventures.sub}</p>
          </div>
          <div className="reveal mt-12">
            <VenturesCarousel lang={lang} t={{ visit: t.ventures.visit, soon: t.ventures.soon }} />
          </div>
        </div>
      </section>

      {/* ===================== THESIS / WHAT WE DO ===================== */}
      <section id="thesis" className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <p className={`reveal ${eyebrow}`}>{t.thesis.eyebrow}</p>
          <h2 className={`reveal ${h2cls} max-w-4xl`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.thesis.title}</h2>
          <div className="mt-16 divide-y divide-border border-y border-border">
            {t.thesis.modes.map((m, i) => (
              <div key={m.k} className="reveal grid gap-3 py-8 sm:grid-cols-[220px_1fr] sm:gap-10" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span className="display text-2xl">{m.k}</span>
                </div>
                <p className="max-w-2xl text-lg leading-relaxed text-muted">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BUILT WITH PARTNERS (proof) ===================== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 sm:pt-28">
          <p className={`reveal ${eyebrow}`}>{t.builds.eyebrow}</p>
          <h2 className={`reveal ${h2cls} max-w-3xl`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.builds.title}</h2>
          <p className="reveal mt-5 max-w-xl text-muted" style={{ "--d": "0.14s" } as React.CSSProperties}>{t.builds.sub}</p>
        </div>
        <div className="reveal mt-14 pb-20 sm:pb-28">
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max gap-6 px-3">
              {[0, 1].map((g) => (
                <div key={g} className="flex gap-6">
                  {BUILDS.map((b, i) => <BuildShot key={g + b.img + i} src={b.img} name={b.name} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PARTNER / BUILD WITH US ===================== */}
      <section id="partner" className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <p className={`reveal ${eyebrow}`}>{t.partner.eyebrow}</p>
          <h2 className={`reveal ${h2cls} max-w-3xl`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.partner.title}</h2>
          <p className="reveal mt-5 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "0.14s" } as React.CSSProperties}>{t.partner.sub}</p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {t.partner.items.map((it, i) => (
              <div key={it.k} className="reveal flex flex-col gap-3 bg-card p-7" style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">0{i + 1}</span>
                <h3 className="display text-xl">{it.k}</h3>
                <p className="text-[14px] leading-relaxed text-muted">{it.d}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-10 max-w-2xl text-lg leading-relaxed text-foreground/80" style={{ "--d": "0.1s" } as React.CSSProperties}>{t.partner.note}</p>
          <div className="reveal mt-8" style={{ "--d": "0.16s" } as React.CSSProperties}>
            <a href={CAL} target="_blank" rel="noopener" className={btnInk}>{t.nav.cta} <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ===================== HOW WE BUILD ===================== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <p className={`reveal ${eyebrow}`}>{t.how.eyebrow}</p>
          <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.how.title}</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {t.how.steps.map(([k, d], i) => (
              <div key={k} className="reveal flex flex-col gap-3 bg-card p-6" style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="display text-xl">{k}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BUILT DIFFERENTLY (AI) ===================== */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={`reveal ${eyebrow}`}>{t.ai.eyebrow}</p>
            <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.ai.title}</h2>
          </div>
          <p className="reveal self-end text-xl leading-relaxed text-foreground/80" style={{ "--d": "0.14s" } as React.CSSProperties}>{t.ai.body}</p>
        </div>
      </section>

      {/* ===================== WHY FACILIA ===================== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <p className={`reveal ${eyebrow}`}>{t.why.eyebrow}</p>
          <h2 className={`reveal ${h2cls}`} style={{ "--d": "0.08s" } as React.CSSProperties}>{t.why.title}</h2>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.points.map(([ti, d], i) => (
              <div key={ti} className="reveal border-t border-border pt-5" style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}>
                <h3 className="text-lg font-medium tracking-tight">{ti}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <p className={`reveal ${eyebrow}`}>{t.about.eyebrow}</p>
          <p className="reveal display mt-6 max-w-4xl text-2xl leading-[1.4] sm:text-[2rem]" style={{ "--d": "0.08s" } as React.CSSProperties}>
            {t.about.body}
          </p>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1180px] px-5 py-24 text-center sm:px-8 sm:py-36">
          <h2 className="reveal display mx-auto max-w-3xl text-4xl leading-[1.05] sm:text-6xl">{t.final.title}</h2>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <a href={CAL} target="_blank" rel="noopener" className={btnInk}>{t.final.cta} <Arrow /></a>
            <a href="#ventures" className={btnGhost}>{t.final.cta2}</a>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="https://facilia.app" target="_blank" rel="noopener" className="transition hover:text-foreground">facilia.app</a>
            <a href="https://decua.co" target="_blank" rel="noopener" className="transition hover:text-foreground">decua.co</a>
            <a href={`mailto:${MAIL}`} className="transition hover:text-foreground">{MAIL}</a>
            <ThemeToggle labels={t.footer.theme} />
          </div>
        </div>
        <div className="mx-auto max-w-[1180px] px-5 pb-8 text-xs text-muted sm:px-8">{t.footer.line}</div>
      </footer>
    </main>
  );
}
