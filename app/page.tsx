"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------- data ---------- */

const PAINS = [
  ["Márgenes que se evaporan", "Se cotiza con un margen y se cierra con otro. Nadie sabe en qué proyecto se perdió la plata hasta meses después."],
  ["Compras sin control", "Órdenes por WhatsApp, sin 3 cotizaciones, sin trazabilidad. El mayor costo del negocio es el menos gestionado."],
  ["Contabilidad desconectada de la obra", "El cierre llega tarde y mira hacia atrás. La contabilidad no habla con el presupuesto ni con el avance real."],
  ["Caja reactiva", "El hueco de liquidez se descubre cuando ya toca pedir prestado. Cero visibilidad a 13 semanas."],
  ["Datos dispersos", "Excel, correo, chats y papel. La información existe, pero no está estructurada para decidir."],
  ["Dueños atrapados en la operación", "El fundador aprueba todo y apaga incendios. No queda tiempo para crecer el negocio."],
];

const PHASES = [
  { l: "F", name: "Fotografía 360°", time: "Semanas 1–3", desc: "La IA lee tus facturas, extractos, presupuestos y contratos de los últimos 12–24 meses. Margen real por proyecto, fugas de costo y scorecard de madurez en 5 dominios." },
  { l: "Á", name: "Análisis y Arquitectura", time: "Semanas 3–6", desc: "Modelo operativo objetivo: plan de cuentas por proyecto, política de compras con aprobaciones, flujo de caja a 13 semanas y matriz de responsabilidades." },
  { l: "C", name: "Construcción del Sistema", time: "Semanas 6–10", desc: "facilia.app como núcleo: presupuesto, compras, avance y caja en un solo lugar. SOPs, tableros en vivo y capacitación por rol." },
  { l: "I", name: "IA Aplicada", time: "Semanas 8–12", desc: "Modelos en producción: predicción de caja, alertas de desviación de presupuesto, scoring de proveedores y conciliación contable automática." },
  { l: "L", name: "Liderazgo y Mejora Continua", time: "Continuo", desc: "Cadencia semanal, mensual y trimestral instalada en tu equipo, con rol de CFO/COO fraccional. El método queda; el caos no vuelve." },
];

const DOMAINS = [
  ["Operación", "Avance real vs plan, productividad, retrabajos, coordinación obra-oficina."],
  ["Finanzas", "Margen por proyecto, caja a 13 semanas, pricing y capital de trabajo."],
  ["Compras", "3 cotizaciones, órdenes y aprobaciones, scoring de proveedores."],
  ["Contabilidad", "Cuentas por proyecto, cierre en ≤10 días, conciliación automática."],
  ["Proyectos", "Presupuesto base, control de cambios, desviaciones tempranas."],
];

const PLANS = [
  {
    tag: "01 · Puerta de entrada",
    name: "Diagnóstico Express",
    time: "2–3 semanas",
    smb: "COP 12M",
    mid: "COP 25M",
    note: "precio fijo",
    bullets: [
      "Fotografía 360° con IA sobre tus datos reales",
      "Scorecard de madurez en los 5 dominios",
      "Top 10 quick wins con business case",
      "Se acredita 100% a la Transformación si firmas en 30 días",
    ],
    cta: "Agendar diagnóstico",
    featured: false,
  },
  {
    tag: "02 · Proyecto insignia",
    name: "Transformación F.Á.C.I.L.",
    time: "12 semanas",
    smb: "COP 85M",
    mid: "COP 160M",
    note: "pago por hitos: F 20% · Á 25% · C 35% · I 20%",
    bullets: [
      "El método completo, de diagnóstico a IA en producción",
      "facilia.app implementado e incluido durante el proyecto",
      "Equipo capacitado y tableros con datos en vivo",
      "Success fee opcional: 10% del ahorro verificado en compras",
    ],
    cta: "Hablar con Facilia",
    featured: true,
  },
  {
    tag: "03 · Recurrente",
    name: "Socio de Mejora Continua",
    time: "Mensual · mín. 6 meses",
    smb: "COP 6.5M/mes",
    mid: "COP 14M/mes",
    note: "retainer + suscripción facilia.app",
    bullets: [
      "Comité financiero mensual y cadencia operativa",
      "Rol de CFO/COO fraccional para tu negocio",
      "1 nuevo caso de uso de IA cada trimestre",
      "Suscripción a facilia.app incluida",
    ],
    cta: "Conocer el retainer",
    featured: false,
  },
];

const SCORECARD = [
  { d: "Operación", v: 2.1, w: "42%" },
  { d: "Finanzas", v: 1.6, w: "32%" },
  { d: "Compras", v: 1.2, w: "24%" },
  { d: "Contabilidad", v: 2.4, w: "48%" },
  { d: "Proyectos", v: 1.9, w: "38%" },
];

/* ---------- helpers ---------- */

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

/* ---------- page ---------- */

export default function Page() {
  useReveal();
  const [seg, setSeg] = useState<"smb" | "mid">("smb");
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#" className="flex items-center gap-2" aria-label="Facilia, inicio">
            <Image src="/facilia_light.png" alt="Facilia" width={118} height={23} priority />
            <span className="hidden rounded-full bg-mint px-2.5 py-0.5 font-mono text-[11px] font-medium text-deep sm:inline">consulting</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
            <a href="#metodo" className="hover:text-ink">Método F.Á.C.I.L.</a>
            <a href="#dominios" className="hover:text-ink">Dominios</a>
            <a href="#precios" className="hover:text-ink">Precios</a>
          </div>
          <a href="#precios" className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink2">
            Agendar diagnóstico
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-deep/15 bg-mint px-3.5 py-1.5 font-mono text-xs font-medium text-deep">
            <span aria-hidden>»</span> Consultora AI-Native para la construcción
          </p>
          <h1 className="font-display text-4xl font-800 leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]" style={{ fontWeight: 800 }}>
            Tu constructora ya genera los datos.{" "}
            <span className="text-deep">Nosotros los convertimos en margen.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            En 3 semanas, nuestra IA lee tus facturas, extractos y presupuestos y te muestra dónde se está perdiendo la plata.
            En 12, instalamos el sistema para que no vuelva a pasar: operación, finanzas, compras, contabilidad y proyectos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#precios" className="rounded-xl bg-deep px-6 py-3.5 font-semibold text-white shadow-lg shadow-deep/20 transition hover:bg-ink">
              Empezar con el Diagnóstico Express
            </a>
            <a href="#metodo" className="font-semibold text-deep underline decoration-emerald2 decoration-2 underline-offset-4 hover:text-ink">
              Ver el método »
            </a>
          </div>
          <p className="mt-6 font-mono text-xs text-ink/45">
            Contratistas y firmas de arquitectura · SMB y mid-market · Colombia
          </p>
        </div>

        {/* Scorecard artifact */}
        <div className="reveal in rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(22,32,42,0.35)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink/45">Fase F · Fotografía 360°</p>
              <p className="font-display text-lg font-bold">Scorecard de madurez</p>
            </div>
            <span className="rounded-md bg-mint px-2.5 py-1 font-mono text-[11px] font-medium text-deep">IA · 1,842 documentos leídos</span>
          </div>
          <div className="space-y-3.5">
            {SCORECARD.map((r, i) => (
              <div key={r.d}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{r.d}</span>
                  <span className="font-mono text-ink/55">{r.v.toFixed(1)} / 5.0</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink/6" role="img" aria-label={`${r.d}: ${r.v} de 5`}>
                  <div className="bar-anim h-full rounded-full bg-gradient-to-r from-emerald2 to-deep" style={{ width: r.w, animationDelay: `${0.15 * i}s` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-ink p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-emerald2">Hallazgo del diagnóstico</p>
            <p className="mt-1 text-sm leading-relaxed text-white/85">
              Margen cotizado <span className="font-mono text-emerald2">18%</span> → margen real{" "}
              <span className="font-mono text-red-300">9.4%</span>. Principal fuga: compras sin cotización comparada
              (<span className="font-mono">COP 312M</span>/año recuperables).
            </p>
          </div>
        </div>
      </section>

      <ChevronDivider />

      {/* PAINS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">Por qué existimos</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          El negocio de construir está roto por dentro
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map(([t, d]) => (
            <div key={t} className="reveal rounded-xl border border-ink/8 bg-white p-6">
              <span className="text-deep" aria-hidden>»</span>
              <h3 className="mt-2 font-display text-base font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTODO */}
      <section id="metodo" className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald2">La metodología</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Método F.Á.C.I.L. — cinco fases, 12 semanas
          </h2>
          <p className="mt-4 max-w-2xl text-white/60">
            No estructuramos proyectos: estructuramos el negocio. Cada fase deja entregables instalados y operando, no presentaciones.
          </p>

          <div className="mt-10 hidden gap-1.5 lg:flex" aria-hidden>
            {PHASES.map((p, i) => (
              <div
                key={p.l}
                className={`${i === 0 ? "chev-first" : "chev"} flex h-16 flex-1 items-center justify-center font-display text-2xl font-extrabold`}
                style={{ background: i === 4 ? "#2EC98E" : `rgba(46,201,142,${0.18 + i * 0.16})`, color: i === 4 ? "#16202A" : "#fff" }}
              >
                {p.l}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {PHASES.map((p) => (
              <div key={p.name} className="reveal rounded-xl border border-white/10 bg-ink2 p-5">
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
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">El alcance</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Cinco dominios, una sola fuente de verdad
            </h2>
            <p className="mt-4 leading-relaxed text-ink/60">
              Datos estructurados + modelos de IA + facilia.app como capa transversal: cada dominio alimenta y consume la misma información. La consultoría instala el proceso; el software lo hace permanente.
            </p>
            <a href="https://facilia.app" className="mt-6 inline-block font-semibold text-deep underline decoration-emerald2 decoration-2 underline-offset-4 hover:text-ink">
              Conocer facilia.app »
            </a>
          </div>
          <ol className="space-y-4">
            {DOMAINS.map(([t, d], i) => (
              <li key={t} className="reveal flex gap-4 rounded-xl border border-ink/8 bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink font-display font-bold text-emerald2">{i + 1}</span>
                <div>
                  <h3 className="font-display font-bold">{t}</h3>
                  <p className="mt-1 text-sm text-ink/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ChevronDivider />

      {/* PRICING */}
      <section id="precios" ref={pricingRef} className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-deep">Precios</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tres formas de trabajar con Facilia
            </h2>
            <p className="mt-3 max-w-xl text-ink/60">
              Precio por valor, no por horas: el fee se calibra al tamaño de tu negocio y el diagnóstico debe identificar al menos 5x su costo en valor recuperable.
            </p>
          </div>
          <div className="flex rounded-xl border border-ink/10 bg-white p-1" role="tablist" aria-label="Segmento de empresa">
            {(["smb", "mid"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={seg === k}
                onClick={() => setSeg(k)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${seg === k ? "bg-ink text-white" : "text-ink/55 hover:text-ink"}`}
              >
                {k === "smb" ? "SMB (1–10 mil M)" : "Mid-market (10–50 mil M)"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col rounded-2xl border p-7 ${
                p.featured ? "border-deep bg-ink text-white shadow-[0_28px_70px_-28px_rgba(11,92,68,0.55)]" : "border-ink/8 bg-white"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-emerald2 px-3 py-1 font-mono text-[11px] font-semibold text-ink">
                  Proyecto insignia
                </span>
              )}
              <p className={`font-mono text-[11px] uppercase tracking-wider ${p.featured ? "text-emerald2" : "text-deep"}`}>{p.tag}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.featured ? "text-white/55" : "text-ink/50"}`}>{p.time}</p>
              <p className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                {seg === "smb" ? p.smb : p.mid}
              </p>
              <p className={`mt-1 text-xs ${p.featured ? "text-white/50" : "text-ink/45"}`}>{p.note} · sin IVA</p>
              <ul className={`mt-6 flex-1 space-y-3 text-sm ${p.featured ? "text-white/80" : "text-ink/70"}`}>
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className={p.featured ? "text-emerald2" : "text-deep"} aria-hidden>»</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hola@facilia.app?subject=Quiero%20empezar%20con%20Facilia%20Consulting"
                className={`mt-8 rounded-xl px-5 py-3 text-center font-semibold transition ${
                  p.featured ? "bg-emerald2 text-ink hover:bg-white" : "bg-ink text-white hover:bg-deep"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-ink/40">
          Fórmula de cotización: precio base del segmento × factor de complejidad (0.8–1.3) según proyectos simultáneos, usuarios y madurez de datos.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Image src="/facilia_dark.png" alt="" width={150} height={30} className="mx-auto" />
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            En 3 semanas sabrás exactamente dónde se está yendo tu margen.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">
            Empieza con el Diagnóstico Express: si avanzas a la Transformación, su costo se acredita al 100%.
          </p>
          <a
            href="mailto:hola@facilia.app?subject=Diagn%C3%B3stico%20Express"
            className="mt-8 inline-block rounded-xl bg-emerald2 px-8 py-4 font-semibold text-ink transition hover:bg-white"
          >
            Agendar mi Diagnóstico Express »
          </a>
        </div>
      </section>

      <footer className="border-t border-ink/8 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink/50">
          <p>© 2026 Facilia · Consultora AI-Native para la Construcción · Colombia</p>
          <div className="flex gap-6">
            <a href="https://facilia.app" className="hover:text-ink">facilia.app</a>
            <a href="https://facilia.app/pricing" className="hover:text-ink">Software</a>
            <a href="mailto:hola@facilia.app" className="hover:text-ink">hola@facilia.app</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
