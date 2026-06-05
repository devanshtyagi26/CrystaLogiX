import { NextResponse } from "next/server";
import { CLASSIFIER_FEATURES, REGRESSOR_FEATURES, N_FEATURES } from "@/lib/onnxInference";

export async function GET() {
  return NextResponse.json({
    feature_count:        N_FEATURES,
    classifier_features:  CLASSIFIER_FEATURES,
    regressor_features:   REGRESSOR_FEATURES,
  });
}