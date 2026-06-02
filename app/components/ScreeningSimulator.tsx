"use client";

import { useMemo, useState } from "react";
import { sampleMaterials } from "../data/research";

type Confidence = "90" | "95";

export function ScreeningSimulator() {
  const [activeFormula, setActiveFormula] = useState(sampleMaterials[2].formula);
  const [threshold, setThreshold] = useState(0.28);
  const [confidence, setConfidence] = useState<Confidence>("95");
  const [riskTolerance, setRiskTolerance] = useState(45);

  const active = sampleMaterials.find((item) => item.formula === activeFormula) ?? sampleMaterials[0];
  const nonmetalProbability = 1 - active.metallicProbability;
  const isNonmetal = nonmetalProbability > threshold;
  const interval = confidence === "95" ? active.interval95 : active.interval90;
  const lower = Math.max(0, active.prediction - interval);
  const upper = active.prediction + interval;
  const routedPrediction = isNonmetal ? active.prediction : 0;
  const widthPenalty = interval * (1 - riskTolerance / 100);
  const acquisitionScore = Math.max(0, routedPrediction - widthPenalty);

  const ranked = useMemo(
    () =>
      sampleMaterials
        .map((item) => {
          const pNonmetal = 1 - item.metallicProbability;
          const routed = pNonmetal > threshold;
          const itemInterval = confidence === "95" ? item.interval95 : item.interval90;
          const score = routed ? Math.max(0, item.prediction - itemInterval * (1 - riskTolerance / 100)) : 0;

          return { ...item, pNonmetal, routed, score };
        })
        .sort((a, b) => b.score - a.score),
    [confidence, riskTolerance, threshold],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">Controls</p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#fffaf0]">Candidate material</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sampleMaterials.map((item) => (
              <button
                key={item.formula}
                type="button"
                onClick={() => setActiveFormula(item.formula)}
                className={`h-12 rounded-md border px-3 text-sm font-semibold transition ${
                  activeFormula === item.formula
                    ? "border-[#fbbc4f] bg-[#fbbc4f] text-[#071012]"
                    : "border-white/10 bg-[#071012]/50 text-[#d5dfdc] hover:border-[#7de2d6]/45"
                }`}
              >
                {item.formula}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-8 block">
          <span className="flex items-center justify-between text-sm font-semibold text-[#fffaf0]">
            <span>Classifier threshold</span>
            <span className="text-[#fbbc4f]">{threshold.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.2"
            max="0.7"
            step="0.01"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
            className="mt-4 w-full accent-[#fbbc4f]"
          />
          <span className="mt-2 flex justify-between text-xs uppercase tracking-[0.14em] text-[#9fb7b2]">
            <span>high recall</span>
            <span>strict gate</span>
          </span>
        </label>

        <div className="mt-8">
          <p className="text-sm font-semibold text-[#fffaf0]">Prediction interval</p>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-white/10 bg-[#071012]/50 p-1">
            {(["90", "95"] as Confidence[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setConfidence(item)}
                className={`h-10 rounded text-sm font-semibold transition ${
                  confidence === item
                    ? "bg-[#7de2d6] text-[#071012]"
                    : "text-[#b9c7c3] hover:bg-white/8"
                }`}
              >
                PI{item}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-8 block">
          <span className="flex items-center justify-between text-sm font-semibold text-[#fffaf0]">
            <span>Risk tolerance</span>
            <span className="text-[#7de2d6]">{riskTolerance}%</span>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={riskTolerance}
            onChange={(event) => setRiskTolerance(Number(event.target.value))}
            className="mt-4 w-full accent-[#7de2d6]"
          />
          <span className="mt-2 flex justify-between text-xs uppercase tracking-[0.14em] text-[#9fb7b2]">
            <span>narrow intervals</span>
            <span>larger predicted Eg</span>
          </span>
        </label>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-[#0b1517] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">Live route</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#fffaf0]">{active.formula}</h2>
              <p className="mt-2 text-sm text-[#9fb7b2]">{active.family}</p>
            </div>
            <div className={`rounded-md px-4 py-3 text-sm font-semibold ${isNonmetal ? "bg-[#7de2d6] text-[#071012]" : "bg-[#fb5d52] text-white"}`}>
              {isNonmetal ? "Stage 2: regress" : "Stage 1: Eg = 0"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Readout label="p(nonmetal)" value={nonmetalProbability.toFixed(2)} />
            <Readout label="Predicted Eg" value={`${routedPrediction.toFixed(2)} eV`} />
            <Readout label="Acquisition score" value={acquisitionScore.toFixed(2)} />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#9fb7b2]">
              <span>0 eV</span>
              <span>5 eV</span>
            </div>
            <div className="relative mt-3 h-16 rounded-md border border-white/10 bg-[#071012]">
              {isNonmetal ? (
                <>
                  <div
                    className="absolute top-4 h-8 rounded bg-[#fbbc4f]/25"
                    style={{
                      left: `${Math.min(96, (lower / 5) * 100)}%`,
                      width: `${Math.max(2, Math.min(98, ((upper - lower) / 5) * 100))}%`,
                    }}
                  />
                  <div
                    className="absolute top-2 h-12 w-1 rounded bg-[#fbbc4f]"
                    style={{ left: `${Math.min(98, (active.prediction / 5) * 100)}%` }}
                  />
                </>
              ) : (
                <div className="absolute left-0 top-0 h-full w-2 bg-[#fb5d52]" />
              )}
            </div>
            <p className="mt-3 text-sm text-[#b9c7c3]">
              {isNonmetal
                ? `PI${confidence}: ${lower.toFixed(2)}-${upper.toFixed(2)} eV`
                : "Routed as metallic, so the regressor is skipped and Eg is set to 0 eV."}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
            Current screening rank
          </p>
          <div className="mt-5 space-y-3">
            {ranked.map((item, index) => (
              <button
                key={item.formula}
                type="button"
                onClick={() => setActiveFormula(item.formula)}
                className="grid w-full grid-cols-[36px_1fr_80px] items-center gap-3 rounded-md border border-white/10 bg-[#071012]/50 p-3 text-left transition hover:border-[#7de2d6]/45"
              >
                <span className="text-sm font-semibold text-[#fbbc4f]">{index + 1}</span>
                <span>
                  <span className="block text-sm font-semibold text-[#fffaf0]">{item.formula}</span>
                  <span className="block text-xs text-[#9fb7b2]">
                    {item.routed ? "nonmetal route" : "metal route"}
                  </span>
                </span>
                <span className="text-right text-sm font-semibold text-[#7de2d6]">
                  {item.score.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[#9fb7b2]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-[#fffaf0]">{value}</p>
    </div>
  );
}
