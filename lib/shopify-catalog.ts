import { cache } from "react";
import {
  CATEGORIES as FALLBACK,
  type Accent,
  type Category,
  type Product,
} from "@/lib/products";
import {
  hasShopify,
  idFromGid,
  metafieldLines,
  SHOP_URL,
  storefront,
  toBlurb,
  turnaround,
} from "@/lib/shopify-client";

/**
 * Live-Produktkatalog aus Shopify (Storefront API).
 *
 * Holt die kuratierten Kollektionen in EINER GraphQL-Anfrage (kein Waterfall,
 * vercel-react-best-practices) und mappt sie auf die UI-Typen. `cache()`
 * dedupliziert die Anfrage innerhalb eines Requests; ISR hält die Daten
 * serverseitig frisch. Fällt bei fehlender Konfiguration/Fehler auf den
 * statischen Katalog (lib/products.ts) zurück.
 */

/** Kuratierte Kategorien: Reihenfolge, Akzentfarbe, Anzeige-Limit, Tagline. */
/** Pro Kategorie auf der Startseite angezeigte Tests. */
const PER_CATEGORY = 3;

export const CURATED: {
  handle: string;
  accent: Accent;
  tagline: string;
  limit: number;
}[] = [
  { handle: "nahrstoffe-vitamine", accent: "green", tagline: "Zeig deinem Körper, was ihm fehlt.", limit: PER_CATEGORY },
  { handle: "allgemeine-gesundheit", accent: "okker", tagline: "Dein Rundum-Check für den Alltag.", limit: PER_CATEGORY },
  { handle: "hormone", accent: "moss", tagline: "Balance, die man messen kann.", limit: PER_CATEGORY },
  { handle: "herz-kreislauf", accent: "blue", tagline: "Werte fürs Wichtigste.", limit: PER_CATEGORY },
  { handle: "energie-vitalitat", accent: "green", tagline: "Wieder voll im Saft.", limit: PER_CATEGORY },
  { handle: "longevity", accent: "turquoise", tagline: "Gesund älter werden.", limit: PER_CATEGORY },
  { handle: "sexuelle-gesundheit", accent: "turquoise", tagline: "Diskret, gründlich, ohne Wartezimmer.", limit: PER_CATEGORY },
  { handle: "frauengesundheit", accent: "green", tagline: "Tests, die Frauen wirklich weiterbringen.", limit: PER_CATEGORY },
  { handle: "mannergesundheit", accent: "moss", tagline: "Männergesundheit ohne Umwege.", limit: PER_CATEGORY },
  { handle: "kinderwunsch-fruchtbarkeit", accent: "okker", tagline: "Klarheit auf dem Weg zum Wunschkind.", limit: PER_CATEGORY },
  { handle: "dna", accent: "blue", tagline: "Was in deinen Genen steckt.", limit: PER_CATEGORY },
  { handle: "vorsorge", accent: "moss", tagline: "Früh erkennen, beruhigt leben.", limit: PER_CATEGORY },
];

type GqlProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string } };
  options: { name: string; values: string[] }[];
  variants: { edges: { node: { id: string } }[] };
  sampleMaterial: { value: string } | null;
  biomarkers: { value: string } | null;
};

type GqlCollection = {
  handle: string;
  title: string;
  products: { edges: { node: GqlProduct }[] };
} | null;

export function mapProduct(p: GqlProduct): Product | null {
  const variant = p.variants.edges[0]?.node.id;
  if (!variant) return null;
  const sampleMaterial = p.sampleMaterial?.value?.trim() || undefined;
  return {
    id: p.handle,
    name: p.title,
    blurb: toBlurb(p.description),
    price: Math.round(Number(p.priceRange.minVariantPrice.amount)),
    shopifyVariantId: idFromGid(variant),
    turnaround: turnaround(p.tags, sampleMaterial),
    popular: p.tags.map((x) => x.toLowerCase()).includes("home"),
    image: p.featuredImage?.url,
    imageAlt: p.featuredImage?.altText ?? `${p.title} Heimtest`,
    productUrl: `/tests/${p.handle}`,
    sampleMaterial,
    biomarkers: metafieldLines(p.biomarkers?.value),
    hasOptions: (p.options ?? []).some(
      (o) =>
        o.name.toLowerCase() !== "title" &&
        !(o.values.length === 1 && o.values[0] === "Default Title"),
    ),
  };
}

const PRODUCT_FIELDS = `
  id handle title description tags availableForSale
  featuredImage { url altText }
  priceRange { minVariantPrice { amount } }
  options { name values }
  variants(first: 1) { edges { node { id } } }
  sampleMaterial: metafield(namespace: "custom", key: "sample_material") { value }
  biomarkers: metafield(namespace: "custom", key: "biomarkers") { value }
`;

function buildQuery(): string {
  const parts = CURATED.map(
    (c, i) =>
      `c${i}: collection(handle: "${c.handle}") { handle title products(first: 30) { edges { node { ${PRODUCT_FIELDS} } } } }`,
  );
  return `{ ${parts.join("\n")} }`;
}

export const getCatalog = cache(async (): Promise<Category[]> => {
  if (!hasShopify) return FALLBACK;

  const data = await storefront<Record<string, GqlCollection>>(buildQuery());
  if (!data) return FALLBACK;

  const categories: Category[] = [];
  CURATED.forEach((cfg, i) => {
    const col = data[`c${i}`];
    if (!col) return;
    const all = col.products.edges
      .map((e) => mapProduct(e.node))
      .filter((p): p is Product => p !== null);
    if (all.length === 0) return;
    categories.push({
      slug: col.handle,
      title: col.title,
      tagline: cfg.tagline,
      accent: cfg.accent,
      products: all.slice(0, cfg.limit),
      totalCount: all.length,
      collectionUrl: `${SHOP_URL}/collections/${col.handle}`,
    });
  });

  return categories.length > 0 ? categories : FALLBACK;
});

/** Akzentfarbe einer Kategorie anhand des Produkt-Handles ermitteln. */
export const getAccentForProduct = cache(
  async (handle: string): Promise<Accent> => {
    const cats = await getCatalog();
    const cat = cats.find((c) => c.products.some((p) => p.id === handle));
    return cat?.accent ?? "moss";
  },
);

/** Handles aller kuratierten Kategorien (für generateStaticParams). */
export const getCollectionHandles = (): string[] =>
  CURATED.map((c) => c.handle);

/** Komplette Kollektion (ALLE Produkte) für die interne Kategorieseite. */
export const getCollection = cache(
  async (handle: string): Promise<Category | null> => {
    const cfg = CURATED.find((c) => c.handle === handle);
    if (!hasShopify) {
      return FALLBACK.find((c) => c.slug === handle) ?? null;
    }

    const query = `
      query Collection($handle: String!) {
        collection(handle: $handle) {
          handle title
          products(first: 50) { edges { node { ${PRODUCT_FIELDS} } } }
        }
      }`;
    const data = await storefront<{ collection: GqlCollection }>(query, {
      handle,
    });
    const col = data?.collection;
    if (!col) return null;

    const products = col.products.edges
      .map((e) => mapProduct(e.node))
      .filter((p): p is Product => p !== null);
    if (products.length === 0) return null;

    return {
      slug: col.handle,
      title: col.title,
      tagline: cfg?.tagline ?? "",
      accent: cfg?.accent ?? "moss",
      products,
      totalCount: products.length,
      collectionUrl: `${SHOP_URL}/collections/${col.handle}`,
    };
  },
);
