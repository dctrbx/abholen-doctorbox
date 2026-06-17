import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden"
    >
      {/* Vollflächen-Video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="DoctorBox Heimtest mit Tasso-Blutentnahme"
      >
        <source src="/videos/banner-tasso-web.mp4" type="video/mp4" />
      </video>

      {/* Verlauf für Lesbarkeit */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-ink/85 via-ink/55 to-ink/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-44 sm:px-6 lg:px-8 lg:pb-28 lg:pt-52">
        <div className="max-w-2xl text-soft">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-soft/25 bg-soft/10 px-4 py-2 text-h8 font-medium text-soft backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turquoise opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise" />
              </span>
              Berlin-Mitte · Taubenstraße&nbsp;26
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-display font-extrabold">
              Dein Test.
              <br />
              <span className="text-lind">Heute abholen.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-h7 leading-relaxed text-soft/85">
              Schluss mit Versandwartezeit. Hol dein Heimtestkit direkt bei uns
              im Büro ab, teste in Ruhe zuhause und schick die Probe ins Labor –
              Ergebnis digital innerhalb von 72&nbsp;Stunden nach Probeneingang.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#tests" variant="light">
                Tests ansehen
              </Button>
              <Button
                href="#ablauf"
                variant="outline"
                className="border-soft/40 text-soft hover:border-soft hover:bg-soft/10"
              >
                So funktioniert's
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { n: "0 €", l: "Versandkosten" },
                { n: "72 h", l: "nach Probeneingang" },
                { n: "100 %", l: "anonym & sicher" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-h4 font-extrabold text-soft">{s.n}</dt>
                  <dd className="mt-1 text-h8 text-soft/70">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
