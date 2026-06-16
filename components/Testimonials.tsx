import { Reveal } from "@/components/ui/Reveal";

/**
 * ⚠️ PLATZHALTER — vor dem Live-Gang durch ECHTE Kundenstimmen ersetzen.
 * Erfundene Bewertungen sind in DE wettbewerbswidrig (UWG). Idealerweise mit
 * echten Zitaten (Einverständnis vorausgesetzt) oder einem Trustpilot-/Google-
 * Widget befüllen. Struktur ist bewusst einfach editierbar.
 */
const TESTIMONIALS = [
  {
    quote:
      "Morgens das Kit in der Taubenstraße abgeholt, abends getestet – zwei Tage später war der Befund in der App. Genau so unkompliziert stelle ich mir das vor.",
    name: "Lena R.",
    meta: "Berlin-Mitte",
    rating: 5,
  },
  {
    quote:
      "Kein Termin, keine Wartezimmer. Die Beratung vor Ort war freundlich und hat mir die Unsicherheit komplett genommen.",
    name: "Tobias K.",
    meta: "Prenzlauer Berg",
    rating: 5,
  },
  {
    quote:
      "Ich wollte meine Eisenwerte checken, ohne wochenlang auf einen Arzttermin zu warten. Schnell, diskret und verständlich aufbereitet.",
    name: "Aylin S.",
    meta: "Kreuzberg",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={i < rating ? "h-4 w-4 text-green" : "h-4 w-4 text-ink/15"}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-green">
            Kundenstimmen
          </p>
          <h2 className="mt-3 max-w-2xl text-h2 font-extrabold text-ink">
            Tausende Wege zu mehr Klarheit – hier sind ein paar davon.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="div" key={t.name} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col rounded-[var(--radius-brand)] border border-ink/10 bg-soft p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-h7 leading-relaxed text-ink/80">
                  „{t.quote}“
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-h8 font-bold text-soft">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-h8 font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-h8 text-ink/55">{t.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
