import EnergyLevelDiagram from "./EnergyLevelDiagram";
import GlowDot from "./GlowDot";
import ProbBar from "./ProbBar";
import { InferenceResult, Material } from "@/lib/types";

const CAT_CONFIG = {
  metal: {
    label: "Metal",
    color: "#64748b",
    bg: "rgba(100,116,139,0.15)",
    border: "rgba(100,116,139,0.4)",
  },
  semiconductor: {
    label: "Semiconductor",
    color: "#06d6a0",
    bg: "rgba(6,214,160,0.12)",
    border: "rgba(6,214,160,0.4)",
  },
  insulator: {
    label: "Insulator",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.4)",
  },
};

function ResultCard({
  result,
  material,
}: {
  result: InferenceResult;
  material: Material;
}) {
  const cat = CAT_CONFIG[result.bandgapCategory];
  const error = Math.abs((result.bandgapEv || 0) - material.actual);

  return (
    <div className="animate-[result-rise_420ms_cubic-bezier(0.16,1,0.3,1)]">
      <div
        className="mb-4 rounded-xl p-5 backdrop-blur"
        style={{
          background:
            "linear-gradient(135deg, rgb(8 20 23), rgb(7 22 23 / 60%))",
          border: `1px solid ${cat.border}`,
        }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
              style={{ background: cat.bg, border: `1px solid ${cat.border}` }}
            >
              <GlowDot active={result.isMetal ? -1 : 1} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.08em]"
                style={{ color: cat.color }}
              >
                {cat.label}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-bold leading-none text-[#f1f5f9]">
                {result.bandgapEv !== null
                  ? result.bandgapEv.toFixed(3)
                  : "0.000"}
              </span>
              {!result.isMetal ? (
                <span className="text-base text-[#64748b]">eV</span>
              ) : null}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#475569]">
              Predicted bandgap
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-2xl font-semibold text-[#94a3b8]">
              {material.actual.toFixed(3)}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#475569]">
              Actual DFT
            </div>

            <div className="mt-2 font-mono text-xs text-[#f59e0b]">
              Delta {error.toFixed(3)} eV
            </div>
          </div>
        </div>

        <EnergyLevelDiagram
          bandgap={result.bandgapEv}
          isMetal={result.isMetal}
        />
      </div>

      <div className="mb-4 rounded-xl border border-white/6 bg-[#071515]/70 p-5">
        <div className="mb-3 text-xs uppercase tracking-[0.12em] text-[#475569]">
          Classification confidence
        </div>
        <ProbBar
          label="Non-metal"
          value={result.probNonMetal}
          color="#06d6a0"
        />
        <ProbBar label="Metal" value={result.probMetal} color="#64748b" />
      </div>
    </div>
  );
}

export default ResultCard;
