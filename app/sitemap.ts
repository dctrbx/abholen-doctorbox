import type { MetadataRoute } from "next";
import { getCollectionHandles } from "@/lib/shopify-catalog";
import { getSearchIndex } from "@/lib/shopify-search";
import { LEGAL_SLUGS } from "@/lib/legal";

const BASE = "https://abholen.doctorbox.eu";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${BASE}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const categories: MetadataRoute.Sitemap = getCollectionHandles().map(
    (slug) => ({
      url: `${BASE}/kategorie/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  let products: MetadataRoute.Sitemap = [];
  try {
    const docs = await getSearchIndex();
    products = docs.map((d) => ({
      url: `${BASE}/tests/${d.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    products = [];
  }

  return [...staticPages, ...categories, ...products];
}
