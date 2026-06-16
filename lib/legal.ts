import { readFileSync } from "fs";
import { join } from "path";

/**
 * Rechtstexte – verbatim aus shop.doctorbox.de übernommen
 * (content/legal/*.html, via Storefront-API bzw. Policy-Seite gezogen).
 */
export const LEGAL = {
  impressum: { title: "Impressum", file: "impressum" },
  datenschutz: { title: "Datenschutzerklärung", file: "datenschutz" },
  agb: { title: "Allgemeine Geschäftsbedingungen", file: "agb" },
  widerruf: { title: "Widerruf & Rückerstattung", file: "widerruf" },
  versand: { title: "Versand & Lieferung", file: "versand" },
} as const;

export type LegalSlug = keyof typeof LEGAL;

export const LEGAL_SLUGS = Object.keys(LEGAL) as LegalSlug[];

export function isLegalSlug(slug: string): slug is LegalSlug {
  return slug in LEGAL;
}

export function getLegalHtml(slug: LegalSlug): string {
  return readFileSync(
    join(process.cwd(), "content/legal", `${LEGAL[slug].file}.html`),
    "utf8",
  );
}
