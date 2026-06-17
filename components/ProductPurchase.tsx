"use client";

import { useEffect, useMemo, useState } from "react";
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

  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = noteOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNoteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [noteOpen]);

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
        <button
          type="button"
          disabled={!buyable}
          onClick={() => setNoteOpen(true)}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-h7 font-semibold text-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-moss active:scale-[0.98] sm:flex-1",
            buyable
              ? "bg-moss hover:-translate-y-0.5 hover:bg-moss-700"
              : "cursor-not-allowed bg-moss/50",
          )}
        >
          {buyable ? "Jetzt kaufen" : "Nicht verfügbar"}
        </button>
        <Button href="/#abholen" variant="outline">
          Abholort ansehen
        </Button>
      </div>

      {/* Hinweis-Popup: im Checkout „Abholung" wählen, dann Weiterleitung */}
      {noteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hinweis zur Abholung"
          className="fixed inset-0 z-[110] flex items-end justify-center bg-ink/45 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setNoteOpen(false);
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-[var(--radius-brand)] bg-soft shadow-2xl">
            <div className="p-6 sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lind/50 text-moss">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                  <path
                    d="M3 8l9-5 9 5v8l-9 5-9-5V8Zm0 0l9 5 9-5M12 13v8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 className="mt-5 text-h5 font-bold text-ink">
                Fast geschafft – bitte „Abholung" wählen
              </h2>
              <p className="mt-2 text-h8 leading-relaxed text-ink/70">
                Du wirst gleich zum sicheren Checkout weitergeleitet. Wähle dort
                als Versandart{" "}
                <strong className="text-moss">„Abholung"</strong> aus – nur dann
                liegt dein Test in der Taubenstraße&nbsp;26 zur Abholung bereit
                (andernfalls wird er versendet).
              </p>

              <div className="mt-4 rounded-2xl border border-ink/10 bg-soft-2/50 p-3">
                <p className="flex items-center gap-2 text-h8 text-ink/45">
                  <span className="h-4 w-4 rounded-full border border-ink/25" />
                  Versand
                </p>
                <p className="mt-2 flex items-center gap-2 text-h8 font-semibold text-moss">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border-[5px] border-moss" />
                  Abholung · Taubenstraße&nbsp;26, Berlin
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-ink/10 p-6 sm:flex-row-reverse">
              <a
                href={checkoutHref}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-moss px-6 py-3.5 text-h8 font-semibold text-soft transition-colors hover:bg-moss-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-moss"
              >
                Weiter zum Checkout →
              </a>
              <button
                type="button"
                onClick={() => setNoteOpen(false)}
                className="rounded-full border border-moss/25 px-6 py-3.5 text-h8 font-semibold text-moss transition-colors hover:bg-moss/5"
              >
                Zurück
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
