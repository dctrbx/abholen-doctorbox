/** Gemeinsamer Storefront-API-Client (server-only). */

export const SHOPIFY_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "shop.doctorbox.eu";
export const SHOP_URL = `https://${SHOPIFY_DOMAIN}`;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-01";

export const hasShopify = Boolean(TOKEN);

/**
 * Führt eine Storefront-GraphQL-Anfrage aus. Gibt `null` zurück, wenn kein
 * Token gesetzt ist oder ein Fehler auftritt (Aufrufer entscheidet über
 * Fallback). `revalidate` = ISR-Fenster in Sekunden.
 */
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 3600,
): Promise<T | null> {
  if (!TOKEN) return null;
  try {
    const res = await fetch(`${SHOP_URL}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T; errors?: unknown };
    return json.data ?? null;
  } catch {
    return null;
  }
}

/** Numerische Variant-/Produkt-ID aus der GID extrahieren. */
export function idFromGid(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

/**
 * Metafield-Liste → bereinigte Einzelwerte. Trennt an Zeilenumbrüchen,
 * Kommas und Semikolons (Biomarker stehen oft als Kommaliste in einer Zeile),
 * entfernt Aufzählungszeichen und Duplikate.
 */
export function metafieldLines(value: string | null | undefined): string[] {
  if (!value) return [];
  const parts = value
    .split(/[\r\n,;]+/)
    .map((s) => s.replace(/^[-•·\s]+/, "").trim())
    .filter(Boolean);
  return [...new Set(parts)];
}

/**
 * Ist ein Produkt zur Abholung freigegeben?
 * Steuerung über das Shopify-Metafield `custom.abholung` (Boolean).
 * Standard = abholbar; nur explizit auf „false" gesetzte Produkte werden auf der
 * Pick-up-Seite komplett ausgeblendet (Kategorien, Suche, Detailseite).
 */
export function isPickupable(value: string | null | undefined): boolean {
  const v = (value ?? "").trim().toLowerCase();
  return !["false", "0", "no", "nein", "off", "nicht abholbar"].includes(v);
}

/** Erster aussagekräftiger Satz als Kurzbeschreibung. */
export function toBlurb(desc: string, max = 120): string {
  const clean = desc.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const firstSentence = clean.split(/(?<=[.!?])\s/)[0];
  const base = firstSentence.length <= max ? firstSentence : clean;
  return base.length > max ? base.slice(0, max - 1).trimEnd() + "…" : base;
}

/** Grobe Befundzeit anhand der Test-Art (Tags + Probenmaterial). */
export function turnaround(tags: string[], sampleMaterial?: string): string {
  const t = tags.map((x) => x.toLowerCase());
  const s = (sampleMaterial ?? "").toLowerCase();
  if (t.includes("dna")) return "in 10–14 Tagen";
  if (t.some((x) => x.includes("mikrobiom")) || s.includes("stuhl"))
    return "in 10–14 Tagen";
  if (t.includes("sti") || t.some((x) => x.includes("sexuell")))
    return "in 2–3 Tagen";
  return "in 72 h";
}
