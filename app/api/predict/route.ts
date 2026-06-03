import { NextRequest, NextResponse } from "next/server";
import {
  predictBandgap,
  validateFeatures,
  N_FEATURES,
  CLASSIFIER_FEATURES,
} from "@/lib/onnxInference";

export async function POST(req: NextRequest) {
  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { features } = body as { features: unknown };

  // ── Validate ───────────────────────────────────────────────────────────────
  try {
    validateFeatures(features);
  } catch (err) {
    return NextResponse.json(
      {
        error:                  String(err),
        expected_feature_count: N_FEATURES,
        sample_feature_names:   CLASSIFIER_FEATURES.slice(0, 5),
      },
      { status: 400 },
    );
  }

  // ── Inference ──────────────────────────────────────────────────────────────
  try {
    const result = await predictBandgap(features as number[]);

    return NextResponse.json({
      success: true,
      stage1: {
        is_metal:       result.isMetal,
        class_label:    result.classLabel,
        prob_metal:     +result.probMetal.toFixed(6),
        prob_non_metal: +result.probNonMetal.toFixed(6),
      },
      stage2: {
        bandgap_ev:       result.bandgapEv !== null
                            ? +result.bandgapEv.toFixed(4)
                            : null,
        bandgap_category: result.bandgapCategory,
      },
    });
  } catch (err) {
    console.error("[/api/predict] inference error:", err);
    return NextResponse.json(
      { error: "Inference failed.", details: String(err) },
      { status: 500 },
    );
  }
}