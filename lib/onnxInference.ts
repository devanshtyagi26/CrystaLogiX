import { BandgapPrediction } from "./types";
import featureNames from "./feature_names.json";

// Feature metadata
export const CLASSIFIER_FEATURES: string[] = featureNames.stage1_classifier;
export const REGRESSOR_FEATURES: string[] = featureNames.stage2_regressor;
export const N_FEATURES = CLASSIFIER_FEATURES.length;

export function validateFeatures(features: unknown): asserts features is number[] {
  if (!Array.isArray(features)) {
    throw new Error("features must be an array.");
  }
  if (features.length !== N_FEATURES) {
    throw new Error(
      `Expected ${N_FEATURES} features, received ${features.length}. ` +
        `First 3 expected: [${CLASSIFIER_FEATURES.slice(0, 3).join(", ")}]`,
    );
  }
  if (!features.every((v) => typeof v === "number" && isFinite(v))) {
    throw new Error("All features must be finite numbers.");
  }
}

// Inference proxy (calls external inference server)
const INFERENCE_URL = process.env.INFERENCE_API_URL!;

export async function predictBandgap(features: number[]): Promise<BandgapPrediction> {
  const res = await fetch(`${INFERENCE_URL}api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });

  if (!res.ok) throw new Error(`Inference server error: ${res.status}`);

  const data = await res.json();

  return {
    isMetal:         data.stage1.is_metal,
    classLabel:      data.stage1.class_label,
    probMetal:       data.stage1.prob_metal,
    probNonMetal:    data.stage1.prob_non_metal,
    bandgapEv:       data.stage2.bandgap_ev,
    bandgapCategory: data.stage2.bandgap_category,
  };
}