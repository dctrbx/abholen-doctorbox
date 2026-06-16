import { Reveal } from "@/components/ui/Reveal";

/**
 * Vertrauenssektion. Bewusst nur belegbare Aussagen – keine erfundenen
 * Bewertungen/Zahlen. Konkrete Zertifikate/Review-Scores bei Bedarf ergänzen.
 */
const POINTS = [
  {
    title: "Akkreditierte Fachlabore",
    body: "Deine Probe wird in zertifizierten medizinischen Laboren ausgewertet – die gleiche Qualität wie beim Arzt.",
    icon: (
      <path
        d="M9 3v6.2L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 9.2V3M8 3h8M9.5 13h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Daten sicher in Deutschland",
    body: "Befunde liegen verschlüsselt in deiner persönlichen DoctorBox – DSGVO-konform und nur für dich einsehbar.",
    icon: (
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Persönliche Beratung vor Ort",
    body: "Hol dein Kit in der Taubenstraße 26 ab – auf Wunsch mit kurzer Einweisung von echten Menschen, nicht per Hotline.",
    icon: (
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 0c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Befund in 24–48 Stunden",
    body: "Kein langes Warten: Ergebnisse erscheinen verständlich aufbereitet digital in der DoctorBox-App.",
    icon: (
      <path
        d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function Trust() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <p className="text-h8 font-semibold uppercase tracking-[0.18em] text-green">
            Warum DoctorBox
          </p>
          <h2 className="mt-3 max-w-2xl text-h2 font-extrabold text-ink">
            Gesundheit ist Vertrauenssache. Wir nehmen das ernst.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.07}>
              <div className="flex h-full flex-col rounded-[var(--radius-brand)] border border-ink/10 bg-soft p-7 transition-colors duration-300 hover:border-moss/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lind/50 text-moss">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-h6 font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-h8 leading-relaxed text-ink/65">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
