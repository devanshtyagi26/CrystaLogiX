import { NextRequest, NextResponse } from "next/server";
import {
  predictBandgap,
  validateFeatures,
  N_FEATURES,
  CLASSIFIER_FEATURES,
} from "@/lib/onnxInference";

// ── Helpers ──────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 64 * 1024; // 64 KB — features array should never exceed this

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// ── API key auth ──────────────────────────────────────────────────────────────

const VALID_API_KEY = process.env.INFERENCE_API_SECRET;

function checkApiKey(req: NextRequest): NextResponse | null {
  if (!VALID_API_KEY) {
    // Fail closed: if the env var is missing, block all requests
    console.error("[/api/predict] INFERENCE_API_SECRET env var is not set.");
    return NextResponse.json(
      { error: "Service misconfigured." },
      { status: 503 },
    );
  }

  const provided = req.headers.get("x-api-key");
  if (!provided || provided !== VALID_API_KEY) {
    return NextResponse.json(
      { error: "Missing or invalid API key." },
      { status: 401 },
    );
  }

  return null; // key is valid
}

// ── Block non-POST verbs ──────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

// ── POST /api/predict ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {

  // ── API key auth ─────────────────────────────────────────────────────────
  const authError = checkApiKey(req);
  if (authError) return authError;

  // ── Content-Type guard ───────────────────────────────────────────────────
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  // ── Request size guard ───────────────────────────────────────────────────
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: `Request body too large. Max ${MAX_BODY_BYTES / 1024} KB.` },
      { status: 413 },
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // ── Safe shape check before casting ─────────────────────────────────────
  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return NextResponse.json(
      { error: "Body must be a JSON object with a `features` key." },
      { status: 400 },
    );
  }

  const { features } = body as Record<string, unknown>;

  // ── Validate features ────────────────────────────────────────────────────
  try {
    validateFeatures(features);
  } catch (err) {
    return NextResponse.json(
      {
        error:                  errorMessage(err),
        expected_feature_count: N_FEATURES,
        sample_feature_names:   CLASSIFIER_FEATURES.slice(0, 5),
      },
      { status: 400 },
    );
  }

  // ── Inference ────────────────────────────────────────────────────────────
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
      { error: "Inference failed.", details: errorMessage(err) },
      { status: 500 },
    );
  }
}