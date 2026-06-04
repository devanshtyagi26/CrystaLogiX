// app/api/material/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q     = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(Number(searchParams.get("limit") ?? "60"), 200);

  const db = await getDb();

  const filter: any = q
    ? {
        $or: [
          { _id:              { $regex: q, $options: "i" } },
          { "Pretty Formula": { $regex: q, $options: "i" } },
          { Formula:          { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const [materials, total] = await Promise.all([
    db.collection("targets")
      .find(filter)
      .limit(limit)
      .toArray(),
    db.collection("targets").countDocuments(),
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
}