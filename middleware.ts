import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Rate limiter ──────────────────────────────────────────────
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 req/min per IP
});

// ── Routes to protect ─────────────────────────────────────────
const RATE_LIMITED = [
  "/api/predict",
  "/api/get-label",
];

const PUBLIC_ROUTES = [
  "/api/health",
  "/api/material",
  "/api/features",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Skip public routes entirely ───────────────────────────
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // ── Rate limit sensitive routes ───────────────────────────
  if (RATE_LIMITED.some((r) => pathname.startsWith(r))) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests.",
          limit,
          remaining: 0,
          retryAfter: Math.ceil((reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit":     String(limit),
            "X-RateLimit-Remaining": "0",
            "Retry-After":           String(Math.ceil((reset - Date.now()) / 1000)),
          },
        },
      );
    }

    // ── Attach rate limit headers to all responses ──────────
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit",     String(limit));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all API routes except Next.js internals
    "/api/((?!_next).*)",
  ],
};