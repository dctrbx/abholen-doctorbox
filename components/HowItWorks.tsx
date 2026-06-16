import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Online auswählen & bezahlen",
    body: "Wähl deinen Test, schließ den Kauf sicher über Shopify ab und reservier dein Kit – in unter zwei Minuten.",
  },
  {
    n: "02",
    title: "Im Büro abholen",
    body: "Komm in die Taubenstraße 26 in Berlin-Mitte. Dein Kit liegt bereit – auf Wunsch mit kurzer Einweisung vor Ort.",
  },
  {
    n: "03",
    title: "Testen & Befund erhalten",
    body: "Probe bequem zuhause entnehmen, kostenlos einsenden und den digitalen Befund in 24–48 h in der DoctorBox-App lesen.",
  },
];

export function HowItWorks() {
  return (
    <section id="ablauf" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-green">
            So funktioniert's
          </p>
          <h2 className="mt-3 max-w-2xl text-h2 font-extrabold text-ink">
            Drei Schritte vom Klick zum Klarheits-Moment.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[var(--radius-brand)] border border-ink/10 bg-soft-2/60 p-8 transition-colors duration-300 hover:border-moss/30">
                <span className="text-h2 font-extrabold text-lind">{step.n}</span>
                <h3 className="mt-4 text-h5 font-bold text-moss">{step.title}</h3>
                <p className="mt-3 text-h8 leading-relaxed text-ink/70">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
