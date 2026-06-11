"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ================= i18n ================= */

type Lang = "es" | "en";

const T = {
  es: {
    nav: { method: "Método F.Á.C.I.L.", domains: "Dominios", pricing: "Precios", cta: "Agendar diagnóstico" },
    hero: {
      eyebrow: "Consultora AI-Native para la construcción",
      h1a: "Tu constructora ya genera los datos.",
      h1b: "Nosotros los convertimos en margen.",
      sub: "En 3 semanas, nuestra IA lee tus facturas, extractos y presupuestos y te muestra dónde se está perdiendo la plata. En 12, instalamos el sistema para que no vuelva a pasar: operación, finanzas, compras, contabilidad y proyectos.",
      cta1: "Empezar con el Diagnóstico Express",
      cta2: "Ver el método »",
      foot: "Contratistas y firmas de arquitectura · SMB y mid-market · Colombia",
      chips: ["Margen real detectado: 9.4%", "1,842 documentos leídos por IA", "COP 312M/año recuperables"],
      planLabel: "PLANO F.Á.C.I.L. · ESC 1:12 SEMANAS",
    },
    pains: {
      eyebrow: "Por qué existimos",
      title: "El negocio de construir está roto por dentro",
      items: [
        ["Márgenes que se evaporan", "Se cotiza con un margen y se cierra con otro. Nadie sabe en qué proyecto se perdió la plata hasta meses después."],
        ["Compras sin control", "Órdenes por WhatsApp, sin 3 cotizaciones, sin trazabilidad. El mayor costo del negocio es el menos gestionado."],
        ["Contabilidad desconectada de la obra", "El cierre llega tarde y mira hacia atrás. La contabilidad no habla con el presupuesto ni con el avance real."],
        ["Caja reactiva", "El hueco de liquidez se descubre cuando ya toca pedir prestado. Cero visibilidad a 13 semanas."],
        ["Datos dispersos", "Excel, correo, chats y papel. La información existe, pero no está estructurada para decidir."],
        ["Dueños atrapados en la operación", "El fundador aprueba todo y apaga incendios. No queda tiempo para crecer el negocio."],
      ],
    },
    method: {
      eyebrow: "La metodología",
      title: "Método F.Á.C.I.L. — cinco fases, 12 semanas",
      sub: "No estructuramos proyectos: estructuramos el negocio. Cada fase deja entregables instalados y operando, no presentaciones.",
      phases: [
        { l: "F", name: "Fotografía 360°", time: "Semanas 1–3", desc: "La IA lee tus facturas, extractos, presupuestos y contratos de los últimos 12–24 meses. Margen real por proyecto, fugas de costo y scorecard de madurez en 5 dominios." },
        { l: "Á", name: "Análisis y Arquitectura", time: "Semanas 3–6", desc: "Modelo operativo objetivo: plan de cuentas por proyecto, política de compras con aprobaciones, flujo de caja a 13 semanas y matriz de responsabilidades." },
        { l: "C", name: "Construcción del Sistema", time: "Semanas 6–10", desc: "facilia.app como núcleo: presupuesto, compras, avance y caja en un solo lugar. SOPs, tableros en vivo y capacitación por rol." },
        { l: "I", name: "IA Aplicada", time: "Semanas 8–12", desc: "Modelos en producción: predicción de caja, alertas de desviación de presupuesto, scoring de proveedores y conciliación contable automática." },
        { l: "L", name: "Liderazgo y Mejora Continua", time: "Continuo", desc: "Cadencia semanal, mensual y trimestral instalada en tu equipo, con rol de CFO/COO fraccional. El método queda; el caos no vuelve." },
      ],
    },
    domains: {
      eyebrow: "El alcance",
      title: "Cinco dominios, una sola fuente de verdad",
      sub: "Datos estructurados + modelos de IA + facilia.app como capa transversal: cada dominio alimenta y consume la misma información. La consultoría instala el proceso; el software lo hace permanente.",
      link: "Conocer facilia.app »",
      items: [
        ["Operación", "Avance real vs plan, productividad, retrabajos, coordinación obra-oficina."],
        ["Finanzas", "Margen por proyecto, caja a 13 semanas, pricing y capital de trabajo."],
        ["Compras", "3 cotizaciones, órdenes y aprobaciones, scoring de proveedores."],
        ["Contabilidad", "Cuentas por proyecto, cierre en ≤10 días, conciliación automática."],
        ["Proyectos", "Presupuesto base, control de cambios, desviaciones tempranas."],
      ],
    },
    score: {
      phase: "Fase F · Fotografía 360°",
      title: "Scorecard de madurez",
      badge: "IA · 1,842 documentos leídos",
      finding: "Hallazgo del diagnóstico",
      f1: "Margen cotizado",
      f2: "margen real",
      f3: "Principal fuga: compras sin cotización comparada",
      f4: "/año recuperables",
      domains: ["Operación", "Finanzas", "Compras", "Contabilidad", "Proyectos"],
    },
    pricing: {
      eyebrow: "Precios",
      title: "Tres formas de trabajar con Facilia",
      sub: "Precio por valor, no por horas: el fee se calibra al tamaño de tu negocio y el diagnóstico debe identificar al menos 5x su costo en valor recuperable.",
      segLabel: "Segmento de empresa",
      smb: "SMB (1–10 mil M)",
      mid: "Mid-market (10–50 mil M)",
      featured: "Proyecto insignia",
      vat: "sin IVA",
      formula: "Fórmula de cotización: precio base del segmento × factor de complejidad (0.8–1.3) según proyectos simultáneos, usuarios y madurez de datos.",
      plans: [
        {
          tag: "01 · Puerta de entrada", name: "Diagnóstico Express", time: "2–3 semanas", note: "precio fijo",
          bullets: ["Fotografía 360° con IA sobre tus datos reales", "Scorecard de madurez en los 5 dominios", "Top 10 quick wins con business case", "Se acredita 100% a la Transformación si firmas en 30 días"],
          cta: "Agendar diagnóstico", subject: "Quiero%20empezar%20con%20Facilia%20Consulting",
        },
        {
          tag: "02 · Proyecto insignia", name: "Transformación F.Á.C.I.L.", time: "12 semanas", note: "pago por hitos: F 20% · Á 25% · C 35% · I 20%",
          bullets: ["El método completo, de diagnóstico a IA en producción", "facilia.app implementado e incluido durante el proyecto", "Equipo capacitado y tableros con datos en vivo", "Success fee opcional: 10% del ahorro verificado en compras"],
          cta: "Hablar con Facilia", subject: "Quiero%20empezar%20con%20Facilia%20Consulting",
        },
        {
          tag: "03 · Recurrente", name: "Socio de Mejora Continua", time: "Mensual · mín. 6 meses", note: "retainer + suscripción facilia.app",
          bullets: ["Comité financiero mensual y cadencia operativa", "Rol de CFO/COO fraccional para tu negocio", "1 nuevo caso de uso de IA cada trimestre", "Suscripción a facilia.app incluida"],
          cta: "Conocer el retainer", subject: "Quiero%20empezar%20con%20Facilia%20Consulting",
        },
      ],
    },
    cta: {
      title: "En 3 semanas sabrás exactamente dónde se está yendo tu margen.",
      sub: "Empieza con el Diagnóstico Express: si avanzas a la Transformación, su costo se acredita al 100%.",
      btn: "Agendar mi Diagnóstico Express »",
      subject: "Diagn%C3%B3stico%20Express",
    },
    footer: { line: "© 2026 Facilia · Consultora AI-Native para la Construcción · Colombia", software: "Software" },
  },
  en: {
    nav: { method: "F.Á.C.I.L. Method", domains: "Domains", pricing: "Pricing", cta: "Book a diagnostic" },
    hero: {
      eyebrow: "AI-Native consulting firm for construction",
      h1a: "Your construction company already generates the data.",
      h1b: "We turn it into margin.",
      sub: "In 3 weeks, our AI reads your invoices, bank statements and budgets and shows you where the money is leaking. In 12, we install the system so it never happens again: operations, finance, procurement, accounting and projects.",
      cta1: "Start with the Express Diagnostic",
      cta2: "See the method »",
      foot: "Contractors and architecture firms · SMB and mid-market · Colombia",
      chips: ["Real margin detected: 9.4%", "1,842 documents read by AI", "COP 312M/yr recoverable"],
      planLabel: "F.Á.C.I.L. BLUEPRINT · SCALE 1:12 WEEKS",
    },
    pains: {
      eyebrow: "Why we exist",
      title: "The construction business is broken from the inside",
      items: [
        ["Margins that evaporate", "You quote one margin and close with another. Nobody knows which project lost the money until months later."],
        ["Procurement without control", "Orders over WhatsApp, no 3 quotes, no traceability. The business's biggest cost is its least managed."],
        ["Accounting disconnected from the site", "The close arrives late and looks backwards. Accounting doesn't talk to the budget or to real progress."],
        ["Reactive cash flow", "The liquidity gap is discovered when it's already time to borrow. Zero 13-week visibility."],
        ["Scattered data", "Excel, email, chats and paper. The information exists, but it isn't structured for decision-making."],
        ["Owners trapped in operations", "The founder approves everything and fights fires. No time left to grow the business."],
      ],
    },
    method: {
      eyebrow: "The methodology",
      title: "F.Á.C.I.L. Method — five phases, 12 weeks",
      sub: "We don't structure projects: we structure the business. Every phase leaves deliverables installed and running — not slide decks.",
      phases: [
        { l: "F", name: "360° Snapshot", time: "Weeks 1–3", desc: "AI reads your invoices, statements, budgets and contracts from the last 12–24 months. Real margin per project, cost leaks and a maturity scorecard across 5 domains." },
        { l: "Á", name: "Analysis & Architecture", time: "Weeks 3–6", desc: "Target operating model: project-level chart of accounts, procurement policy with approvals, 13-week cash flow and responsibility matrix." },
        { l: "C", name: "System Build", time: "Weeks 6–10", desc: "facilia.app at the core: budget, procurement, progress and cash in one place. SOPs, live dashboards and role-based training." },
        { l: "I", name: "Applied AI", time: "Weeks 8–12", desc: "Models in production: cash forecasting, budget-deviation alerts, supplier scoring and automatic accounting reconciliation." },
        { l: "L", name: "Leadership & Continuous Improvement", time: "Ongoing", desc: "Weekly, monthly and quarterly cadence installed in your team, with a fractional CFO/COO role. The method stays; the chaos doesn't come back." },
      ],
    },
    domains: {
      eyebrow: "The scope",
      title: "Five domains, one single source of truth",
      sub: "Structured data + AI models + facilia.app as the cross-cutting layer: every domain feeds and consumes the same information. Consulting installs the process; the software makes it permanent.",
      link: "Discover facilia.app »",
      items: [
        ["Operations", "Real progress vs plan, productivity, rework, site-office coordination."],
        ["Finance", "Margin per project, 13-week cash flow, pricing and working capital."],
        ["Procurement", "3 quotes, orders and approvals, supplier scoring."],
        ["Accounting", "Project-level accounts, close in ≤10 days, automatic reconciliation."],
        ["Projects", "Baseline budget, change control, early deviation alerts."],
      ],
    },
    score: {
      phase: "Phase F · 360° Snapshot",
      title: "Maturity scorecard",
      badge: "AI · 1,842 documents read",
      finding: "Diagnostic finding",
      f1: "Quoted margin",
      f2: "real margin",
      f3: "Main leak: purchases without compared quotes",
      f4: "/yr recoverable",
      domains: ["Operations", "Finance", "Procurement", "Accounting", "Projects"],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Three ways to work with Facilia",
      sub: "Value-based pricing, not hourly: the fee is calibrated to your business size, and the diagnostic must identify at least 5x its cost in recoverable value.",
      segLabel: "Company segment",
      smb: "SMB (COP 1–10B)",
      mid: "Mid-market (COP 10–50B)",
      featured: "Flagship project",
      vat: "VAT not included",
      formula: "Quoting formula: segment base price × complexity factor (0.8–1.3) based on simultaneous projects, users and data maturity.",
      plans: [
        {
          tag: "01 · Entry point", name: "Express Diagnostic", time: "2–3 weeks", note: "fixed price",
          bullets: ["360° AI snapshot of your real data", "Maturity scorecard across the 5 domains", "Top 10 quick wins with business case", "100% credited toward the Transformation if you sign within 30 days"],
          cta: "Book the diagnostic", subject: "I%20want%20to%20start%20with%20Facilia%20Consulting",
        },
        {
          tag: "02 · Flagship project", name: "F.Á.C.I.L. Transformation", time: "12 weeks", note: "milestone payments: F 20% · Á 25% · C 35% · I 20%",
          bullets: ["The full method, from diagnostic to AI in production", "facilia.app implemented and included during the project", "Trained team and dashboards with live data", "Optional success fee: 10% of verified procurement savings"],
          cta: "Talk to Facilia", subject: "I%20want%20to%20start%20with%20Facilia%20Consulting",
        },
        {
          tag: "03 · Recurring", name: "Continuous Improvement Partner", time: "Monthly · 6-month min.", note: "retainer + facilia.app subscription",
          bullets: ["Monthly finance committee and operating cadence", "Fractional CFO/COO role for your business", "1 new AI use case every quarter", "facilia.app subscription included"],
          cta: "Learn about the retainer", subject: "I%20want%20to%20start%20with%20Facilia%20Consulting",
        },
      ],
    },
    cta: {
      title: "In 3 weeks you'll know exactly where your margin is going.",
      sub: "Start with the Express Diagnostic: if you move on to the Transformation, its cost is 100% credited.",
      btn: "Book my Express Diagnostic »",
      subject: "Express%20Diagnostic",
    },
    footer: { line: "© 2026 Facilia · AI-Native Consulting for Construction · Colombia", software: "Software" },
  },
} as const;

const PRICES = [
  { smb: "COP 12M", mid: "COP 25M" },
  { smb: "COP 85M", mid: "COP 160M" },
  { smb: "COP 6.5M/mes", mid: "COP 14M/mes" },
];
const PRICES_EN = [
  { smb: "COP 12M", mid: "COP 25M" },
  { smb: "COP 85M", mid: "COP 160M" },
  { smb: "COP 6.5M/mo", mid: "COP 14M/mo" },
];

const SCORECARD = [
  { v: 2.1, w: "42%" },
  { v: 1.6, w: "32%" },
  { v: 1.2, w: "24%" },
  { v: 2.4, w: "48%" },
  { v: 1.9, w: "38%" },
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
      <div className="chevron-track flex w-max gap-4">
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

/* ============ Isometric construction scene (signature) ============ */

function IsoTower({ phases, planLabel }: { phases: ReadonlyArray<{ l: string; name: string }>; planLabel: string }) {
  // isometric geometry
  const A = 104; // half width
  const B = 52; // half depth rise (2:1 iso)
  const H = 42; // floor height
  const GAP = 9;
  const BASE_Y = 392;
  const CX = 40;

  const floors = phases.map((p, i) => {
    const yc = BASE_Y - i * (H + GAP) - H - B;
    return { ...p, yc, i };
  });

  return (
    <svg viewBox="-300 -40 640 560" className="h-auto w-full" role="img" aria-label="Isometric construction tower — F.Á.C.I.L.">
      <defs>
        <linearGradient id="faceR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2EC98E" />
          <stop offset="100%" stopColor="#0B5C44" />
        </linearGradient>
        <linearGradient id="faceL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D2C38" />
          <stop offset="100%" stopColor="#121C26" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2EC98E" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#2EC98E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground glow */}
      <ellipse className="glow-pulse" cx={CX} cy={BASE_Y + 34} rx="250" ry="64" fill="url(#glow)" />

      {/* iso ground grid */}
      <g stroke="#2EC98E" strokeOpacity="0.16" strokeWidth="1" fill="none" aria-hidden>
        <polygon points={`${CX},${BASE_Y - B + 4} ${CX + A + 78},${BASE_Y + 36} ${CX},${BASE_Y + B + 76} ${CX - A - 78},${BASE_Y + 36}`} />
        <polygon points={`${CX},${BASE_Y - B + 26} ${CX + A + 34},${BASE_Y + 36} ${CX},${BASE_Y + B + 54} ${CX - A - 34},${BASE_Y + 36}`} />
      </g>

      {/* crane (construction amber) */}
      <g className="floor" style={{ animationDelay: "0.9s" }}>
        <g stroke="#FFB14D" strokeWidth="3" fill="none" strokeLinecap="round">
          {/* mast */}
          <line x1="-218" y1={BASE_Y + 30} x2="-218" y2="44" />
          <line x1="-196" y1={BASE_Y + 30} x2="-196" y2="44" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="-218" y1={70 + i * 40} x2="-196" y2={44 + i * 40} strokeWidth="2" strokeOpacity="0.85" />
          ))}
        </g>
        {/* jib + cable, gentle sway */}
        <g className="crane-arm" style={{ transformOrigin: "-207px 44px" }}>
          <g stroke="#FFB14D" strokeWidth="3" strokeLinecap="round" fill="none">
            <line x1="-238" y1="44" x2="118" y2="44" />
            <line x1="-207" y1="14" x2="-118" y2="44" strokeWidth="2" />
            <line x1="-207" y1="14" x2="60" y2="44" strokeWidth="2" />
            <line x1="-207" y1="14" x2="-207" y2="44" strokeWidth="2" />
            <line x1="-238" y1="44" x2="-258" y2="64" strokeWidth="2" />
          </g>
          {/* hook + lifted block */}
          <g className="hook">
            <line x1="86" y1="44" x2="86" y2="96" stroke="#FFB14D" strokeWidth="2" />
            <rect x="74" y="96" width="24" height="22" rx="3" fill="#2EC98E" />
            <rect x="74" y="96" width="24" height="22" rx="3" fill="none" stroke="#16202A" strokeOpacity="0.3" />
          </g>
        </g>
      </g>

      {/* floors, bottom to top */}
      {floors.map((f) => (
        <g key={f.l + f.i} className="floor" style={{ animationDelay: `${0.18 + f.i * 0.16}s` }}>
          {/* left face */}
          <polygon points={`${CX - A},${f.yc} ${CX},${f.yc + B} ${CX},${f.yc + B + H} ${CX - A},${f.yc + H}`} fill="url(#faceL)" />
          {/* right face */}
          <polygon
            points={`${CX + A},${f.yc} ${CX},${f.yc + B} ${CX},${f.yc + B + H} ${CX + A},${f.yc + H}`}
            fill="url(#faceR)"
            opacity={0.45 + f.i * 0.14}
          />
          {/* top face */}
          <polygon
            points={`${CX},${f.yc - B} ${CX + A},${f.yc} ${CX},${f.yc + B} ${CX - A},${f.yc}`}
            fill={f.i === floors.length - 1 ? "#2EC98E" : "#D9F5EA"}
            opacity={f.i === floors.length - 1 ? 1 : 0.16 + f.i * 0.1}
            stroke="#2EC98E"
            strokeOpacity="0.35"
          />
          {/* window slits on left face */}
          {[0, 1, 2].map((w) => (
            <line
              key={w}
              x1={CX - A + 18 + w * 28}
              y1={f.yc + 12 + ((18 + w * 28) * B) / A / 2}
              x2={CX - A + 18 + w * 28}
              y2={f.yc + H - 6 + ((18 + w * 28) * B) / A / 2}
              stroke="#2EC98E"
              strokeOpacity="0.4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}

      {/* blueprint callouts: letter per floor */}
      {floors.map((f) => (
        <g key={"c" + f.l + f.i} className="callout" style={{ animationDelay: `${1.1 + f.i * 0.12}s` }}>
          <line x1={CX + A + 4} y1={f.yc + H / 2 + B / 2} x2={CX + A + 46} y2={f.yc + H / 2 + B / 2} stroke="#2EC98E" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx={CX + A + 4} cy={f.yc + H / 2 + B / 2} r="3" fill="#2EC98E" />
          <text x={CX + A + 56} y={f.yc + H / 2 + B / 2 + 6} fontFamily="Sora, sans-serif" fontWeight="800" fontSize="22" fill="#2EC98E">
            {f.l}
          </text>
          <text x={CX + A + 80} y={f.yc + H / 2 + B / 2 + 5} fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#9FB8AC" className="hidden sm:[display:initial]">
            {f.name}
          </text>
        </g>
      ))}

      {/* plan title block */}
      <g className="callout" style={{ animationDelay: "1.7s" }} fontFamily="IBM Plex Mono, monospace">
        <rect x="-292" y={BASE_Y + 64} width="300" height="30" fill="none" stroke="#2EC98E" strokeOpacity="0.35" />
        <text x="-280" y={BASE_Y + 84} fontSize="10.5" letterSpacing="1.5" fill="#9FB8AC">
          {planLabel}
        </text>
      </g>
    </svg>
  );
}

function HeroScene({ t }: { t: (typeof T)[Lang] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * 7).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="scene relative" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref} className="scene-inner relative">
        <IsoTower phases={t.method.phases} planLabel={t.hero.planLabel} />
        {/* floating AI data chips */}
        <div className="chip-float absolute left-0 top-[12%] rounded-lg border border-emerald2/30 bg-ink2/90 px-3 py-2 font-mono text-[11px] text-emerald2 shadow-lg backdrop-blur" style={{ animationDelay: "0.4s" }}>
          {t.hero.chips[1]}
        </div>
        <div className="chip-float absolute bottom-[30%] left-[2%] rounded-lg border border-white/15 bg-ink2/90 px-3 py-2 font-mono text-[11px] text-white/85 shadow-lg backdrop-blur" style={{ animationDelay: "1.4s" }}>
          {t.hero.chips[0]}
        </div>
        <div className="chip-float absolute right-0 top-[4%] rounded-lg border border-amber-300/30 bg-ink2/90 px-3 py-2 font-mono text-[11px] text-amber-200 shadow-lg backdrop-blur" style={{ animationDelay: "2.2s" }}>
          {t.hero.chips[2]}
        </div>
      </div>
    </div>
  );
}

/* ================= page ================= */

export default function Page() {
  useReveal();
  const [lang, setLang] = useState<Lang>("es");
  const [seg, setSeg] = useState<"smb" | "mid">("smb");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("facilia-lang") as Lang | null) : null;
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("facilia-lang", lang);
    } catch {}
  }, [lang]);

  const t = T[lang];
  const prices = lang === "es" ? PRICES : PRICES_EN;

  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          <a href="#" className="flex items-center gap-2" aria-label="Facilia">
            <Image src="/facilia_dark.png" alt="Facilia" width={118} height={23} priority />
            <span className="hidden rounded-full bg-emerald2/15 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald2 sm:inline">consulting</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex">
            <a href="#metodo" className="transition hover:text-white">{t.nav.method}</a>
            <a href="#dominios" className="transition hover:text-white">{t.nav.domains}</a>
            <a href="#precios" className="transition hover:text-white">{t.nav.pricing}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-white/15 p-0.5" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setLang(k)}
                  aria-pressed={lang === k}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold uppercase transition ${
                    lang === k ? "bg-emerald2 text-ink" : "text-white/55 hover:text-white"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <a href="#precios" className="btn-glow hidden rounded-lg bg-emerald2 px-4 py-2 text-sm font-semibold text-ink sm:block">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      {/* HERO — dark blueprint */}
      <section className="blueprint relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-emerald2/10 blur-[120px]" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="rise mb-5 inline-flex items-center gap-2 rounded-full border border-emerald2/30 bg-emerald2/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald2" style={{ animationDelay: "0.05s" }}>
              <span aria-hidden>»</span> {t.hero.eyebrow}
            </p>
            <h1 className="rise font-display text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]" style={{ fontWeight: 800, animationDelay: "0.15s" }}>
              {t.hero.h1a} <span className="text-emerald2">{t.hero.h1b}</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/65" style={{ animationDelay: "0.3s" }}>
              {t.hero.sub}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
              <a href="#precios" className="btn-glow rounded-xl bg-emerald2 px-6 py-3.5 font-semibold text-ink">
                {t.hero.cta1}
              </a>
              <a href="#metodo" className="font-semibold text-emerald2 underline decoration-emerald2/50 decoration-2 underline-offset-4 transition hover:text-white">
                {t.hero.cta2}
              </a>
            </div>
            <p className="rise mt-6 font-mono text-xs text-white/40" style={{ animationDelay: "0.6s" }}>
              {t.hero.foot}
            </p>
          </div>

          <HeroScene t={t} />
        </div>
      </section>

      <ChevronDivider />

      {/* SCORECARD + PAINS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Scorecard artifact */}
          <div className="reveal rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(22,32,42,0.35)] lg:sticky lg:top-24">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink/45">{t.score.phase}</p>
                <p className="font-display text-lg font-bold">{t.score.title}</p>
              </div>
              <span className="rounded-md bg-mint px-2.5 py-1 font-mono text-[11px] font-medium text-deep">{t.score.badge}</span>
            </div>
            <div className="space-y-3.5">
              {SCORECARD.map((r, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{t.score.domains[i]}</span>
                    <span className="font-mono text-ink/55">{r.v.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-ink/6" role="img" aria-label={`${t.score.domains[i]}: ${r.v} / 5`}>
                    <div className="bar h-full rounded-full bg-gradient-to-r from-emerald2 to-deep" style={{ "--w": r.w, "--d": `${0.12 * i}s` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-ink p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-emerald2">{t.score.finding}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/85">
                {t.score.f1} <span className="font-mono text-emerald2">18%</span> → {t.score.f2}{" "}
                <span className="font-mono text-red-300">9.4%</span>. {t.score.f3} (<span className="font-mono">COP 312M</span>
                {t.score.f4}).
              </p>
            </div>
          </div>

          {/* Pains */}
          <div>
            <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.pains.eyebrow}</p>
            <h2 className="reveal mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
              {t.pains.title}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.pains.items.map(([ti, d], i) => (
                <div key={ti} className="reveal lift rounded-xl border border-ink/8 bg-white p-5" style={{ "--d": `${0.05 * i}s` } as React.CSSProperties}>
                  <span className="text-deep" aria-hidden>»</span>
                  <h3 className="mt-2 font-display text-base font-bold">{ti}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section id="metodo" className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald2">{t.method.eyebrow}</p>
          <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
            {t.method.title}
          </h2>
          <p className="reveal mt-4 max-w-2xl text-white/60" style={{ "--d": "0.16s" } as React.CSSProperties}>
            {t.method.sub}
          </p>

          <div className="mt-10 hidden gap-1.5 lg:flex" aria-hidden>
            {t.method.phases.map((p, i) => (
              <div
                key={p.l}
                className={`${i === 0 ? "chev-first" : "chev"} reveal flex h-16 flex-1 items-center justify-center font-display text-2xl font-extrabold transition-transform duration-300 hover:-translate-y-1`}
                style={{ background: i === 4 ? "#2EC98E" : `rgba(46,201,142,${0.18 + i * 0.16})`, color: i === 4 ? "#16202A" : "#fff", "--d": `${0.07 * i}s` } as React.CSSProperties}
              >
                {p.l}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {t.method.phases.map((p, i) => (
              <div key={p.name} className="reveal lift lift-dark rounded-xl border border-white/10 bg-ink2 p-5" style={{ "--d": `${0.06 * i}s` } as React.CSSProperties}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl font-extrabold text-emerald2">{p.l}</span>
                  <span className="font-mono text-[11px] text-white/45">{p.time}</span>
                </div>
                <h3 className="mt-2 font-display text-[15px] font-bold leading-snug">{p.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMINIOS */}
      <section id="dominios" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.domains.eyebrow}</p>
            <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
              {t.domains.title}
            </h2>
            <p className="reveal mt-4 leading-relaxed text-ink/60" style={{ "--d": "0.16s" } as React.CSSProperties}>
              {t.domains.sub}
            </p>
            <a href="https://facilia.app" className="reveal mt-6 inline-block font-semibold text-deep underline decoration-emerald2 decoration-2 underline-offset-4 hover:text-ink" style={{ "--d": "0.24s" } as React.CSSProperties}>
              {t.domains.link}
            </a>
          </div>
          <ol className="space-y-4">
            {t.domains.items.map(([ti, d], i) => (
              <li key={ti} className="reveal lift flex gap-4 rounded-xl border border-ink/8 bg-white p-5" style={{ "--d": `${0.07 * i}s` } as React.CSSProperties}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink font-display font-bold text-emerald2">{i + 1}</span>
                <div>
                  <h3 className="font-display font-bold">{ti}</h3>
                  <p className="mt-1 text-sm text-ink/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ChevronDivider />

      {/* PRICING */}
      <section id="precios" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="reveal font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">{t.pricing.eyebrow}</p>
            <h2 className="reveal mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl" style={{ "--d": "0.08s" } as React.CSSProperties}>
              {t.pricing.title}
            </h2>
            <p className="reveal mt-3 max-w-xl text-ink/60" style={{ "--d": "0.16s" } as React.CSSProperties}>
              {t.pricing.sub}
            </p>
          </div>
          <div className="reveal flex rounded-xl border border-ink/10 bg-white p-1" role="tablist" aria-label={t.pricing.segLabel}>
            {(["smb", "mid"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={seg === k}
                onClick={() => setSeg(k)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${seg === k ? "bg-ink text-white" : "text-ink/55 hover:text-ink"}`}
              >
                {k === "smb" ? t.pricing.smb : t.pricing.mid}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => {
            const featured = i === 1;
            return (
              <div
                key={p.name}
                className={`reveal lift relative flex flex-col rounded-2xl border p-7 ${
                  featured ? "lift-dark border-deep bg-ink text-white shadow-[0_28px_70px_-28px_rgba(11,92,68,0.55)]" : "border-ink/8 bg-white"
                }`}
                style={{ "--d": `${0.08 * i}s` } as React.CSSProperties}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-emerald2 px-3 py-1 font-mono text-[11px] font-semibold text-ink">
                    {t.pricing.featured}
                  </span>
                )}
                <p className={`font-mono text-[11px] uppercase tracking-wider ${featured ? "text-emerald2" : "text-deep"}`}>{p.tag}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                <p className={`mt-1 text-sm ${featured ? "text-white/55" : "text-ink/50"}`}>{p.time}</p>
                <p className="mt-5 font-display text-4xl font-extrabold tracking-tight">{seg === "smb" ? prices[i].smb : prices[i].mid}</p>
                <p className={`mt-1 text-xs ${featured ? "text-white/50" : "text-ink/45"}`}>
                  {p.note} · {t.pricing.vat}
                </p>
                <ul className={`mt-6 flex-1 space-y-3 text-sm ${featured ? "text-white/80" : "text-ink/70"}`}>
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className={featured ? "text-emerald2" : "text-deep"} aria-hidden>»</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:hola@facilia.app?subject=${p.subject}`}
                  className={`btn-glow mt-8 rounded-xl px-5 py-3 text-center font-semibold ${featured ? "bg-emerald2 text-ink hover:bg-white" : "bg-ink text-white hover:bg-deep"}`}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
        <p className="reveal mt-6 font-mono text-xs text-ink/40">{t.pricing.formula}</p>
      </section>

      {/* CTA */}
      <section className="blueprint bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Image src="/facilia_dark.png" alt="" width={150} height={30} className="mx-auto" />
          <h2 className="reveal mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-white/55" style={{ "--d": "0.1s" } as React.CSSProperties}>
            {t.cta.sub}
          </p>
          <a
            href={`mailto:hola@facilia.app?subject=${t.cta.subject}`}
            className="btn-glow reveal mt-8 inline-block rounded-xl bg-emerald2 px-8 py-4 font-semibold text-ink"
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            {t.cta.btn}
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-white/45">
          <p>{t.footer.line}</p>
          <div className="flex gap-6">
            <a href="https://facilia.app" className="transition hover:text-white">facilia.app</a>
            <a href="https://facilia.app/pricing" className="transition hover:text-white">{t.footer.software}</a>
            <a href="mailto:hola@facilia.app" className="transition hover:text-white">hola@facilia.app</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
