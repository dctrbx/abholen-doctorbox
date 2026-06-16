# DoctorBox – Abhol-Landingpage · Agent- & UI-Regeln

Next.js (App Router) + Tailwind v4 Landingpage. Kunden klären, dass Heimtestkits
direkt in der **Taubenstraße 26, Berlin-Mitte** abgeholt werden können; Checkout
läuft headless über Shopify.

## ⚠️ Verbindliche Regel bei JEDER UI-Änderung

Bei **jeder** Änderung an der Oberfläche (Komponenten, Styles, Layout, Copy,
Animationen) sind die folgenden drei Skills anzuwenden – nicht optional:

1. **frontend-design** — https://www.skills.sh/anthropics/skills/frontend-design
   - Intentionale, kohärente Designrichtung (hier: organisch-warm, Marke DoctorBox).
   - Säulen: Typografie, Farbsystem (CSS-Variablen), Motion, räumliche Komposition,
     texturale Details. Keine generischen „AI-Layouts“, keine Klischee-Fonts.

2. **vercel-react-best-practices** —
   https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
   - Request-Waterfalls vermeiden, paralleles Fetching, `React.cache()`.
   - Server Components als Default; `"use client"` nur wo nötig (Inseln).
   - Re-Renders vermeiden (Memoization, stabile Dependencies), Bundle klein halten,
     nur `transform`/`opacity` animieren.

3. **web-design-guidelines** (Vercel Web Interface Guidelines) —
   https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines
   Konkrete Regeln, die hier gelten:
   - `<button>` für Aktionen, `<a>`/`<Link>` für Navigation. Nie `<div onClick>`.
   - Sichtbarer Fokus über `:focus-visible`. Icon-Buttons brauchen `aria-label`.
   - Dekorative Icons `aria-hidden="true"`; Bilder mit `alt` (oder `alt=""`).
   - Bilder/iframes mit expliziter `width`/`height` (kein Layout-Shift).
   - Flex-Kinder mit Textabschnitt brauchen `min-w-0`, Overflow via `truncate`/
     `line-clamp`/`break-words`.
   - `prefers-reduced-motion` respektieren; nie `transition: all`.
   - Formulare: passende `type`, `autocomplete`, klickbare `<label>`.
   - Ellipsis `…`, typografische Anführungszeichen, geschützte Leerzeichen in Maßen.

> Workflow: Vor UI-Arbeit die drei Skills laden/anwenden, danach gegen die
> Web Interface Guidelines gegenprüfen.

## Designsystem (Quelle: DoctorBox Styleguide)

Farben (siehe `app/globals.css`, Tailwind-`@theme`):

| Token        | HEX       | Verwendung                     |
|--------------|-----------|--------------------------------|
| `soft`       | #F7F1E9   | Standard-Hintergrund (Creme)   |
| `lind`       | #CBDFC6   | helles Grün / Flächen          |
| `moss`       | #0E4D2F   | **Primär** (Logo, CTAs)        |
| `green`      | #0E834B   | Signal / Akzente               |
| `turquoise`  | #7EC3A1   | sekundärer Akzent              |
| `blue`       | #122137   | dunkle Sektionen               |
| `okker`      | #ECD3A8   | Sand-Akzent                    |
| `ink`        | #141310   | Text (warmes Schwarz)          |

Typo-Skala H1–H8 als fluide `--text-*`-Tokens (`text-display`, `text-h1` … `text-h8`).
Font: **Geist** (via `next/font`, `geist`-Paket). Radius-Marke: `--radius-brand`.

## Architektur

- `app/` – App Router (`layout.tsx`, `page.tsx`, `tests/[handle]/page.tsx`
  Produkt-Detailseite [SSG+ISR], `[legal]/page.tsx` Rechtsseiten,
  `api/checkout/route.ts`, `api/search-index/route.ts`).
- **Rechtstexte**: verbatim aus shop.doctorbox.de in `content/legal/*.html`
  (Storefront-API-Policies + Impressum von der Policy-Seite); Loader `lib/legal.ts`,
  Routen /impressum /datenschutz /agb /widerruf /versand. Zum Aktualisieren die
  HTML-Dateien neu ziehen.
- **Cookie-Consent** (`components/CookieConsent.tsx`): DSGVO Opt-in, granulare
  Kategorien, Einwilligung in localStorage; über Footer-Button (`cookie:open`-Event)
  änderbar; Status unter `window.dbConsent` + `cookie:change`-Event für künftige
  Analytics/Marketing-Skripte (vor Einwilligung NICHTS laden).
- `components/` – Sektionen (Server-Komponenten) + `ui/` (Client-Inseln:
  `Reveal`, `SmoothScroll`, `Button`).
- `lib/shopify-catalog.ts` – **Live-Katalog** aus Shopify (`shop.doctorbox.eu`,
  Storefront API). Kuratierte Kollektionen in EINER Query, `React.cache()`,
  ISR `revalidate: 3600`. Kategorien/Reihenfolge/Akzent in `CURATED` pflegen.
- `lib/products.ts` – Typen + statischer Fallback-Katalog (greift ohne Token).
- `lib/shopify-product.ts` – Einzelprodukt für die Detailseite (descriptionHtml,
  Bilder, Metafields). `lib/shopify-client.ts` – gemeinsamer Storefront-Client.
- `lib/shopify.ts` – Headless-Checkout (Storefront API → `checkoutUrl`, sonst
  Cart-Permalink-Fallback). Token nur serverseitig (`SHOPIFY_STOREFRONT_TOKEN`).
- **Metafields**: `custom.sample_material` (Probenmaterial) + `custom.biomarkers`
  (multi_line → Liste) werden in Karten und Detailseite genutzt.
- **Suche**: `lib/shopify-search.ts` baut einen Index aller Produkte (inkl.
  Biomarker); `app/api/search-index/route.ts` liefert ihn (ISR). `components/
  Search.tsx` (Header, ⌘K) durchsucht intelligent Titel + Biomarker + Kategorie
  (akzent-/case-insensitiv, Token-Scoring).

## Konventionen

- Inhalt auf Deutsch, Markenton: klar, warm, vertrauensvoll.
- Mobile-first und voll responsiv testen (Header-Burger, Grids, Karte).
- Tests/Kategorien kommen LIVE aus Shopify – Auswahl/Reihenfolge in
  `lib/shopify-catalog.ts` (`CURATED`) steuern, nicht hartkodieren.
- Marken-Symbole stammen aus `public/brand-shapes.svg` → `components/Shapes.tsx`.
