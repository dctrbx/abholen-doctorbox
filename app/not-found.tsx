import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { MossTriangle, StarBlob } from "@/components/Shapes";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="relative flex min-h-[80svh] items-center overflow-hidden px-4 pt-32 sm:px-6 lg:px-8"
      >
        <StarBlob className="absolute -left-10 top-24 h-40 w-40 opacity-20" />
        <MossTriangle className="absolute -right-8 bottom-16 h-32 w-32 opacity-15" />

        <div className="mx-auto max-w-xl text-center">
          <p className="text-display font-extrabold leading-none text-moss">
            404
          </p>
          <h1 className="mt-4 text-h3 font-extrabold text-ink">
            Diese Seite haben wir nicht gefunden.
          </h1>
          <p className="mt-3 text-h7 text-ink/65">
            Vielleicht wurde der Test verschoben oder ist nicht zur Abholung
            verfügbar. Stöbere einfach in unseren Tests weiter.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/#tests">Alle Tests ansehen</Button>
            <Button href="/" variant="outline">
              Zur Startseite
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
