import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abholen.doctorbox.eu"),
  title: {
    default: "DoctorBox – Heimtestkits in Berlin abholen",
    template: "%s · DoctorBox",
  },
  description:
    "Hol deinen Gesundheits-Test direkt bei uns in der Taubenstraße 26 in Berlin ab – ohne Versandwartezeit. Labordiagnostik für zuhause, Ergebnis innerhalb 72 Stunden nach Probeneingang.",
  keywords: [
    "Heimtest",
    "Testkit Berlin",
    "DoctorBox",
    "Bluttest zuhause",
    "Taubenstraße 26",
    "Gesundheitstest abholen",
  ],
  openGraph: {
    title: "DoctorBox – Heimtestkits in Berlin abholen",
    description:
      "Test abholen statt warten: Taubenstraße 26, Berlin-Mitte. Labordiagnostik für zuhause.",
    type: "website",
    locale: "de_DE",
    siteName: "DoctorBox",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f1e9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-moss focus:px-5 focus:py-2 focus:text-soft"
        >
          Zum Inhalt springen
        </a>
        {children}
        <CookieConsent />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
