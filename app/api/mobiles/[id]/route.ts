import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mobile from "@/models/Mobile";
import mongoose from "mongoose";

interface Params {
  params: Promise<{ id: string }>;
}

// ── Helper: validate MongoDB ObjectId ─────────────────────────────────────────
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* ── GET /api/mobiles/[id] ───────────────────────────────────────────────────
   Returns a single mobile document by its MongoDB _id.
   Used by:
     - MobileDetailPage  (public)
     - Admin view/edit   (admin)
──────────────────────────────────────────────────────────────────────────── */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid mobile ID" }, { status: 400 });
    }

    await connectDB();

    const mobile = await Mobile.findById(id).lean();

    if (!mobile) {
      return NextResponse.json({ error: "Mobile not found" }, { status: 404 });
    }

    return NextResponse.json(mobile);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* ── PATCH /api/mobiles/[id] ─────────────────────────────────────────────────
   Partially update a mobile (e.g. from admin edit page).
   Send only the fields you want to change in the request body.
──────────────────────────────────────────────────────────────────────────── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid mobile ID" }, { status: 400 });
    }

    await connectDB();

    const body = await req.json();

    const updated = await Mobile.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Mobile not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* ── DELETE /api/mobiles/[id] ────────────────────────────────────────────────
   Permanently delete a mobile from the database.
   Used by admin table's trash icon.
──────────────────────────────────────────────────────────────────────────── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid mobile ID" }, { status: 400 });
    }

    await connectDB();

    const deleted = await Mobile.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Mobile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}