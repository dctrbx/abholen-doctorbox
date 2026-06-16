import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  LEGAL,
  LEGAL_SLUGS,
  getLegalHtml,
  isLegalSlug,
} from "@/lib/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((legal) => ({ legal }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>;
}): Promise<Metadata> {
  const { legal } = await params;
  if (!isLegalSlug(legal)) return {};
  return { title: LEGAL[legal].title, robots: { index: false } };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  if (!isLegalSlug(legal)) notFound();

  const html = getLegalHtml(legal);

  return (
    <>
      <Header />
      <main id="main" className="px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-h8 font-medium text-ink/60 transition-colors hover:text-moss"
          >
            ← Zur Startseite
          </Link>
          <h1 className="mt-6 text-h2 font-extrabold text-ink">
            {LEGAL[legal].title}
          </h1>
          <div
            className="db-prose mt-8"
            // Verbatim-Rechtstext aus dem eigenen Shop (vertrauenswürdig).
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
