 import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mobile from "@/models/Mobile";

// GET /api/mobiles/search?q=samsung&limit=8
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q     = searchParams.get("q") ?? "";
    const limit = Math.min(Number(searchParams.get("limit") ?? 8), 20);

    if (!q || q.length < 2) return NextResponse.json({ phones: [] });

    const phones = await Mobile.find({ name: { $regex: q, $options: "i" } })
      .select("_id name brand price images variants")
      .limit(limit)
      .lean();

    return NextResponse.json({ phones });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}