const ITEMS = [
  "Akkreditierte Fachlabore",
  "Befund in 24–48 h",
  "Keine Versandkosten",
  "100 % anonym",
  "Persönliche Beratung vor Ort",
  "Digitaler Befund in der App",
  "Made in Berlin",
];

export function Marquee() {
  return (
    <section
      aria-label="Vorteile"
      className="border-y border-ink/10 bg-moss py-4 text-soft"
    >
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-h6 font-medium tracking-tight">{item}</span>
              <span aria-hidden="true" className="text-turquoise">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
