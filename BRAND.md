# Facilia.dev — Brand Manual

Manual de marca del sitio **Facilia Dev** (AI-native software studio, hecho en Latinoamérica).
Todos los valores aquí reflejan lo que realmente usa la web (`app/globals.css`, `tailwind.config.ts`,
`app/layout.tsx`, `app/icon.svg`, `public/`). Estética: **minimalismo tipo 21st.dev** — mucho aire,
alto contraste, un solo acento de color.

---

## 1. Esencia

- **Nombre:** Facilia Dev · se escribe también **Facilia.dev**.
- **Lockup en UI:** wordmark `facilia` + badge `dev` (píldora verde).
- **Posicionamiento:** *"World-class software, engineered in Latam."*
- **Promesa:** *"Facilia.dev helps ambitious teams ship AI-native products in weeks, not months."*
- **Tono:** técnico, directo, seguro, sin humo. Nunca "software factory tradicional".

---

## 2. Logo

Tres activos en `public/` + `app/`:

| Activo | Archivo | Fondo | Uso |
|---|---|---|---|
| Wordmark claro (blanco) | `public/facilia_dark.png` | **oscuro** | Nav y footer en tema dark |
| Wordmark oscuro (negro) | `public/facilia_light.png` | **claro** | Nav y footer en tema light |
| Símbolo (chevron) | `app/icon.svg` | cualquiera | Favicon, apple-icon, OG image |

- El wordmark = **chevron doble `»`** + la palabra **facilia** (minúscula, geométrica).
- **Cambio automático por tema:** el componente `Logo` muestra el wordmark blanco en dark y el negro en light.
- **Badge `dev`:** píldora con borde y relleno verde translúcido, texto verde, en `font-mono`, minúscula.

### Clear space & tamaño
- Aire mínimo alrededor del lockup ≈ la altura del chevron.
- Tamaño nav: ~116×23 px. Tamaño CTA final: ~150×30 px. No usar por debajo de ~90 px de ancho.

### No hacer
- No recolorear el wordmark (solo blanco o negro según fondo).
- No aplicar el wordmark blanco sobre fondos claros (ni viceversa).
- No estirar, rotar ni añadir sombras/contornos.
- No separar la palabra del chevron con otro contenido entre medias.

---

## 3. El chevron `»` (símbolo de marca)

Doble chevron que apunta a la derecha = **avance, velocidad, "shipping"**. Es el elemento gráfico
recurrente de la marca.

### Construcción del símbolo (SVG, `app/icon.svg`)
- Dos trazos: `M8 10 L22 24 L8 38` y `M26 10 L40 24 L26 38`, `viewBox="0 0 48 48"`.
- `stroke-width: 7`, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Gradiente verde:** `#4ADE80` → `#10B981` (diagonal). En algunos usos los dos chevrons van en
  colores planos: `#4ADE80` (claro) y `#10B981` (oscuro).

### Dónde se usa el chevron
- **Favicon / app icon / imagen social.**
- **Glifo `»`** como prefijo de "eyebrows" y viñetas (color acento).
- **Agent loop** de la sección *How we build* (formas chevron: `Plan » Generate » Review » Ship`).
- **Watermark** decorativo tenue en tarjetas (`»` gigante a ~3% de opacidad).

---

## 4. Color

Sistema de **tokens semánticos** (CSS variables en `app/globals.css`), con tema **dark (default)** y
**light**. En Tailwind se exponen como `background / card / foreground / muted / border / accent`.

### Tema oscuro (default)
| Token | Rol | HEX | RGB |
|---|---|---|---|
| `--bg` | Fondo base | `#09090B` | 9 9 11 |
| `--card` | Superficie / tarjetas | `#121215` | 18 18 21 |
| `--fg` | Texto principal | `#F5F5F6` | 245 245 246 |
| `--muted` | Texto secundario | `#96969F` | 150 150 159 |
| `--border` | Bordes / hairlines | `#26262B` | 38 38 43 |
| `--accent` | **Acento de marca (verde)** | `#2EC98E` | 46 201 142 |
| `--accent-contrast` | Texto sobre acento | `#09140F` | 9 20 15 |

### Tema claro
| Token | Rol | HEX | RGB |
|---|---|---|---|
| `--bg` | Fondo base | `#FFFFFF` | 255 255 255 |
| `--card` | Superficie / tarjetas | `#FAFAFA` | 250 250 250 |
| `--fg` | Texto principal | `#111113` | 17 17 19 |
| `--muted` | Texto secundario | `#71717A` | 113 113 122 |
| `--border` | Bordes / hairlines | `#E4E4E7` | 228 228 231 |
| `--accent` | **Acento de marca (verde)** | `#059669` | 5 150 105 |
| `--accent-contrast` | Texto sobre acento | `#FFFFFF` | 255 255 255 |

### Verdes de marca (símbolo/gradientes)
- Verde claro: `#4ADE80` · Verde medio: `#10B981` · Verde acento UI (dark): `#2EC98E`.

### Regla de uso del color (importante)
- El fondo casi-negro / blanco y los grises hacen el 95% del trabajo. **El verde es un acento, no un relleno.**
- Verde **solo** en: palabra destacada del headline, eyebrows, badge `dev`, estados activos, enlaces,
  chevrons/viñetas, números de acento, `✓` del terminal.
- **Botones primarios = neutros** (texto sobre `foreground`, es decir blanco/negro alto contraste), no verdes.
- Contraste AA: `foreground` sobre `bg`, y `muted` para texto secundario. `accent-contrast` sobre `accent`.

---

## 5. Tipografía

**Una sola familia** de marca + monoespaciada de sistema.

### Principal — General Sans
- **Origen:** Fontshare — `https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap`
- **Token Tailwind `font-sans`:** `["General Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif]`
- **Pesos y uso:**
  | Peso | Nombre | Uso |
  |---|---|---|
  | 400 | Regular | Cuerpo, párrafos, `muted` |
  | 500 | Medium | Títulos grandes (H1/H2), stats, botones |
  | 600 | Semibold | Títulos de tarjeta (H3), nombres de producto |
  | 300 / 700 | Light / Bold | Disponibles para casos puntuales |
- **Tracking:** títulos con **tracking negativo** — `-0.02em` (H2) a `-0.03em` (H1). Cuerpo normal.
- **Interlineado:** headings ~1.05; cuerpo ~1.6 (relajado).

### Datos y código — Monoespaciada de sistema
- **Token `font-mono`:** `[ui-monospace, SFMono-Regular, Menlo, Consolas, monospace]` (sin fuente custom).
- **Uso:** eyebrows (mayúsculas, `tracking-[0.2em]`), chips del stack, terminal del hero, badge `dev`,
  labels de datos, barras de URL de los mockups.

### Escala tipográfica (referencia)
- H1 hero: `text-4xl → sm:text-5xl → lg:[3.7rem]`, weight 500.
- H2 sección: `text-3xl → sm:text-4xl`, weight 500.
- H3 tarjeta: `~15–20px`, weight 600.
- Cuerpo: `text-lg` (hero sub) / base; secundario en `muted`.
- Eyebrow / mono: `text-xs`, mayúsculas, `tracking-[0.2em]`, color acento.

> ⚠️ **Excepción:** la imagen social (`app/opengraph-image.tsx`) usa la sans por defecto de `next/og`,
> **no** General Sans (embeber la woff es opcional/pendiente).

---

## 6. Tokens de UI

- **Radio:** base `0.5rem` (`rounded-lg`); tarjetas `rounded-xl`; píldoras `rounded-full`.
- **Bordes:** 1px `--border` (hairlines). Separación de secciones con `border-t border-border`.
- **Superficies:** `bg-card` sobre `bg-background`; nav sticky con `bg-background/80` + `backdrop-blur`.
- **Botones:**
  - Primario: `bg-foreground text-background`, hover `opacity-90`.
  - Secundario: `border border-border`, hover borde/acento.
- **Movimiento:** entradas sutiles (fade + translateY), Ken Burns en screenshots, tilt 3D en mockups,
  marquees continuos, fondo animado de puntos (three.js). Todo respeta `prefers-reduced-motion`.
- **Easing de marca:** `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 7. Voz y contenido

- Directo y con confianza; frases cortas. Bilingüe **EN (default) / ES**.
- Palabras clave: *AI-native, agentic, ship, production-ready, Latam, weeks not months*.
- Evitar: jerga vacía, "software factory", promesas genéricas.

---

*Fuente de verdad: el código del repo. Si cambian los tokens en `app/globals.css` o `tailwind.config.ts`,
actualizar este documento.*
