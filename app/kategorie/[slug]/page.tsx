import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { getCollection, getCollectionHandles } from "@/lib/shopify-catalog";

export function generateStaticParams() {
  return getCollectionHandles().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCollection(slug);
  if (!category) return { title: "Kategorie nicht gefunden" };
  return {
    title: `${category.title} – Tests`,
    description:
      category.tagline ||
      `Alle ${category.title}-Heimtests von DoctorBox – in Berlin abholen.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCollection(slug);
  if (!category) notFound();

  return (
    <>
      <Header />
      <main id="main" className="px-4 pb-24 pt-36 sm:px-6 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/#tests"
            className="inline-flex items-center gap-1.5 text-h8 font-medium text-ink/60 transition-colors hover:text-moss"
          >
            ← Alle Kategorien
          </Link>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-6">
              <div>
                <h1 className="text-h2 font-extrabold text-moss">
                  {category.title}
                </h1>
                {category.tagline && (
                  <p className="mt-2 text-h6 text-ink/60">{category.tagline}</p>
                )}
              </div>
              <span className="text-h8 text-ink/45">
                {category.totalCount ?? category.products.length} Tests
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 0.06}>
                <ProductCard product={product} accent={category.accent} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
