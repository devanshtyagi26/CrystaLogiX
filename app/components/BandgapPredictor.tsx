"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { PageHeader } from "./Section";
import GlowDot from "./sim/GlowDot";
import StatusFallbackCard from "./sim/StatusFallback";
import { AtomIcon } from "./Logo";
import {
  Material,
  InferenceResult,
  PredictMaterialResponse,
  MaterialSearchResponse,
  ServerState,
} from "@/lib/types";
import ResultCard from "./sim/ResultCard";
import LabelInfo from "./sim/LabelInfo";

function resultFromResponse(
  response: PredictMaterialResponse,
): InferenceResult {
  return {
    isMetal: response.stage1.is_metal,
    classLabel: response.stage1.class_label,
    probMetal: response.stage1.prob_metal,
    probNonMetal: response.stage1.prob_non_metal,
    bandgapEv: response.stage2.bandgap_ev,
    bandgapCategory: response.stage2.bandgap_category,
  };
}

function getStatusActive(state: ServerState) {
  if (state === "ready") return 1;
  if (state === "down") return -1;
  return 0;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-white/8 bg-[#071515]/40 px-6 py-16">
      <div className="h-12 w-12 opacity-25">
        <AtomIcon />
      </div>
      <div className="text-center text-sm text-[#475569]">
        Select a material to run prediction
      </div>
    </div>
  );
}

export default function BandgapPredictor(): ReactElement {
  const [serverState, setServerState] = useState<ServerState>("connecting");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [selected, setSelected] = useState<Material | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;

    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!ignore) setServerState(response.ok ? "ready" : "down");
      } catch {
        if (!ignore) setServerState("down");
      }
    }

    checkHealth();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setSearching(true);

      try {
        const params = new URLSearchParams({ q: search, limit: "60" });
        const response = await fetch(`/api/materials?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as MaterialSearchResponse;

        setMaterials(data.materials);
        setTotalMaterials(data.total);
      } catch (requestError) {
        if (
          !(
            requestError instanceof DOMException &&
            requestError.name === "AbortError"
          )
        ) {
          setError("Could not load material options.");
        }
      } finally {
        setSearching(false);
      }
    }, 160);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as Node | null;
      if (dropRef.current && target && !dropRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleSelect(material: Material) {
    setSelected(material);
    setOpen(false);
    setSearch("");
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      // Step 1: get features from get-label
      const labelRes = await fetch("/api/get-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: material.id }),
      });

      const labelData = await labelRes.json();
      if (!labelRes.ok) {
        throw new Error(labelData.error ?? "Failed to fetch labels.");
      }

      const { features } = labelData as { features: number[] };

      // Step 2: send features to predict
      const predictRes = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      const predictData = await predictRes.json();
      if (!predictRes.ok) {
        throw new Error(predictData.error ?? "Prediction failed.");
      }

      const typed = predictData as PredictMaterialResponse;
      setResult(resultFromResponse(typed));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Prediction failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  const active = getStatusActive(serverState);

  if (serverState === "down") {
    return <StatusFallbackCard state="down" />;
  }

  return (
    <div className="min-h-screen">
      <div className="absolute right-10 top-25 flex items-center gap-5">
        <div className="flex items-center gap-2 text-xs">
          <GlowDot active={active} />
          <span
            className={
              serverState === "ready" ? "text-[#06d6a0]" : "text-[#f59e0b]"
            }
          >
            {serverState === "ready" ? "Model Runtime" : "Model Connecting"}
          </span>
        </div>
        <div className="rounded-full border border-[#06d6a0]/20 bg-[#06d6a0]/8 px-3 py-1 text-xs tracking-[0.06em] text-[#06d6a0]">
          {serverState === "ready"
            ? totalMaterials
              ? `Test set | ${totalMaterials || "..."} materials`
              : "Test set | Loading materials..."
            : "Connecting to server..."}
        </div>
      </div>

      <PageHeader
        eyebrow="Interactive simulator | Two-stage ML pipeline | XGBoost"
        title="Bandgap Prediction"
        body="Select a material from the test set. The dropdown reads target.json server-side, then the selected material id is matched against label.json and sent through the Model backend."
      />

      {serverState === "connecting" ? (
        <StatusFallbackCard state="connecting" />
      ) : (
        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6">
                <label className="mb-3 block text-xs uppercase tracking-[0.12em] text-[#64748b]">
                  Select material
                </label>
                <div ref={dropRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen((current) => !current)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#071515]/80 px-4 py-4 text-left text-sm text-[#e2e8f0] transition hover:border-[#06d6a0]/45"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {selected ? (
                        <>
                          <span className="font-mono text-xs text-[#06d6a0]">
                            {selected.id}
                          </span>
                          <span className="truncate text-[#94a3b8]">
                            {selected.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-[#475569]">
                          Choose a material...
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-[#64748b] transition ${open ? "rotate-180" : ""}`}
                    >
                      v
                    </span>
                  </button>

                  {open ? (
                    <div className="absolute z-40 mt-2 w-full rounded-xl border border-[#06d6a0]/20 bg-[#0d1f3c] p-2 shadow-2xl shadow-black/50">
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by id or formula..."
                        className="mb-2 w-full rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-[#e2e8f0] outline-none transition placeholder:text-[#64748b] focus:border-[#06d6a0]/45"
                      />
                      <div className="max-h-72 overflow-y-auto pr-1">
                        {searching ? (
                          <div className="px-3 py-4 text-sm text-[#64748b]">
                            Searching...
                          </div>
                        ) : materials.length ? (
                          materials.map((material) => (
                            <button
                              key={material.id}
                              type="button"
                              onClick={() => handleSelect(material)}
                              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-[#06d6a0]/8"
                            >
                              <span className="min-w-0">
                                <span className="block font-mono text-xs text-[#64748b]">
                                  {material.id}
                                </span>
                                <span className="block truncate text-sm text-[#e2e8f0]">
                                  {material.name}
                                </span>
                              </span>
                              <span
                                className={`shrink-0 rounded-full border px-2 py-1 text-[10px] ${
                                  material.isMetal
                                    ? "border-[#64748b]/35 bg-[#64748b]/15 text-[#94a3b8]"
                                    : "border-[#06d6a0]/25 bg-[#06d6a0]/10 text-[#06d6a0]"
                                }`}
                              >
                                {material.isMetal
                                  ? "metal"
                                  : `${material.actual.toFixed(2)} eV`}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-4 text-sm text-[#64748b]">
                            No matches.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-xl border border-white/6 bg-[#071515]/60 p-5 mb-6">
                <div className="mb-4 text-xs uppercase tracking-[0.12em] text-[#475569]">
                  Pipeline
                </div>
                {[
                  {
                    step: "01",
                    label: "Stage 1 classifier",
                    sub: "metal vs non-metal",
                    color: "#38bdf8",
                  },
                  {
                    step: "02",
                    label: "Stage 2 regressor",
                    sub: "bandgap eV",
                    color: "#06d6a0",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="mb-3 flex items-start gap-3 last:mb-0"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[10px] font-mono"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}33`,
                        background: `${item.color}12`,
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#e2e8f0]">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#64748b]">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {!loading && result && selected && (
                <LabelInfo material={selected} result={result} />
              )}

              {error ? (
                <div className="mt-4 rounded-xl border border-[#ef4444]/25 bg-[#ef4444]/10 p-4 text-sm text-[#fecaca]">
                  {error}
                </div>
              ) : null}
            </div>

            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-white/6 bg-[#071515]/70 px-6 py-16">
                  <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#06d6a0]/15 border-t-[#06d6a0]" />
                  <div className="text-center">
                    <div className="text-sm text-[#06d6a0]">
                      Running Model inference...
                    </div>
                    <div className="mt-1 text-xs text-[#475569]">
                      labels resolved from selected material id
                    </div>
                  </div>
                </div>
              ) : result && selected ? (
                <ResultCard result={result} material={selected} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
