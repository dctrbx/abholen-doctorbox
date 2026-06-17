import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "Muss ich den Test vorher online kaufen?",
    a: "Ja – so reservieren wir dein Kit und es liegt bei deiner Ankunft in der Taubenstraße 26 bereit. Der Kauf läuft sicher über Shopify, die Abholung ist kostenlos.",
  },
  {
    q: "Wann kann ich abholen?",
    a: "Montag bis Freitag von 9 bis 17 Uhr und samstags von 10 bis 14 Uhr. Eine Voranmeldung ist nicht nötig – bring einfach deine Bestellbestätigung mit.",
  },
  {
    q: "Wie funktioniert der Test danach?",
    a: "Du entnimmst die Probe bequem zuhause nach der beiliegenden Anleitung und sendest sie kostenlos im frankierten Rückumschlag ein. Den Befund erhältst du digital.",
  },
  {
    q: "Wie schnell bekomme ich meinen Befund?",
    a: "In der Regel innerhalb von 72 Stunden nach Probeneingang im Labor. Bei aufwendigeren Analysen (z. B. Mikrobiom) dauert es 10–14 Tage. Die Zeit steht bei jedem Test dabei.",
  },
  {
    q: "Sind meine Daten sicher?",
    a: "Absolut. Deine Ergebnisse landen verschlüsselt in deiner persönlichen DoctorBox – DSGVO-konform, gehostet in Deutschland, einsehbar nur für dich.",
  },
  {
    q: "Kann ich mehrere Tests gleichzeitig abholen?",
    a: "Ja. Kauf einfach mehrere Kits – wir legen alles zusammen für dich bereit.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-green">
            Häufige Fragen
          </p>
          <h2 className="mt-3 text-h2 font-extrabold text-ink">
            Alles, was du vor der Abholung wissen willst.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h6 font-semibold text-ink marker:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-moss/25 text-moss transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-h8 leading-relaxed text-ink/70">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
