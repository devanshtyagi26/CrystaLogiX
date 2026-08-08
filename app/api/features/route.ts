import { NextResponse } from "next/server";
import { CLASSIFIER_FEATURES, REGRESSOR_FEATURES, N_FEATURES } from "@/lib/onnxInference";

/**
 * Handles GET requests to retrieve metadata about available model features. 
 * Returns the total feature count along with the lists of classifier and regressor feature names.
 *
 * Args:
 *   None.
 *
 * Returns:
 *   A JSON response containing the feature count and arrays of classifier and regressor feature identifiers.
 */
export async function GET() {
  return NextResponse.json({
    feature_count:        N_FEATURES,
    classifier_features:  CLASSIFIER_FEATURES,
    regressor_features:   REGRESSOR_FEATURES,
  });
}