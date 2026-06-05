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
  if (!Array.isArray(features) || features.length === 0) {
    throw new Error("features must be a non-empty array.");
  }

  // Derive base URL from env — with a localhost fallback for local dev
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");    

  const res = await fetch(`${baseUrl}/api/predict`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ features }),
    cache:   "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Prediction failed.");
  return data as PredictionResult;
}