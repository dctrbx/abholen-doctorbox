/**
 * Marken-Symbole aus dem offiziellen DoctorBox-Asset `Formen.svg`
 * (public/brand-shapes.svg). Original-Pfade, je Form auf eine eigene viewBox
 * zugeschnitten. `fill` = currentColor → Farbe über `color`-Prop steuerbar,
 * Default = Markenfarbe der jeweiligen Form.
 */
import type { CSSProperties } from "react";

type ShapeProps = {
  className?: string;
  /** Überschreibt die Markenfarbe (CSS-Farbe). */
  color?: string;
  style?: CSSProperties;
};

/** Abgerundeter 6-Punkte-Stern (Original: Green #0E834B). */
export function StarBlob({ className, color = "#0E834B", style }: ShapeProps) {
  return (
    <svg
      viewBox="24 398 322 356"
      className={className}
      style={{ color, ...style }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M161.819 411.914C174.728 400.347 194.272 400.347 207.181 411.914L249.386 449.732C252.892 452.874 257.012 455.253 261.486 456.719L315.34 474.36C331.812 479.755 341.584 496.682 338.021 513.644L326.372 569.104C325.404 573.711 325.404 578.469 326.372 583.077L338.021 638.536C341.584 655.499 331.812 672.425 315.34 677.821L261.486 695.462C257.012 696.927 252.892 699.306 249.386 702.448L207.181 740.266C194.272 751.833 174.728 751.833 161.819 740.266L119.614 702.448C116.108 699.306 111.988 696.927 107.514 695.462L53.6597 677.821C37.1881 672.425 27.4157 655.499 30.9787 638.536L42.628 583.077C43.5958 578.469 43.5958 573.711 42.628 569.104L30.9787 513.644C27.4157 496.682 37.1881 479.755 53.6597 474.36L107.513 456.719C111.988 455.253 116.108 452.874 119.614 449.732L161.819 411.914Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Kreis (Original: Okker #ECD3A8). */
export function OkkerCircle({ className, color = "#ECD3A8", style }: ShapeProps) {
  return (
    <svg
      viewBox="446 369 345 345"
      className={className}
      style={{ color, ...style }}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="618.5" cy="541.5" r="170.5" fill="currentColor" />
    </svg>
  );
}

/** Abgerundetes Dreieck (Original: Moss #0E4D2F). */
export function MossTriangle({ className, color = "#0E4D2F", style }: ShapeProps) {
  return (
    <svg
      viewBox="207 12 356 344"
      className={className}
      style={{ color, ...style }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M308.015 20.6883C311.965 8.2401 327.909 4.7363 336.715 14.3815L556.277 254.886C565.082 264.531 560.144 280.091 547.389 282.894L229.325 352.789C216.569 355.592 205.562 343.535 209.513 331.087L308.015 20.6883Z"
        fill="currentColor"
      />
    </svg>
  );
}
