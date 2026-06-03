import { NextResponse } from "next/server";
import * as ort from "onnxruntime-node";
import path from "path";

export async function GET() {
  try {
    const models = ["stage1_classifier.onnx", "stage2_regressor.onnx"];
    const checks = await Promise.all(
      models.map(async (name) => {
        const p = path.join(process.cwd(), "models", name);
        const sess = await ort.InferenceSession.create(p);
        return {
          model:   name,
          inputs:  sess.inputNames,
          outputs: sess.outputNames,
          status:  "ok",
        };
      }),
    );
    return NextResponse.json({ status: "ok", models: checks });
  } catch (err) {
    return NextResponse.json(
      { status: "error", details: String(err) },
      { status: 500 },
    );
  }
}