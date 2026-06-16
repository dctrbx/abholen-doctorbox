import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/shopify-search";

// Such-Index für die Client-Suche. ISR-artig gecacht (1 h).
export const revalidate = 3600;

export async function GET() {
  const docs = await getSearchIndex();
  return NextResponse.json(
    { docs },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
