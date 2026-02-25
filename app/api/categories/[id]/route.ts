import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import mongoose from "mongoose";

interface Params { params: Promise<{ id: string }> }

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* ── PATCH /api/categories/[id] ── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    if (!isValidId(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await connectDB();
    const body = await req.json();

    // Re-generate slug if name changed
    if (body.name && !body.slug) {
      body.slug = body.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    const updated = await Category.findByIdAndUpdate(
      id, { $set: body }, { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* ── DELETE /api/categories/[id] ── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    if (!isValidId(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await connectDB();
    const deleted = await Category.findByIdAndDelete(id).lean();
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}