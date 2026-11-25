import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ] }];
  },
  reactStrictMode: true,
  images: {
    // Bild-Optimierung: auf Vercel aktiv (AVIF/WebP, responsive). Lokal aus,
    // weil der Optimizer-Cache auf dem externen SSD-Dateisystem ._-AppleDouble-
    // Dateien erzeugt und einzelne Bilder korrumpiert. VERCEL=1 setzt Vercel
    // im Build automatisch.
    unoptimized: process.env.VERCEL !== "1",
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
