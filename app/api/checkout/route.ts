import { NextRequest, NextResponse } from "next/server";
import { cartPermalink, createCheckoutUrl } from "@/lib/shopify";

/**
 * GET /api/checkout?variant=<id>&qty=<n>
 *
 * Erstellt – wenn möglich – einen echten Shopify-Warenkorb (Storefront API)
 * und leitet auf dessen checkoutUrl weiter. Ohne Token: Redirect auf den
 * Cart-Permalink. So funktioniert der Kauf-Button sofort und upgradet
 * automatisch, sobald ein Storefront-Token hinterlegt ist.
 */
export async function GET(req: NextRequest) {
  const variant = req.nextUrl.searchParams.get("variant");
  const qty = Math.max(1, Number(req.nextUrl.searchParams.get("qty") ?? "1") || 1);

  if (!variant) {
    return NextResponse.json({ error: "missing variant" }, { status: 400 });
  }

  const checkoutUrl = await createCheckoutUrl(variant, qty);
  return NextResponse.redirect(checkoutUrl ?? cartPermalink(variant, qty), {
    status: 303,
  });
}
