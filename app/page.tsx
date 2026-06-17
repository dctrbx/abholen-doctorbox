import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HowItWorks } from "@/components/HowItWorks";
import { Trust } from "@/components/Trust";
import { Categories } from "@/components/Categories";
import { Pickup } from "@/components/Pickup";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Trust />
        <Categories />
        <Pickup />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
