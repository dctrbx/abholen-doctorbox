# DoctorBox – Abhol-Landingpage

Landingpage, die Kund:innen erklärt, dass sie ihr Heimtestkit direkt bei
DoctorBox in der **Taubenstraße 26, 10117 Berlin** abholen können. Tests sind
nach Kategorie gelistet und führen über **Shopify (headless)** direkt zum Checkout.

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** (CSS-first `@theme`, Marken-Tokens)
- **Geist** Font (`next/font`)
- **motion** (Scroll-Reveals) + **lenis** (smooth scroll), beide mit
  `prefers-reduced-motion`-Fallback

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Shopify-Domain/Token eintragen (optional)
npm run dev                  # http://localhost:3000
npm run build && npm start   # Production
```

## Shopify Headless (live angebunden)

Kategorien **und** Produkte werden live aus dem Shop `shop.doctorbox.eu` gezogen
(Storefront API). Zugang in `.env.local`:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=shop.doctorbox.eu
SHOPIFY_STOREFRONT_TOKEN=<storefront-token>
```

- **Katalog** (`lib/shopify-catalog.ts`): holt die in `CURATED` definierten
  Kollektionen in EINER GraphQL-Anfrage (kein Waterfall, `React.cache()`,
  ISR `revalidate: 3600`). Welche Kategorien in welcher Reihenfolge/Akzentfarbe
  erscheinen, steuerst du dort. Fällt ohne Token auf den statischen Katalog
  (`lib/products.ts`) zurück.
- **Checkout** (`lib/shopify.ts` + `app/api/checkout/route.ts`): Kauf-Button →
  `GET /api/checkout?variant=<id>`. Mit Token wird ein echter Warenkorb erstellt
  und auf die signierte Checkout-URL weitergeleitet; ohne Token Fallback auf
  Cart-Permalink (`/cart/<variantId>:1`).

> Der Storefront-Token ist als öffentlicher Token konzipiert (für Browser-Nutzung
> gedacht), wird hier aber serverseitig verwendet. `.env.local` ist gitignored.

## Struktur

```
app/            layout, page, api/checkout
components/      Sektionen + ui/ (Client-Inseln)
lib/            shopify-catalog.ts (Live-Katalog), shopify.ts (Checkout),
                products.ts (Typen + statischer Fallback), cn.ts
public/         brand-shapes.svg (Marken-Symbole aus Formen.svg)
```

## UI-Regeln

Siehe **[AGENTS.md](./AGENTS.md)** – bei jeder UI-Änderung sind die drei
Design-Skills verbindlich anzuwenden.
