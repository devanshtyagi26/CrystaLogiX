import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { CLASSIFIER_FEATURES } from "@/lib/onnxInference";

export const runtime = "nodejs";

/**
 * Handles POST requests to retrieve and return classifier features for a label by id.
 * Validates the request body, ensures the label exists, and responds with extracted features or an error.
 *
 * Args:
 *   req: The incoming Next.js request containing a JSON body with a string `id` field.
 *
 * Returns:
 *   A JSON response containing either an error description or the extracted feature vector for the label.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { id } = body as { id?: unknown };
  if (typeof id !== "string" || !id.trim()) {
    return NextResponse.json(
      { error: "Expected { id: string }." },
      { status: 400 },
    );
  }

  const cleanId = id.trim();

  const db = await getDb();
  const record = await db.collection("labels").findOne({ _id: cleanId as any });

  if (!record) {
    return NextResponse.json(
      { error: `Material '${cleanId}' not found.` },
      { status: 404 },
    );
  }

  const missing: string[] = [];
  const features = CLASSIFIER_FEATURES.map((name) => {
    const val = record[name];
    if (val === undefined || val === null) missing.push(name);
    return Number(val);
  });

  const nanFeatures = features
    .map((v, i) => (isNaN(v) ? CLASSIFIER_FEATURES[i] : null))
    .filter(Boolean) as string[];

  if (missing.length > 0 || nanFeatures.length > 0) {
    return NextResponse.json(
      {
        error: `Feature extraction failed for '${cleanId}'.`,
        missing,
        invalid: nanFeatures,
      },
      { status: 422 },
    );
  }

  return NextResponse.json({
    success:       true,
    id:            cleanId,
    feature_count: features.length,
    features,
  });
}