# Facilia Dev — landing page

Marketing landing for **Facilia Dev**, an AI-native software studio based in Latin America.
Single-page Next.js 14 app deployed on Vercel. This repo used to be "Facilia Consulting"
(a construction-consulting site); it was rebranded to Facilia Dev in July 2026.

## What Facilia Dev is (the narrative)

A software studio that designs, builds and ships production software for **ConTech, PropTech
and InsurTech**, pairing senior Latin American engineers with agentic tools (Claude Code, Codex).
Core message: *world-class software, engineered in Latam*. Featured own products:

| Product | Sector | One-liner | URL |
|---|---|---|---|
| Facilia | ConTech | AI operating system for contractors (Cotizador APU 2026, Gantt, Finanzas) | facilia.app |
| Clinck | InsurTech / Ops | Turn records into operational decisions | clinck.io |
| Shelv | Community | Where creators launch the future of LATAM | shelv.io |
| GoQuipo | Marketplace | Buy/sell/rent professional equipment | goquipo.co (no public link yet → "Live soon") |

## Stack & structure

- **Next.js 14** (App Router) · React 18 · TypeScript · **Tailwind CSS 3**
- Everything lives in a single client component. Key files:
  - `app/page.tsx` — the whole landing (i18n data + components + sections)
  - `app/layout.tsx` — metadata/OG, font `<link>`, no-flash theme script
  - `app/globals.css` — theme tokens + animations
  - `tailwind.config.ts` — semantic colors + fonts
  - `public/facilia_dark.png` (white wordmark, for dark) · `public/facilia_light.png` (black wordmark, for light)
  - `public/projects/*.png` — product screenshots (see below)

## Design system (21st.dev-inspired minimalism)

- **Typeface:** General Sans (loaded from Fontshare in `layout.tsx`). One font for everything;
  headings are `font-medium`/`font-semibold` with tight tracking (`tracking-[-0.02em]`). Code/labels use `font-mono` (system mono).
- **Theming:** light + dark via CSS variables on `<html>` (`.dark` / `.light`). **Dark is default.**
  - Tokens in `globals.css`: `--bg --card --fg --muted --border --accent --accent-contrast` (space-separated RGB triplets).
  - Tailwind colors map to them: `bg-background text-foreground text-muted border-border bg-card text-accent`.
    Use the alpha slash syntax, e.g. `bg-accent/10`, `border-accent/50`.
  - Theme toggle lives in the **footer** (`ThemeToggle`), persists to `localStorage['facilia-theme']`.
    An inline script in `layout.tsx` sets the class before paint to avoid a flash.
- **Color usage:** green (`#2EC98E` dark / emerald-600 light) is the brand accent but used **sparingly**
  — eyebrows, the highlighted headline word, badges, active states, links, the logo. **Primary buttons are
  neutral** (`bg-foreground text-background`), 21st.dev-style. Don't make everything green.
- **Layout:** one continuous `bg-background` canvas; sections separated by hairline `border-t border-border`
  (no more alternating dark/light slabs). Cards are `border border-border bg-card rounded-xl`. Generous spacing.
- Shared class helpers near the bottom of the data block: `eyebrow`, `h2cls`, `subcls`, `btnPrimary`.

## Content & i18n

- All copy lives in the `T` object in `app/page.tsx` — `T.en` and `T.es`, `as const`. **English is default**;
  EN/ES toggle in the nav, persisted to `localStorage['facilia-lang']`. When you add/edit copy, update **both** languages.
- Sections (in order): Nav → Hero (with live "Claude Code" terminal) → tech marquee → What we build (verticals)
  → Selected work (dynamic product showcase) → How we build (agent loop + stack layers) → Why Latam →
  Engagement models (Product Studio / Embedded Squad / AI Retrofit — replaces pricing) → Final CTA → Footer.

## Product screenshots (the dynamic showcase)

- The Work section shows products in browser frames with **tilt 3D + Ken Burns + a scrolling filmstrip**.
  Facilia has 3 screens that **auto-rotate** (Cotizador → Gantt → Finanzas) with clickable tabs.
- Screenshots live in `public/projects/` with fixed names: `facilia-cotizador.png`, `facilia-gantt.png`,
  `facilia-finanzas.png`, `clinck.png`, `shelv.png`, `goquipo.png`. If a file is missing, a branded
  placeholder shows (see `useImgStatus` / `ScreenImg`). To swap a screenshot, just replace the file.

## Contacts / CTAs

- Primary CTA everywhere = **Cal.com**: `https://cal.com/javier-cristancho-oa5zrb` (constant `CAL`).
- Email: `contacto@facilia.app` (constant `MAIL`). Both defined at the top of `app/page.tsx`.

## Dev workflow

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (what Vercel runs)
```

- **Deploy:** push to `main` on GitHub (`javierpatin/facilia-consulting`) → Vercel auto-deploys production.
  For safe review, push a branch instead → Vercel makes a Preview Deploy.
- **`gh` CLI is not installed** on this machine; use plain `git`. Windows credential manager holds the GitHub auth.
- ⚠️ **Gotcha:** never run `npm run build` while `npm run dev` is running — they share `.next` and it corrupts
  (`Error: Cannot find module './819.js'`). Fix: stop dev, `rm -rf .next`, restart. Tailwind config changes
  also need a dev restart to take effect.

## Conventions

- Keep the two languages in sync. Keep the design minimal — reach for tokens (`text-muted`, `border-border`,
  `bg-card`), not new hard-coded colors. Keep green as an accent, not a fill.
- Reduced-motion is respected in `globals.css`; new animations should degrade there too.
