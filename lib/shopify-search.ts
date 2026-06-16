import { cache } from "react";
import {
  hasShopify,
  isPickupable,
  metafieldLines,
  storefront,
  toBlurb,
} from "@/lib/shopify-client";
import { ALL_PRODUCTS } from "@/lib/products";

/** Schlankes Such-Dokument je Produkt (an den Client ausgeliefert). */
export type SearchDoc = {
  handle: string;
  title: string;
  price: number;
  image?: string;
  category?: string;
  sampleMaterial?: string;
  biomarkers: string[];
  blurb?: string;
};

type GqlNode = {
  handle: string;
  title: string;
  productType: string | null;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: { amount: string } };
  bm: { value: string } | null;
  sm: { value: string } | null;
  ab: { value: string } | null;
};

const QUERY = `
  {
    products(first: 250) {
      edges { node {
        handle title productType description
        featuredImage { url }
        priceRange { minVariantPrice { amount } }
        bm: metafield(namespace: "custom", key: "biomarkers") { value }
        sm: metafield(namespace: "custom", key: "sample_material") { value }
        ab: metafield(namespace: "custom", key: "abholbar") { value }
      } }
    }
  }
`;

export const getSearchIndex = cache(async (): Promise<SearchDoc[]> => {
  if (!hasShopify) {
    return ALL_PRODUCTS.map((p) => ({
      handle: p.id,
      title: p.name,
      price: p.price,
      biomarkers: p.biomarkers ?? [],
      sampleMaterial: p.sampleMaterial,
      blurb: p.blurb,
    }));
  }

  const data = await storefront<{ products: { edges: { node: GqlNode }[] } }>(
    QUERY,
    {},
    3600,
  );
  if (!data) return [];

  return data.products.edges
    .filter(({ node }) => isPickupable(node.ab?.value))
    .map(({ node }) => ({
    handle: node.handle,
    title: node.title,
    price: Math.round(Number(node.priceRange.minVariantPrice.amount)),
    image: node.featuredImage?.url,
    category: node.productType || undefined,
    sampleMaterial: node.sm?.value?.trim() || undefined,
    biomarkers: metafieldLines(node.bm?.value),
    blurb: toBlurb(node.description, 90),
  }));
});
