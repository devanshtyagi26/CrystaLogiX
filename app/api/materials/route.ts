import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q     = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(Number(searchParams.get("limit") ?? "60"), 200);

  const filter: any = q
    ? {
        $or: [
          { _id:              { $regex: q, $options: "i" } },
          { "Pretty Formula": { $regex: q, $options: "i" } },
          { Formula:          { $regex: q, $options: "i" } },
        ],
      }
    : {};

  try {
    const db = await getDb();

    const [materials, total, filtered] = await Promise.all([
      db.collection("targets").find(filter).limit(limit).toArray(),
      db.collection("targets").countDocuments(),
      q ? db.collection("targets").countDocuments(filter) : Promise.resolve(0),
    ]);

    return NextResponse.json({
      materials: materials.map((r) => ({
        id:      r._id,
        name:    r["Pretty Formula"] ?? r["Formula"] ?? r._id,
        formula: r["Pretty Formula"] ?? r["Formula"] ?? r._id,
        actual:  Number(r["Band Gap (T)"] ?? r["Band Gap"] ?? 0),
        isMetal: Number(r.Is_Metal ?? r.IsMetal ?? 0) === 1,
      })),
      total,
    });
  } catch (err) {
    console.error("[/api/material] db error:", err);
    return NextResponse.json(
      { error: "Failed to fetch materials.", details: String(err) },
      { status: 500 },
    );
  }
}