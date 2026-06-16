import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StarBlob, OkkerCircle } from "@/components/Shapes";

export function CTA() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-moss px-6 py-16 text-center text-soft sm:px-12 lg:py-24">
            <StarBlob
              color="#0E834B"
              className="absolute -left-12 -top-12 h-52 w-52 opacity-40"
            />
            <OkkerCircle className="absolute -bottom-14 -right-10 h-56 w-56 opacity-30" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-h1 font-extrabold">
                Bereit, deinem Körper zuzuhören?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-h7 text-soft/80">
                Wähl deinen Test, hol ihn heute in der Taubenstraße&nbsp;26 ab und
                hab schon übermorgen Klarheit.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="#tests" variant="light">
                  Jetzt Test auswählen
                </Button>
                <Button
                  href="#abholen"
                  variant="outline"
                  className="border-soft/30 text-soft hover:border-soft hover:bg-soft/10"
                >
                  Abholort ansehen
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
