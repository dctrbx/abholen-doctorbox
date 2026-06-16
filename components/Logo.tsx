import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Offizielle DoctorBox-Wortmarke (public/doctorbox-logo.png – aus den Shopify
 * Brand-Assets). Höhe über `className` steuern (z. B. "h-10").
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/doctorbox-logo.png"
      alt="DoctorBox"
      width={226}
      height={199}
      priority
      unoptimized
      className={cn("h-10 w-auto", className)}
    />
  );
}

/**
 * Vereinfachtes Box-Glyph (einfarbig, themable über currentColor) – für Stellen,
 * an denen das mehrfarbige PNG nicht passt, z. B. weiß auf dunklem Grund.
 */
export function BoxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* offene Deckel-Klappe (nach oben-links), hellste Fläche */}
      <path
        d="M42 31 L24 14 L68 19 L86 36 Z"
        fill="currentColor"
        opacity="0.45"
      />
      {/* Deckel-/Oberseite */}
      <path d="M14 44 L42 31 L86 36 L56 50 Z" fill="currentColor" opacity="0.72" />
      {/* rechte Seite */}
      <path d="M56 50 L86 36 L86 78 L56 93 Z" fill="currentColor" opacity="0.58" />
      {/* Vorderseite, dunkelste Fläche */}
      <path d="M14 44 L56 50 L56 93 L14 85 Z" fill="currentColor" />
    </svg>
  );
}
