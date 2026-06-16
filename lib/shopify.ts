/**
 * Shopify Headless – Checkout-Layer.
 *
 * Zwei Pfade, beide ohne Frontend-Round-Trip:
 *  1. Storefront API (wenn SHOPIFY_STOREFRONT_TOKEN gesetzt): erstellt einen
 *     Cart und gibt die offizielle, signierte `checkoutUrl` zurück.
 *  2. Fallback: Shopify Cart-Permalink `/cart/{variantId}:{qty}` – funktioniert
 *     ohne API-Token und springt direkt in Warenkorb/Checkout.
 *
 * Server-only (Token darf nie ins Bundle). Genutzt von app/api/checkout/route.ts.
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "doctorbox.myshopify.com";
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-01";

/** Direkter Cart-Permalink – immer verfügbar, kein Token nötig. */
export function cartPermalink(variantId: string, quantity = 1): string {
  return `https://${DOMAIN}/cart/${variantId}:${quantity}`;
}

/** GID-Form, die die Storefront API erwartet. */
function toGid(variantId: string): string {
  return variantId.startsWith("gid://")
    ? variantId
    : `gid://shopify/ProductVariant/${variantId}`;
}

type CartCreateResponse = {
  data?: {
    cartCreate?: {
      cart?: { checkoutUrl?: string };
      userErrors?: { message: string }[];
    };
  };
  errors?: { message: string }[];
};

/**
 * Erstellt via Storefront API einen Warenkorb und gibt die checkoutUrl zurück.
 * Liefert `null`, wenn kein Token konfiguriert ist oder ein Fehler auftritt –
 * der Aufrufer fällt dann auf den Permalink zurück.
 */
export async function createCheckoutUrl(
  variantId: string,
  quantity = 1,
): Promise<string | null> {
  if (!TOKEN) return null;

  // Warenkorb wird als Abholung in der Taubenstraße 26 markiert:
  // - `attributes` erscheinen strukturiert auf der Bestellung
  // - `note` ist für das Backend/Erfüllung sichtbar
  // Local Pickup ist im Shop für diesen Standort aktiv, daher wird „Abholen"
  // im Checkout automatisch als Versandart angeboten.
  const query = /* GraphQL */ `
    mutation cartCreate(
      $lines: [CartLineInput!]!
      $attributes: [AttributeInput!]
      $note: String
    ) {
      cartCreate(
        input: { lines: $lines, attributes: $attributes, note: $note }
      ) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `;

  try {
    const res = await fetch(
      `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: {
            lines: [{ merchandiseId: toGid(variantId), quantity }],
            attributes: [
              { key: "Erfüllung", value: "Abholung im Büro" },
              { key: "Abholort", value: "Taubenstraße 26, 10117 Berlin" },
              { key: "Quelle", value: "Abhol-Landingpage" },
            ],
            note: "Abholung im DoctorBox-Büro, Taubenstraße 26, 10117 Berlin (Berlin-Mitte).",
          },
        }),
        // Checkout-URLs sind nutzerspezifisch → nie cachen.
        cache: "no-store",
      },
    );

    if (!res.ok) return null;
    const json = (await res.json()) as CartCreateResponse;
    const url = json.data?.cartCreate?.cart?.checkoutUrl;
    return url ?? null;
  } catch {
    return null;
  }
}
