"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/products";
import type { ProductOption, ProductVariant } from "@/lib/shopify-product";
import { cn } from "@/lib/cn";

/**
 * Varianten-Auswahl + Preis + Kauf-Button (client-seitig, weil die Auswahl
 * Preis und Checkout-Link verändert). Headless-Checkout wie überall via
 * /api/checkout?variant=<id>.
 */
export function ProductPurchase({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const firstAvailable = variants.find((v) => v.available) ?? variants[0];

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(firstAvailable.options.map((o) => [o.name, o.value])),
  );

  const selectedVariant = useMemo(() => {
    if (options.length === 0) return firstAvailable;
    return (
      variants.find((v) =>
        v.options.every((o) => selected[o.name] === o.value),
      ) ?? firstAvailable
    );
  }, [options.length, variants, selected, firstAvailable]);

  // Ist ein Optionswert (kombiniert mit den übrigen aktuellen Optionen) kaufbar?
  function valueAvailable(optionName: string, value: string): boolean {
    return variants.some(
      (v) =>
        v.available &&
        v.options.every((o) =>
          o.name === optionName ? o.value === value : selected[o.name] === o.value,
        ),
    );
  }

  const checkoutHref = `/api/checkout?variant=${selectedVariant.id}`;
  const buyable = selectedVariant.available;

  return (
    <div>
      <div className="flex items-end gap-3">
        <span className="text-h2 font-extrabold text-moss">
          {formatPrice(selectedVariant.price)}
        </span>
        <span className="pb-1 text-h8 text-ink/50">inkl. MwSt.</span>
      </div>

      {options.length > 0 && (
        <div className="mt-6 space-y-5">
          {options.map((option) => (
            <fieldset key={option.name}>
              <legend className="text-h8 font-semibold text-ink">
                {option.name}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const active = selected[option.name] === value;
                  const enabled = valueAvailable(option.name, value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      disabled={!enabled}
                      onClick={() =>
                        setSelected((s) => ({ ...s, [option.name]: value }))
                      }
                      className={cn(
                        "rounded-full border px-4 py-2 text-h8 font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss",
                        active
                          ? "border-moss bg-moss text-soft"
                          : "border-moss/25 bg-soft text-moss hover:border-moss",
                        !enabled &&
                          "cursor-not-allowed border-ink/15 bg-soft-2 text-ink/35 line-through hover:border-ink/15",
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button
          href={buyable ? checkoutHref : "#"}
          aria-disabled={!buyable}
          className={cn("sm:flex-1", !buyable && "pointer-events-none opacity-60")}
        >
          {buyable ? "Jetzt kaufen" : "Nicht verfügbar"}
        </Button>
        <Button href="/#abholen" variant="outline">
          Abholort ansehen
        </Button>
      </div>
    </div>
  );
}
