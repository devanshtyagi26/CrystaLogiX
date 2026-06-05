"use server";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PredictionResult {
  success: true;
  stage1: {
    is_metal:       boolean;
    class_label:    number;
    prob_metal:     number;
    prob_non_metal: number;
  };
  stage2: {
    bandgap_ev:       number | null;
    bandgap_category: "metal" | "semiconductor" | "insulator";
  };
}

// ── Action ────────────────────────────────────────────────────────────────────

export async function getPrediction(features: number[]): Promise<PredictionResult> {
  // Basic client-side guard before hitting the network
  if (!Array.isArray(features) || features.length === 0) {
    throw new Error("features must be a non-empty array.");
  }

  // Internal call — same origin, no API key needed here
  // The route handler adds the key server-side before forwarding to FastAPI
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/predict`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ features }),
    cache:   "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? "Prediction failed.");
  }

  return data as PredictionResult;
}