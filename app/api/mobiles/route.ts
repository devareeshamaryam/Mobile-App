 import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mobile from "@/models/Mobile";

/*
  Valid priceRange slugs (must match getPriceRange in add form):
    "10k-20k"   → price < 20,000
    "20k-30k"   → 20,000 – 29,999
    "30k-40k"   → 30,000 – 39,999
    "40k-50k"   → 40,000 – 49,999
    "above-50k" → 50,000+
*/

/* ── GET /api/mobiles ──────────────────────────────────────────────────
   Query params:
     brand      – brandSlug  (e.g. samsung)
     priceRange – single slug OR comma-separated slugs (e.g. 30k-40k)
     search     – partial name match
   ------------------------------------------------------------------- */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const brand      = searchParams.get("brand");
    const priceRange = searchParams.get("priceRange");
    const search     = searchParams.get("search");

    const filter: Record<string, any> = {};

    if (brand)  filter.brandSlug = brand;

    if (priceRange) {
      // Support comma-separated values: ?priceRange=30k-40k,40k-50k
      const ranges = priceRange.split(",").map((r) => r.trim()).filter(Boolean);
      filter.priceRange = ranges.length === 1 ? ranges[0] : { $in: ranges };
    }

    if (search) filter.name = { $regex: search, $options: "i" };

    const mobiles = await Mobile.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(mobiles);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* ── POST /api/mobiles ─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Safety: re-calculate priceRange server-side so it's always correct
    const price: number = Number(body.price) || 0;
    body.priceRange = getPriceRange(price);

    const mobile = await Mobile.create(body);
    return NextResponse.json(mobile, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* ── Helper (mirrors the frontend function exactly) ── */
function getPriceRange(price: number): string {
  if (price < 20000) return "10k-20k";
  if (price < 30000) return "20k-30k";
  if (price < 40000) return "30k-40k";
  if (price < 50000) return "40k-50k";
  return "above-50k";
}