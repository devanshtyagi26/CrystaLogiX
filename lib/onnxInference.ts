import * as ort from "onnxruntime-node";
import path from "path";
import featureNames from "@/models/feature_names.json";

// ── Feature metadata ──────────────────────────────────────────────────────────
export const CLASSIFIER_FEATURES: string[] = featureNames.stage1_classifier;
export const REGRESSOR_FEATURES: string[] = featureNames.stage2_regressor;
export const N_FEATURES = CLASSIFIER_FEATURES.length;

// ── Session cache (loaded once, reused across requests) ───────────────────────
let classifierSession: ort.InferenceSession | null = null;
let regressorSession: ort.InferenceSession | null = null;

async function getClassifier(): Promise<ort.InferenceSession> {
  if (!classifierSession) {
    const p = path.join(process.cwd(), "models", "stage1_classifier.onnx");
    classifierSession = await ort.InferenceSession.create(p);
  }
  return classifierSession;
}

async function getRegressor(): Promise<ort.InferenceSession> {
  if (!regressorSession) {
    const p = path.join(process.cwd(), "models", "stage2_regressor.onnx");
    regressorSession = await ort.InferenceSession.create(p);
  }
  return regressorSession;
}

// ── Types ─────────────────────────────────────────────────────────────────────
export type BandgapCategory = "metal" | "semiconductor" | "insulator";

export interface BandgapPrediction {
  // Stage 1
  isMetal: boolean;
  classLabel: number; // raw class index (0 = metal, 1 = non-metal)
  probMetal: number; // 0–1
  probNonMetal: number; // 0–1
  // Stage 2 (null when isMetal = true)
  bandgapEv: number | null;
  bandgapCategory: BandgapCategory;
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateFeatures(
  features: unknown,
): asserts features is number[] {
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

// ── Bandgap category helper ───────────────────────────────────────────────────
function categorizeBandgap(ev: number): BandgapCategory {
  if (ev <= 0) return "metal";
  if (ev < 3.0) return "semiconductor";
  return "insulator";
}

// ── Main inference ────────────────────────────────────────────────────────────
export async function predictBandgap(
  features: number[],
): Promise<BandgapPrediction> {
  const tensor = new ort.Tensor("float32", Float32Array.from(features), [
    1,
    features.length,
  ]);

  // ── Stage 1: Classify (metal vs non-metal) ──────────────────────────────────
  // Output 0 → label      : int64[1]          (0 = metal, 1 = non-metal)
  // Output 1 → probabilities: float32[1, 2]   ([p_metal, p_nonmetal])

  const clf = await getClassifier();
  const clfOut = await clf.run({ float_input: tensor });

  // Python: [array([0], int64), array([[0.99, 0.007]], float32)]
  const classLabel = Number(clfOut["label"].data[0]);
  const probsRaw = clfOut["probabilities"].data as Float32Array;

  // probabilities shape is [1, 2] → flat: [p_metal, p_nonmetal]
  const probMetal = probsRaw[0];
  const probNonMetal = probsRaw[1];
  const isMetal = classLabel === 0;

  if (isMetal) {
    return {
      isMetal: true,
      classLabel,
      probMetal,
      probNonMetal,
      bandgapEv: null,
      bandgapCategory: "metal",
    };
  }

  // ── Stage 2: Regress bandgap eV ─────────────────────────────────────────────
  // Output 0 → variable: float32[1, 1]
  const reg = await getRegressor();
  const regOut = await reg.run({ float_input: tensor });

  // Python: [array([[0.265]], float32)] → shape [1,1] → flat index 0
  const bandgapEv = Number(regOut["variable"].data[0]);

  return {
    isMetal: false,
    classLabel,
    probMetal,
    probNonMetal,
    bandgapEv,
    bandgapCategory: categorizeBandgap(bandgapEv),
  };
}
