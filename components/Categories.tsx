import { getCatalog } from "@/lib/shopify-catalog";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function Categories() {
  const CATEGORIES = await getCatalog();

  return (
    <section id="tests" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-green">
            Unsere Testkits
          </p>
          <h2 className="mt-3 max-w-3xl text-h2 font-extrabold text-ink">
            Für (fast) jede Frage an deinen Körper der passende Test.
          </h2>
        </Reveal>

        {/* Kategorie-Schnellnavigation */}
        <Reveal delay={0.05}>
          <nav
            aria-label="Test-Kategorien"
            className="mt-8 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-moss/20 bg-soft px-4 py-2 text-h8 font-medium text-moss transition-colors hover:bg-moss hover:text-soft"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="mt-16 space-y-20">
          {CATEGORIES.map((category) => (
            <div
              key={category.slug}
              id={category.slug}
              className="scroll-mt-28"
            >
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-5">
                  <div>
                    <h3 className="text-h3 font-extrabold text-moss">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-h7 text-ink/60">{category.tagline}</p>
                  </div>
                  {category.collectionUrl ? (
                    <a
                      href={category.collectionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-h8 font-medium text-moss underline-offset-4 hover:underline"
                    >
                      Alle {category.totalCount ?? category.products.length} Tests
                      ansehen →
                    </a>
                  ) : (
                    <span className="text-h8 text-ink/45">
                      {category.products.length} Tests
                    </span>
                  )}
                </div>
              </Reveal>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product, i) => (
                  <Reveal key={product.id} delay={(i % 3) * 0.06}>
                    <ProductCard product={product} accent={category.accent} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
