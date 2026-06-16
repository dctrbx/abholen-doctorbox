"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Sanftes Einblenden. Animiert beim Mount (Fade + leichtes Aufsteigen) –
 * bewusst NICHT an eine In-View-Erkennung gekoppelt, weil die für bereits beim
 * Laden sichtbare Inhalte (oben auf Unterseiten) unzuverlässig auslöste und
 * Inhalte sichtbar blass hängen blieben. Garantiert sichtbaren Content,
 * respektiert prefers-reduced-motion und animiert nur transform/opacity.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
