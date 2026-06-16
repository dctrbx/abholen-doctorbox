/**
 * Produktkatalog für die Abhol-Landingpage.
 *
 * Jedes Produkt verweist über `shopifyVariantId` (numerische Variant-ID aus
 * Shopify) auf den Checkout. Der Kauf-Button leitet auf `/api/checkout`, das
 * serverseitig entweder einen echten Shopify-Warenkorb erstellt (Storefront
 * API, wenn Token gesetzt) oder auf den Cart-Permalink zurückfällt.
 *
 * → Für den Echtbetrieb hier nur die `shopifyVariantId` je Produkt eintragen.
 */

export type Accent = "moss" | "green" | "turquoise" | "blue" | "okker";

export type Product = {
  id: string;
  name: string;
  /** Was wird getestet – ein knapper Nutzen-Satz. */
  blurb: string;
  /** Preis in EUR (Anzeige). */
  price: number;
  /** Numerische Shopify Variant-ID. */
  shopifyVariantId: string;
  /** Befundzeit, z. B. "in 24–48 h". */
  turnaround: string;
  /** Optionales Label. */
  badge?: string;
  popular?: boolean;
  /** Produktbild (Shopify CDN). */
  image?: string;
  imageAlt?: string;
  /** Interne Detailseite (/tests/<handle>). */
  productUrl?: string;
  /** Metafield custom.sample_material, z. B. "Kapillarblut". */
  sampleMaterial?: string;
  /** Metafield custom.biomarkers (Zeilen → Liste). */
  biomarkers?: string[];
  /** Hat auswählbare Varianten (z. B. Blutabnahme-Methode) → Auswahl nötig. */
  hasOptions?: boolean;
};

export type Category = {
  slug: string;
  title: string;
  tagline: string;
  accent: Accent;
  products: Product[];
  /** Link zur vollständigen Kollektion im Shop. */
  collectionUrl?: string;
  /** Gesamtanzahl Tests in dieser Kollektion (falls > angezeigte). */
  totalCount?: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "vitamine-naehrstoffe",
    title: "Vitamine & Nährstoffe",
    tagline: "Zeig deinem Körper, was ihm fehlt.",
    accent: "green",
    products: [
      {
        id: "vitd",
        name: "Vitamin-D-Test",
        blurb: "Der Klassiker für graue Monate – misst deinen 25-OH-Spiegel.",
        price: 39,
        shopifyVariantId: "40000000000001",
        turnaround: "in 24–48 h",
        popular: true,
      },
      {
        id: "b12",
        name: "Vitamin-B12-Test",
        blurb: "Wichtig bei veganer Ernährung und chronischer Müdigkeit.",
        price: 39,
        shopifyVariantId: "40000000000002",
        turnaround: "in 24–48 h",
      },
      {
        id: "ferritin",
        name: "Eisen & Ferritin",
        blurb: "Deckt versteckten Eisenmangel auf – die häufigste Ursache für Erschöpfung.",
        price: 44,
        shopifyVariantId: "40000000000003",
        turnaround: "in 24–48 h",
      },
      {
        id: "omega3",
        name: "Omega-3-Index",
        blurb: "Bewertet dein Fettsäure-Verhältnis für Herz und Gehirn.",
        price: 59,
        shopifyVariantId: "40000000000004",
        turnaround: "in 3–5 Tagen",
      },
    ],
  },
  {
    slug: "hormone",
    title: "Hormone & Stoffwechsel",
    tagline: "Balance, die man messen kann.",
    accent: "moss",
    products: [
      {
        id: "thyroid",
        name: "Schilddrüsen-Check",
        blurb: "TSH, fT3 und fT4 – für Energie, Gewicht und Stimmung.",
        price: 59,
        shopifyVariantId: "40000000000011",
        turnaround: "in 24–48 h",
        popular: true,
      },
      {
        id: "testo",
        name: "Testosteron-Test",
        blurb: "Antrieb, Muskelaufbau und Libido im Blick.",
        price: 49,
        shopifyVariantId: "40000000000012",
        turnaround: "in 24–48 h",
      },
      {
        id: "cortisol",
        name: "Cortisol (Stress)",
        blurb: "Misst dein Stresshormon über den Tagesverlauf.",
        price: 54,
        shopifyVariantId: "40000000000013",
        turnaround: "in 3–5 Tagen",
      },
      {
        id: "meno",
        name: "Wechseljahre-Profil",
        blurb: "Östradiol & FSH – Klarheit in der hormonellen Umstellung.",
        price: 64,
        shopifyVariantId: "40000000000014",
        turnaround: "in 3–5 Tagen",
      },
    ],
  },
  {
    slug: "sexuelle-gesundheit",
    title: "Sexuelle Gesundheit",
    tagline: "Diskret, gründlich, ohne Wartezimmer.",
    accent: "turquoise",
    products: [
      {
        id: "sti-basis",
        name: "STI-Basis-Check",
        blurb: "Chlamydien & Gonorrhö – die zwei häufigsten Infektionen.",
        price: 49,
        shopifyVariantId: "40000000000021",
        turnaround: "in 2–3 Tagen",
        popular: true,
      },
      {
        id: "sti-plus",
        name: "STI-Komplett",
        blurb: "7 Erreger inkl. HIV, Syphilis, Hepatitis B & C.",
        price: 99,
        shopifyVariantId: "40000000000022",
        turnaround: "in 2–3 Tagen",
        badge: "Bestseller",
      },
      {
        id: "hpv",
        name: "HPV-Test",
        blurb: "Selbstabstrich zur Früherkennung von Hochrisiko-Typen.",
        price: 69,
        shopifyVariantId: "40000000000023",
        turnaround: "in 3–5 Tagen",
      },
    ],
  },
  {
    slug: "darm-unvertraeglichkeiten",
    title: "Darm & Unverträglichkeiten",
    tagline: "Die Wurzel des Wohlbefindens.",
    accent: "okker",
    products: [
      {
        id: "mikrobiom",
        name: "Darm-Mikrobiom",
        blurb: "Analysiert deine Darmflora und liefert Ernährungs-Tipps.",
        price: 99,
        shopifyVariantId: "40000000000031",
        turnaround: "in 10–14 Tagen",
        popular: true,
      },
      {
        id: "histamin",
        name: "Histamin-Intoleranz",
        blurb: "Misst den DAO-Wert bei Verdacht auf Histaminunverträglichkeit.",
        price: 54,
        shopifyVariantId: "40000000000032",
        turnaround: "in 3–5 Tagen",
      },
      {
        id: "laktose",
        name: "Laktose & Fruktose",
        blurb: "Klärt Unverträglichkeiten, die nach dem Essen Beschwerden machen.",
        price: 49,
        shopifyVariantId: "40000000000033",
        turnaround: "in 3–5 Tagen",
      },
    ],
  },
  {
    slug: "vorsorge",
    title: "Allgemeine Vorsorge",
    tagline: "Ein Rundum-Bild deiner Gesundheit.",
    accent: "blue",
    products: [
      {
        id: "blutbild",
        name: "Großes Blutbild",
        blurb: "Über 20 Werte – dein jährlicher Gesundheits-Check für zuhause.",
        price: 89,
        shopifyVariantId: "40000000000041",
        turnaround: "in 24–48 h",
        popular: true,
      },
      {
        id: "herz",
        name: "Cholesterin & Herz",
        blurb: "LDL, HDL und Triglyceride – dein kardiovaskuläres Risiko.",
        price: 49,
        shopifyVariantId: "40000000000042",
        turnaround: "in 24–48 h",
      },
      {
        id: "diabetes",
        name: "Diabetes-Vorsorge",
        blurb: "Langzeitzucker HbA1c – erkennt ein Risiko früh.",
        price: 39,
        shopifyVariantId: "40000000000043",
        turnaround: "in 24–48 h",
      },
    ],
  },
];

export const ALL_PRODUCTS: Product[] = CATEGORIES.flatMap((c) => c.products);

export function findProduct(variantId: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.shopifyVariantId === variantId);
}

export function formatPrice(eur: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(eur);
}
