import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const HOURS = [
  { d: "Montag – Freitag", h: "9:00 – 17:00 Uhr" },
  { d: "Samstag & Sonntag", h: "geschlossen" },
];

const FEATURES = [
  "U-Bahn Stadtmitte & Französische Straße in 3 Min.",
  "Barrierefreier Zugang",
  "Persönliche Einweisung auf Wunsch",
];

// Taubenstraße 26, 10117 Berlin
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Taubenstra%C3%9Fe+26,+10117+Berlin";
const OSM_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.3849%2C52.5106%2C13.3949%2C52.5146&layer=mapnik&marker=52.5126%2C13.3899";

export function Pickup() {
  return (
    <section
      id="abholen"
      className="scroll-mt-24 bg-blue px-4 py-20 text-soft sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-turquoise">
                Dein Abholort
              </p>
              <h2 className="mt-3 text-h2 font-extrabold">
                Mitten in Berlin.
                <br />
                Ohne Umweg über die Post.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <address className="mt-8 not-italic">
                <p className="text-h4 font-bold">DoctorBox</p>
                <p className="mt-1 text-h6 text-soft/80">
                  Taubenstraße 26
                  <br />
                  10117 Berlin-Mitte
                </p>
              </address>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 max-w-sm space-y-2">
                {HOURS.map((row) => (
                  <div
                    key={row.d}
                    className="flex justify-between border-b border-soft/15 pb-2 text-h8"
                  >
                    <dt className="text-soft/70">{row.d}</dt>
                    <dd className="font-semibold">{row.h}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-8 space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-h8 text-soft/85">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-5 w-5 shrink-0 text-turquoise"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="#tests" variant="light">
                  Test reservieren
                </Button>
                <Button
                  href={MAPS_DIRECTIONS}
                  variant="outline"
                  className="border-soft/30 text-soft hover:border-soft hover:bg-soft/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Route planen
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Karte */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[var(--radius-brand)] border border-soft/15 shadow-2xl">
              <iframe
                src={OSM_EMBED}
                title="Karte: DoctorBox, Taubenstraße 26, 10117 Berlin"
                width={640}
                height={460}
                loading="lazy"
                className="h-[340px] w-full lg:h-[460px]"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
