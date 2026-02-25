import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

/* ── GET /api/categories ── */
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(categories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* ── POST /api/categories ── */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Auto-generate slug from name
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Category with this name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}