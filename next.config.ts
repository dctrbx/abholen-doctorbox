import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Bild-Optimierung deaktiviert: Der Optimizer-Cache (.next/cache/images)
    // liegt auf einem externen SSD-Dateisystem, das einzelne Cache-Dateien als
    // ._-AppleDouble-Dateien korrumpiert → sporadisch kaputte Bilder. Bilder
    // kommen direkt vom Shopify-CDN (bereits optimiert) bzw. lokal.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
