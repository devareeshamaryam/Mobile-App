 import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mobile from "@/models/Mobile";

/* ── GET /api/mobiles?brand=samsung&priceRange=30k-40k&search=samsung ── */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const brand      = searchParams.get("brand");
    const priceRange = searchParams.get("priceRange");
    const search     = searchParams.get("search"); // ← Ye add hua

    const filter: any = {};
    if (brand)      filter.brandSlug  = brand;
    if (priceRange) filter.priceRange = priceRange;
    if (search)     filter.name = { $regex: search, $options: "i" }; // ← Ye add hua

    const mobiles = await Mobile.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(mobiles);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* ── POST /api/mobiles ── */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body   = await req.json();
    const mobile = await Mobile.create(body);
    return NextResponse.json(mobile, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}