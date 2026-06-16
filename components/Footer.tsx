import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { getCatalog } from "@/lib/shopify-catalog";

export async function Footer() {
  const catalog = await getCatalog();
  const COLUMNS = [
    {
      title: "Tests",
      links: catalog.map((c) => ({ label: c.title, href: `#${c.slug}` })),
    },
    {
      title: "DoctorBox",
      links: [
        { label: "So funktioniert's", href: "#ablauf" },
        { label: "Abholen", href: "#abholen" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ];
  const year = 2026;
  return (
    <footer className="border-t border-ink/10 px-4 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="h-12" />
            <p className="mt-5 text-h8 leading-relaxed text-ink/60">
              Labordiagnostik für zuhause – heute abholbereit in Berlin-Mitte.
              Taubenstraße&nbsp;26, 10117 Berlin.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-h8 font-semibold uppercase tracking-[0.14em] text-ink/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-h8 text-ink/70 transition-colors hover:text-moss"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-h8 text-ink/50 sm:flex-row sm:items-center">
          <p>© {year} DoctorBox. Alle Rechte vorbehalten.</p>
          <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/impressum" className="transition-colors hover:text-moss">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-moss">
              Datenschutz
            </Link>
            <Link href="/agb" className="transition-colors hover:text-moss">
              AGB
            </Link>
            <Link href="/widerruf" className="transition-colors hover:text-moss">
              Widerruf
            </Link>
            <Link href="/versand" className="transition-colors hover:text-moss">
              Versand
            </Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
