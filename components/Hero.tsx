import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BoxMark } from "@/components/Logo";
import { StarBlob, OkkerCircle, MossTriangle } from "@/components/Shapes";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-40 sm:px-6 sm:pt-44 lg:px-8 lg:pb-24 lg:pt-52"
    >
      {/* weicher Verlauf nach Lind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120%] bg-[radial-gradient(120%_80%_at_80%_0%,rgba(203,223,198,0.7),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Text */}
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-moss/15 bg-soft/60 px-4 py-2 text-h8 font-medium text-moss backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                </span>
                Berlin-Mitte · Taubenstraße&nbsp;26
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-display font-extrabold text-ink">
                Dein Test.
                <br />
                <span className="text-moss">Heute abholen.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-h7 leading-relaxed text-ink/70">
                Schluss mit Versandwartezeit. Hol dein Heimtestkit direkt bei uns
                im Büro ab, teste in Ruhe zuhause und schick die Probe ins Labor –
                Befund digital in 24–48&nbsp;Stunden.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="#tests">Tests ansehen</Button>
                <Button href="#ablauf" variant="outline">
                  So funktioniert's
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
                {[
                  { n: "0 €", l: "Versandkosten" },
                  { n: "24–48 h", l: "bis zum Befund" },
                  { n: "100 %", l: "anonym & sicher" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="text-h4 font-extrabold text-moss">{s.n}</dt>
                    <dd className="mt-1 text-h8 text-ink/60">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Hauptkarte */}
              <div className="absolute inset-6 rounded-[var(--radius-brand)] bg-moss p-8 shadow-[0_40px_80px_-40px_rgba(14,77,47,0.6)]">
                <div className="flex h-full flex-col justify-between text-soft">
                  <BoxMark className="h-16 w-16 text-soft" />
                  <div>
                    <p className="text-h6 font-semibold leading-snug">
                      Abholbereit in der
                      <br />
                      Taubenstraße 26
                    </p>
                    <p className="mt-2 text-h8 text-soft/70">
                      Mo–Fr · 9–18 Uhr · Berlin-Mitte
                    </p>
                  </div>
                </div>
              </div>

              {/* schwebende Marken-Symbole (aus Formen.svg) */}
              <StarBlob className="animate-float absolute -left-7 -top-5 h-24 w-24 [--rot:-6deg] drop-shadow-sm" />
              <MossTriangle className="animate-float absolute -right-7 -top-6 h-20 w-20 [--rot:18deg] [animation-delay:1.2s]" />
              <OkkerCircle className="animate-float absolute -bottom-6 left-4 h-20 w-20 [animation-delay:0.6s]" />
              <StarBlob
                color="#7EC3A1"
                className="animate-float absolute -right-4 -bottom-2 h-14 w-14 [--rot:18deg] [animation-delay:1.8s]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
