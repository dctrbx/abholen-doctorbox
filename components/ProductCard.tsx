import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product, type Accent } from "@/lib/products";
import { cn } from "@/lib/cn";

const ACCENT: Record<Accent, { dot: string; price: string; bg: string }> = {
  moss: { dot: "bg-moss", price: "text-moss", bg: "bg-lind/40" },
  green: { dot: "bg-green", price: "text-green", bg: "bg-lind/50" },
  turquoise: { dot: "bg-turquoise", price: "text-moss", bg: "bg-turquoise/15" },
  blue: { dot: "bg-blue", price: "text-blue", bg: "bg-blue/5" },
  okker: { dot: "bg-okker", price: "text-moss", bg: "bg-okker/25" },
};

export function ProductCard({
  product,
  accent,
}: {
  product: Product;
  accent: Accent;
}) {
  const a = ACCENT[accent];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-brand)] border border-ink/10 bg-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-moss/30 hover:shadow-[0_24px_50px_-30px_rgba(20,19,16,0.4)]">
      {/* Produktbild */}
      {product.image && (
        <Link
          href={product.productUrl ?? "#"}
          aria-label={`${product.name} – Details ansehen`}
          className={cn("relative block aspect-[5/4] w-full", a.bg)}
        >
          <Image
            src={product.image}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {(product.badge || product.popular) && (
            <span className="absolute left-4 top-4 rounded-full bg-moss px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-wide text-soft">
              {product.badge ?? "Beliebt"}
            </span>
          )}
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-h8 text-ink/55">
          <span className="flex items-center gap-2">
            <span
              className={cn("h-2 w-2 rounded-full", a.dot)}
              aria-hidden="true"
            />
            {product.turnaround}
          </span>
          {product.sampleMaterial && (
            <span className="rounded-full bg-soft-2 px-2.5 py-0.5 text-[0.78rem] text-ink/60">
              {product.sampleMaterial}
            </span>
          )}
        </div>

        <h4 className="text-h5 font-bold text-ink">
          {product.productUrl ? (
            <Link
              href={product.productUrl}
              className="transition-colors hover:text-moss"
            >
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h4>

        {product.blurb && (
          <p className="mt-2 line-clamp-3 text-h8 leading-relaxed text-ink/65">
            {product.blurb}
          </p>
        )}

        {product.productUrl && (
          <Link
            href={product.productUrl}
            className="mt-3 inline-flex w-fit items-center gap-1 text-h8 font-medium text-moss underline-offset-4 hover:underline"
          >
            Mehr erfahren →
          </Link>
        )}

        <div className="mt-6 flex items-end justify-between gap-3 pt-2">
          <span className={cn("text-h4 font-extrabold", a.price)}>
            {product.hasOptions && (
              <span className="mr-1 text-h8 font-medium text-ink/45">ab</span>
            )}
            {formatPrice(product.price)}
          </span>
          <Link
            href={product.productUrl ?? "#"}
            className="inline-flex items-center gap-1.5 rounded-full bg-moss px-5 py-2.5 text-h8 font-semibold text-soft transition-all duration-300 hover:bg-moss-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-moss"
          >
            Auswählen
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
