import { NextResponse } from "next/server";

const INFERENCE_URL = process.env.INFERENCE_API_URL ?? "";

if (INFERENCE_URL === "") {
  throw new Error("Missing INFERENCE_URL environment variable.");
}


/**
 * Handles GET requests to report the health of the inference backend. 
 * Contacts the inference server and returns an aggregated health status with details on failures or timeouts.
 *
 * Args:
 *   None.
 *
 * Returns:
 *   A JSON response describing the overall health status and any diagnostic information from the inference server.
 */
export async function GET() {

  try {
    const res = await fetch(INFERENCE_URL, {
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      throw new Error(`Health check failed with status ${res.status}`);
    }

    const checks = await res.json();
    return NextResponse.json({ status: "ok", checks });
  } catch (err) {
    // Distinguish timeout vs actual down
    const isTimeout = err instanceof DOMException && err.name === "TimeoutError";
    return NextResponse.json(
      {
        status:  isTimeout ? "timeout" : "error",
        details: isTimeout ? "Inference server is slow or cold-starting." : String(err),
      },
      { status: 503 },
    );
  }
}