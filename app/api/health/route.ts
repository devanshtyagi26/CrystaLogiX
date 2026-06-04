import { NextResponse } from "next/server";

export async function GET() {
  try {
    const req = await fetch("https://crystalogix-backend.onrender.com");
    if (!req.ok) {
      throw new Error(`Health check failed with status ${req.status}`);
    }
    const checks = await req.json();
    return NextResponse.json({ status: "ok", checks });
  } catch (err) {
    return NextResponse.json(
      { status: "error", details: String(err) },
      { status: 500 },
    );
  }
}