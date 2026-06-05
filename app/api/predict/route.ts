import { NextRequest, NextResponse } from "next/server";

// ── Helpers ───────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 64 * 1024;
const INFERENCE_URL  = process.env.INFERENCE_API_URL;
const API_SECRET_KEY = process.env.INFERENCE_API_SECRET;

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// ── Block non-POST verbs ──────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

// ── POST /api/predict ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {

  // ── Env guard — fail closed if misconfigured ─────────────────────────────
  if (!INFERENCE_URL || !API_SECRET_KEY) {
    console.error("[/api/predict] INFERENCE_SERVER_URL or API_SECRET_KEY is not set.");
    return NextResponse.json({ error: "Service misconfigured." }, { status: 503 });
  }

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

  // ── Shape check ──────────────────────────────────────────────────────────
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Body must be a JSON object with a `features` key." },
      { status: 400 },
    );
  }

  const { features } = body as Record<string, unknown>;

  if (!Array.isArray(features) || features.length === 0) {
    return NextResponse.json(
      { error: "`features` must be a non-empty array of numbers." },
      { status: 400 },
    );
  }

  if (!features.every((f) => typeof f === "number" && isFinite(f))) {
    return NextResponse.json(
      { error: "`features` must contain only finite numbers." },
      { status: 400 },
    );
  }

  // ── Proxy to FastAPI — API key added server-side, never touches browser ──
  try {
    const upstream = await fetch(`${INFERENCE_URL}/api/predict`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":    API_SECRET_KEY,          // server → server only
      },
      body: JSON.stringify({ features }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      // Forward FastAPI's error status + message transparently
      return NextResponse.json(
        { error: data?.detail ?? "Upstream inference error." },
        { status: upstream.status },
      );
    }

    return NextResponse.json({ success: true, ...data });

  } catch (err) {
    console.error("[/api/predict] upstream fetch failed:", err);
    return NextResponse.json(
      { error: "Could not reach inference server.", details: errorMessage(err) },
      { status: 502 },
    );
  }
}