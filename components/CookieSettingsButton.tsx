"use client";

/** Öffnet die Cookie-Einstellungen (Footer-Link). */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("cookie:open"))}
      className="transition-colors hover:text-moss"
    >
      Cookie-Einstellungen
    </button>
  );
}
