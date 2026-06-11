# Facilia Consulting — Landing Page

Landing page de la consultora AI-Native de Facilia (Método F.Á.C.I.L.), construida con Next.js 14 + Tailwind CSS. Lista para desplegar en Vercel.

## Stack
- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS 3
- Fuentes: Sora (display), Instrument Sans (body), IBM Plex Mono (datos)

## Desarrollo local
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy en Vercel (vía GitHub)
1. Crea un repositorio en GitHub (p. ej. `facilia-consulting`).
2. Sube este proyecto:
   ```bash
   git init && git add -A && git commit -m "Facilia Consulting landing"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/facilia-consulting.git
   git push -u origin main
   ```
3. En vercel.com → **Add New → Project** → importa el repo. Vercel detecta Next.js automáticamente (cero configuración).
4. Dominio sugerido: `consulting.facilia.app` (agrega el CNAME en tu DNS apuntando a `cname.vercel-dns.com`).

## Estructura
- `app/page.tsx` — landing completa (hero con scorecard, dolores, método F.Á.C.I.L., dominios, pricing con toggle SMB/Mid-market, CTA)
- `app/layout.tsx` — metadata SEO/OG y fuentes
- `public/` — logos Facilia (fondo transparente, variantes clara/oscura)

## Edición rápida
Los textos y precios viven en constantes al inicio de `app/page.tsx` (`PAINS`, `PHASES`, `DOMAINS`, `PLANS`, `SCORECARD`).
