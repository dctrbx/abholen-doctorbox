"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * DSGVO-konformes Cookie-Consent-Tool.
 *
 * Grundsatz „Opt-in": ohne aktive Einwilligung werden KEINE nicht-notwendigen
 * Cookies/Skripte gesetzt. „Alle akzeptieren" und „Nur notwendige" sind
 * gleichwertig sichtbar (kein Dark Pattern). Granulare Kategorien sind über
 * „Einstellungen" wählbar, die Entscheidung wird gespeichert und ist über den
 * Footer („Cookie-Einstellungen") jederzeit änderbar.
 *
 * Die Einwilligung liegt unter `window.dbConsent` bereit und wird bei Änderung
 * als Event `cookie:change` gefeuert – daran lassen sich Analytics/Marketing-
 * Skripte koppeln, sobald welche eingebunden werden.
 */

const STORAGE_KEY = "db-cookie-consent";
const VERSION = 1;

type Consent = {
  v: number;
  ts: string;
  necessary: true;
  statistics: boolean;
  marketing: boolean;
};

const CATEGORIES = [
  {
    key: "necessary" as const,
    title: "Notwendig",
    desc: "Für den Betrieb der Seite erforderlich (z. B. Speicherung deiner Cookie-Auswahl, Warenkorb). Immer aktiv.",
    always: true,
  },
  {
    key: "statistics" as const,
    title: "Statistik",
    desc: "Anonyme Reichweitenmessung, um die Seite zu verbessern.",
    always: false,
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    desc: "Hilft uns, Angebote relevanter auszuspielen.",
    always: false,
  },
];

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.v !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function applyConsent(c: Consent) {
  (window as unknown as { dbConsent?: Consent }).dbConsent = c;
  window.dispatchEvent(new CustomEvent("cookie:change", { detail: c }));
}

export function CookieConsent() {
  const [decided, setDecided] = useState(true); // bis localStorage gelesen ist nichts zeigen
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Initial laden
  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setStatistics(existing.statistics);
      setMarketing(existing.marketing);
      applyConsent(existing);
      setDecided(true);
    } else {
      setDecided(false);
      setBannerOpen(true);
    }
  }, []);

  // Footer-Link „Cookie-Einstellungen"
  useEffect(() => {
    const open = () => {
      const c = readConsent();
      setStatistics(c?.statistics ?? false);
      setMarketing(c?.marketing ?? false);
      setSettingsOpen(true);
    };
    window.addEventListener("cookie:open", open);
    return () => window.removeEventListener("cookie:open", open);
  }, []);

  function save(stats: boolean, mkt: boolean) {
    const c: Consent = {
      v: VERSION,
      ts: new Date().toISOString(),
      necessary: true,
      statistics: stats,
      marketing: mkt,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* ignore */
    }
    applyConsent(c);
    setStatistics(stats);
    setMarketing(mkt);
    setDecided(true);
    setBannerOpen(false);
    setSettingsOpen(false);
  }

  if (decided && !bannerOpen && !settingsOpen) return null;

  return (
    <>
      {/* Banner */}
      {bannerOpen && !settingsOpen && (
        <div
          role="dialog"
          aria-label="Cookie-Hinweis"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto max-w-[1280px] rounded-[var(--radius-brand)] border border-ink/10 bg-soft p-5 shadow-[0_20px_60px_-20px_rgba(20,19,16,0.45)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-h6 font-bold text-ink">
                  Wir respektieren deine Privatsphäre
                </h2>
                <p className="mt-2 text-h8 leading-relaxed text-ink/70">
                  Wir nutzen Cookies, um die Seite bereitzustellen und – mit
                  deiner Einwilligung – zur Statistik und für Marketing. Du kannst
                  alle akzeptieren, nur notwendige zulassen oder selbst wählen.
                  Mehr in der{" "}
                  <Link
                    href="/datenschutz"
                    className="font-medium text-moss underline underline-offset-2"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="rounded-full border border-moss/25 px-5 py-3 text-h8 font-semibold text-moss transition-colors hover:bg-moss/5"
                >
                  Einstellungen
                </button>
                <button
                  type="button"
                  onClick={() => save(false, false)}
                  className="rounded-full border border-moss/25 px-5 py-3 text-h8 font-semibold text-moss transition-colors hover:bg-moss/5"
                >
                  Nur notwendige
                </button>
                <button
                  type="button"
                  onClick={() => save(true, true)}
                  className="rounded-full bg-moss px-6 py-3 text-h8 font-semibold text-soft transition-colors hover:bg-moss-700"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Einstellungen */}
      {settingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einstellungen"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            // Schließen nur, wenn bereits eine Entscheidung existiert.
            if (e.target === e.currentTarget && readConsent()) setSettingsOpen(false);
          }}
        >
          <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[var(--radius-brand)] bg-soft shadow-2xl">
            <div className="border-b border-ink/10 p-6">
              <h2 className="text-h5 font-bold text-ink">Cookie-Einstellungen</h2>
              <p className="mt-2 text-h8 text-ink/65">
                Wähle, welche Kategorien du zulässt. Notwendige Cookies sind für
                den Betrieb erforderlich.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {CATEGORIES.map((cat) => {
                  const on =
                    cat.key === "necessary"
                      ? true
                      : cat.key === "statistics"
                        ? statistics
                        : marketing;
                  const toggle = () => {
                    if (cat.key === "statistics") setStatistics((v) => !v);
                    if (cat.key === "marketing") setMarketing((v) => !v);
                  };
                  return (
                    <li
                      key={cat.key}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-soft-2/40 p-4"
                    >
                      <div>
                        <p className="text-h7 font-semibold text-ink">
                          {cat.title}
                        </p>
                        <p className="mt-1 text-h8 leading-relaxed text-ink/65">
                          {cat.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={`${cat.title} ${on ? "deaktivieren" : "aktivieren"}`}
                        disabled={cat.always}
                        onClick={toggle}
                        className={cn(
                          "mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                          on ? "bg-moss" : "bg-ink/20",
                          cat.always && "opacity-60",
                        )}
                      >
                        <span
                          className={cn(
                            "h-5 w-5 rounded-full bg-soft shadow transition-transform",
                            on && "translate-x-5",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-ink/10 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => save(statistics, marketing)}
                className="rounded-full border border-moss/25 px-5 py-3 text-h8 font-semibold text-moss transition-colors hover:bg-moss/5"
              >
                Auswahl speichern
              </button>
              <button
                type="button"
                onClick={() => save(true, true)}
                className="rounded-full bg-moss px-6 py-3 text-h8 font-semibold text-soft transition-colors hover:bg-moss-700"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
