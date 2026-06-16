import { cache } from "react";
import {
  hasShopify,
  idFromGid,
  isPickupable,
  metafieldLines,
  SHOP_URL,
  storefront,
  turnaround,
} from "@/lib/shopify-client";
import { getCatalog } from "@/lib/shopify-catalog";
import { ALL_PRODUCTS } from "@/lib/products";

export type ProductVariant = {
  id: string;
  title: string;
  price: number;
  available: boolean;
  options: { name: string; value: string }[];
};

export type ProductOption = { name: string; values: string[] };

export type ProductDetail = {
  handle: string;
  title: string;
  descriptionHtml: string;
  price: number;
  currency: string;
  available: boolean;
  turnaround: string;
  sampleMaterial?: string;
  biomarkers: string[];
  images: { url: string; alt: string }[];
  shopUrl: string;
  /** Auswählbare Optionen (z. B. "Blutabnahme"). Leer, wenn nur Standardvariante. */
  options: ProductOption[];
  /** Alle Kaufvarianten. */
  variants: ProductVariant[];
  /** Live-Abholverfügbarkeit am Standort Taubenstraße 26. */
  pickup?: { available: boolean; readyTime?: string };
};

type GqlVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  selectedOptions: { name: string; value: string }[];
};

type GqlDetail = {
  product: {
    handle: string;
    title: string;
    descriptionHtml: string;
    availableForSale: boolean;
    tags: string[];
    options: { name: string; values: string[] }[];
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants: { edges: { node: GqlVariantNode }[] };
    pickupVariant: {
      edges: {
        node: {
          storeAvailability: {
            edges: { node: { available: boolean; pickUpTime: string | null } }[];
          };
        };
      }[];
    };
    images: { edges: { node: { url: string; altText: string | null } }[] };
    sampleMaterial: { value: string } | null;
    biomarkers: { value: string } | null;
    abholbar: { value: string } | null;
  } | null;
};

const QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      handle title descriptionHtml availableForSale tags
      options { name values }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 50) { edges { node {
        id title availableForSale
        price { amount }
        selectedOptions { name value }
      } } }
      pickupVariant: variants(first: 1) { edges { node {
        storeAvailability(first: 5) { edges { node { available pickUpTime } } }
      } } }
      images(first: 6) { edges { node { url altText } } }
      sampleMaterial: metafield(namespace: "custom", key: "sample_material") { value }
      biomarkers: metafield(namespace: "custom", key: "biomarkers") { value }
      abholbar: metafield(namespace: "custom", key: "abholbar") { value }
    }
  }
`;

/** Shopify-Default-Optionen ("Title" / "Default Title") ausblenden. */
function isRealOption(o: { name: string; values: string[] }): boolean {
  if (o.name.toLowerCase() === "title") return false;
  if (o.values.length === 1 && o.values[0] === "Default Title") return false;
  return true;
}

export const getProduct = cache(
  async (handle: string): Promise<ProductDetail | null> => {
    if (!hasShopify) return null;

    const data = await storefront<GqlDetail>(QUERY, { handle });
    const p = data?.product;
    if (!p) return null;
    // Nicht zur Abholung freigegeben → auf der Pick-up-Seite nicht erreichbar.
    if (!isPickupable(p.abholbar?.value)) return null;

    const variants: ProductVariant[] = p.variants.edges.map((e) => ({
      id: idFromGid(e.node.id),
      title: e.node.title,
      price: Math.round(Number(e.node.price.amount)),
      available: e.node.availableForSale,
      options: e.node.selectedOptions,
    }));
    if (variants.length === 0) return null;

    const pickupNode =
      p.pickupVariant.edges[0]?.node.storeAvailability?.edges[0]?.node;
    const pickup = pickupNode
      ? {
          available: pickupNode.available,
          readyTime: translateReadyTime(pickupNode.pickUpTime),
        }
      : undefined;

    const sampleMaterial = p.sampleMaterial?.value?.trim() || undefined;
    const images = p.images.edges.map((e) => ({
      url: e.node.url,
      alt: e.node.altText ?? `${p.title} Heimtest`,
    }));

    return {
      handle: p.handle,
      title: p.title,
      descriptionHtml: p.descriptionHtml ?? "",
      price: Math.round(Number(p.priceRange.minVariantPrice.amount)),
      currency: p.priceRange.minVariantPrice.currencyCode,
      available: p.availableForSale,
      turnaround: turnaround(p.tags, sampleMaterial),
      sampleMaterial,
      biomarkers: metafieldLines(p.biomarkers?.value),
      images,
      shopUrl: `${SHOP_URL}/products/${p.handle}`,
      options: (p.options ?? []).filter(isRealOption),
      variants,
      pickup,
    };
  },
);

/** Shopify liefert pickUpTime auf Englisch – grob ins Deutsche übersetzen. */
function translateReadyTime(time: string | null): string | undefined {
  if (!time) return undefined;
  const m = time.match(/(\d+)\s*hour/i);
  if (m) return `meist in ${m[1]} Std. abholbereit`;
  if (/ready/i.test(time)) return "abholbereit";
  return time;
}

/** Handles aller kuratierten Produkte – für generateStaticParams. */
export const getCatalogHandles = cache(async (): Promise<string[]> => {
  if (!hasShopify) return ALL_PRODUCTS.map((p) => p.id);
  const cats = await getCatalog();
  return [...new Set(cats.flatMap((c) => c.products.map((p) => p.id)))];
});
