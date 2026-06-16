import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductPurchase } from "@/components/ProductPurchase";
import { getProduct, getCatalogHandles } from "@/lib/shopify-product";
import { getAccentForProduct } from "@/lib/shopify-catalog";
import { type Accent } from "@/lib/products";
import { cn } from "@/lib/cn";

const ACCENT_BG: Record<Accent, string> = {
  moss: "bg-lind/40",
  green: "bg-lind/50",
  turquoise: "bg-turquoise/15",
  blue: "bg-blue/5",
  okker: "bg-okker/25",
};

export async function generateStaticParams() {
  const handles = await getCatalogHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Test nicht gefunden" };
  const desc = product.descriptionHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
  return {
    title: product.title,
    description: desc || `${product.title} – Heimtest bei DoctorBox abholen.`,
    openGraph: {
      title: `${product.title} · DoctorBox`,
      description: desc,
      images: product.images[0] ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const accent = await getAccentForProduct(handle);
  const hero = product.images[0];

  return (
    <>
      <Header />
      <main id="main" className="px-4 pb-8 pt-36 sm:px-6 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/#tests"
            className="inline-flex items-center gap-1.5 text-h8 font-medium text-ink/60 transition-colors hover:text-moss"
          >
            ← Alle Tests
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Bild */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-[var(--radius-brand)]",
                  ACCENT_BG[accent],
                )}
              >
                {hero && (
                  <Image
                    src={hero.url}
                    alt={hero.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-contain p-10"
                  />
                )}
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.images.slice(1, 5).map((img) => (
                    <div
                      key={img.url}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-2xl",
                        ACCENT_BG[accent],
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        sizes="120px"
                        className="object-contain p-3"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-h8">
                <span className="inline-flex items-center gap-2 rounded-full bg-moss/8 px-3 py-1 font-medium text-moss">
                  {product.turnaround}
                </span>
                {product.sampleMaterial && (
                  <span className="rounded-full bg-soft-2 px-3 py-1 text-ink/60">
                    Probenmaterial: {product.sampleMaterial}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-h2 font-extrabold text-ink">
                {product.title}
              </h1>

              {product.biomarkers.length > 0 && (
                <div className="mt-5">
                  <p className="text-h8 font-semibold text-ink/60">
                    Das wird gemessen
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {product.biomarkers.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-moss/20 bg-soft px-3 py-1.5 text-h8 text-moss"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-7">
                <ProductPurchase
                  options={product.options}
                  variants={product.variants}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-green/25 bg-lind/30 p-4">
                <p className="flex items-center gap-2 text-h8 font-semibold text-moss">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
                  </span>
                  {product.pickup?.available !== false
                    ? "Abholbereit in der Taubenstraße 26, Berlin"
                    : "Bald wieder abholbereit – Taubenstraße 26, Berlin"}
                </p>
                <p className="mt-1.5 pl-[18px] text-h8 text-ink/65">
                  {product.pickup?.readyTime
                    ? `${product.pickup.readyTime[0].toUpperCase()}${product.pickup.readyTime.slice(1)} · ohne Versandkosten · „Abholen“ im Checkout wählen.`
                    : "Ohne Versandkosten · „Abholen“ als Versandart im Checkout wählen."}
                </p>
              </div>

              {product.descriptionHtml && (
                <div className="mt-9">
                  <h2 className="text-h5 font-bold text-ink">
                    Über diesen Test
                  </h2>
                  <div
                    className="db-prose mt-4"
                    // Inhalt stammt aus dem eigenen Shopify-Shop (vertrauenswürdig).
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
