// app/api/get-label/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { CLASSIFIER_FEATURES } from "@/lib/onnxInference";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }

  const { id } = body as { id?: unknown };
  if (typeof id !== "string" || !id.trim()) {
    return NextResponse.json({ error: "Expected { id: string }." }, { status: 400 });
  }

  const db     = await getDb();
  const record = await db.collection("labels").findOne({ _id: id as any });

  if (!record) {
    return NextResponse.json({ error: `Material '${id}' not found.` }, { status: 404 });
  }

  const missing: string[] = [];
  const features = CLASSIFIER_FEATURES.map((name) => {
    const val = record[name];
    if (val === undefined || val === null) missing.push(name);
    return Number(val);
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `${missing.length} features missing.`, missing },
      { status: 422 },
    );
  }

  return NextResponse.json({ success: true, id, feature_count: features.length, features });
}