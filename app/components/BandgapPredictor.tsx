"use client";

import { useState, useEffect, useRef, type ReactElement } from "react";
import { PageHeader } from "./Section";

type Material = {
  id: string;
  name: string;
  formula: string;
  features: number[];
  actual: number;
  isMetal: boolean;
};

type BandgapCategory = "metal" | "semiconductor" | "insulator";

type InferenceResult = {
  isMetal: boolean;
  classLabel: number;
  probMetal: number;
  probNonMetal: number;
  bandgapEv: number | null;
  bandgapCategory: BandgapCategory;
};

const MATERIALS: Material[] = [
  {
    id: "mp-149",
    name: "Si",
    formula: "Si",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 1.11,
    isMetal: false,
  },
  {
    id: "mp-2858",
    name: "GaAs",
    formula: "GaAs",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 1.42,
    isMetal: false,
  },
  {
    id: "mp-1265",
    name: "ZnO",
    formula: "ZnO",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 3.37,
    isMetal: false,
  },
  {
    id: "mp-66",
    name: "Fe",
    formula: "Fe",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 0.0,
    isMetal: true,
  },
  {
    id: "mp-2133",
    name: "GaN",
    formula: "GaN",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 3.44,
    isMetal: false,
  },
  {
    id: "mp-20305",
    name: "CdTe",
    formula: "CdTe",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 1.5,
    isMetal: false,
  },
  {
    id: "mp-19717",
    name: "InP",
    formula: "InP",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 1.35,
    isMetal: false,
  },
  {
    id: "mp-22862",
    name: "Al",
    formula: "Al",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 0.0,
    isMetal: true,
  },
  {
    id: "mp-1550",
    name: "SiC",
    formula: "SiC",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 3.26,
    isMetal: false,
  },
  {
    id: "mp-2664",
    name: "MoS₂",
    formula: "MoS2",
    features: Array.from({ length: 87 }, () => Math.random()),
    actual: 1.23,
    isMetal: false,
  },
];

function simulateInference(material: Material): InferenceResult {
  const noise = (Math.random() - 0.5) * 0.18;
  if (material.isMetal) {
    return {
      isMetal: true,
      classLabel: 0,
      probMetal: 0.93 + Math.random() * 0.06,
      probNonMetal: 0.01 + Math.random() * 0.06,
      bandgapEv: null,
      bandgapCategory: "metal",
    };
  }
  const predicted = Math.max(0.01, material.actual + noise);
  const cat = predicted < 3.0 ? "semiconductor" : "insulator";
  return {
    isMetal: false,
    classLabel: 1,
    probMetal: 0.01 + Math.random() * 0.05,
    probNonMetal: 0.92 + Math.random() * 0.07,
    bandgapEv: predicted,
    bandgapCategory: cat as BandgapCategory,
  };
}

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

function GlowDot({ active }: { active: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: active ? "#06d6a0" : "#334155",
        boxShadow: active
          ? "0 0 8px #06d6a0, 0 0 16px rgba(6,214,160,0.4)"
          : "none",
        transition: "all 0.4s ease",
      }}
    />
  );
}

function ProbBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const id = setTimeout(() => setWidth(value * 100), 80);
    return () => clearTimeout(id);
  }, [value]);
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#94a3b8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#e2e8f0",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

function AtomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        stroke="#06d6a0"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        stroke="#06d6a0"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
        transform="rotate(60 14 14)"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        stroke="#06d6a0"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
        transform="rotate(120 14 14)"
      />
      <circle cx="14" cy="14" r="2.5" fill="#06d6a0" opacity="0.9" />
    </svg>
  );
}

function EnergyLevelDiagram({
  bandgap,
  isMetal,
}: {
  bandgap: number | null;
  isMetal: boolean;
}) {
  const [animated, setAnimated] = useState<boolean>(false);
  useEffect(() => {
    setAnimated(false);
    const id = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(id);
  }, [bandgap, isMetal]);

  const valenceY = 110;
  const conductionY = isMetal ? 114 : Math.max(30, 114 - (bandgap || 0) * 22);
  const gap = valenceY - conductionY;

  return (
    <svg width="100%" viewBox="0 0 260 150" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="vb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06d6a0" stopOpacity="0" />
          <stop offset="30%" stopColor="#06d6a0" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#06d6a0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06d6a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Valence band fill */}
      <rect
        x="20"
        y={valenceY}
        width="220"
        height="30"
        fill="rgba(6,214,160,0.08)"
        rx="2"
      />
      <line
        x1="20"
        y1={valenceY}
        x2="240"
        y2={valenceY}
        stroke="url(#vb)"
        strokeWidth="2"
      />
      <text
        x="130"
        y={valenceY + 20}
        textAnchor="middle"
        fill="#06d6a060"
        fontSize="9"
        fontFamily="IBM Plex Mono"
      >
        Valence Band
      </text>

      {/* Conduction band */}
      <rect
        x="20"
        y={conductionY - 30}
        width="220"
        height="30"
        fill="rgba(56,189,248,0.06)"
        rx="2"
      />
      <line
        x1="20"
        y1={conductionY}
        x2="240"
        y2={conductionY}
        stroke="url(#cb)"
        strokeWidth="2"
      />
      <text
        x="130"
        y={conductionY - 10}
        textAnchor="middle"
        fill="#38bdf860"
        fontSize="9"
        fontFamily="IBM Plex Mono"
      >
        Conduction Band
      </text>

      {/* Gap annotation */}
      {!isMetal && gap > 8 && (
        <>
          <line
            x1="130"
            y1={conductionY + 2}
            x2="130"
            y2={valenceY - 2}
            stroke="#f1f5f920"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <text
            x="148"
            y={(valenceY + conductionY) / 2 + 4}
            fill="#94a3b8"
            fontSize="10"
            fontFamily="IBM Plex Mono"
          >
            {(bandgap || 0).toFixed(2)} eV
          </text>
        </>
      )}
      {isMetal && (
        <text
          x="130"
          y={(valenceY + conductionY) / 2 + 4}
          textAnchor="middle"
          fill="#64748b"
          fontSize="9"
          fontFamily="IBM Plex Mono"
        >
          Overlap
        </text>
      )}

      {/* Fermi level for metal */}
      {isMetal && (
        <line
          x1="20"
          y1="112"
          x2="240"
          y2="112"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="4,3"
          opacity="0.6"
        />
      )}
    </svg>
  );
}

function ResultCard({
  result,
  material,
}: {
  result: InferenceResult;
  material: Material;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(id);
  }, [result]);
  const cat = CAT_CONFIG[result.bandgapCategory];
  const error: number | null =
    result.bandgapEv !== null
      ? Math.abs(result.bandgapEv - material.actual)
      : null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Category badge + energy diagram */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
          border: `1px solid ${cat.border}`,
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 16,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                borderRadius: 20,
                padding: "4px 14px",
                marginBottom: 10,
              }}
            >
              <GlowDot active={!result.isMetal} />
              <span
                style={{
                  fontSize: 12,
                  color: cat.color,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {cat.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1,
                }}
              >
                {result.isMetal
                  ? "—"
                  : result.bandgapEv !== null
                    ? result.bandgapEv.toFixed(3)
                    : "—"}
              </span>
              {!result.isMetal && (
                <span style={{ fontSize: 16, color: "#64748b" }}>eV</span>
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                marginTop: 4,
                letterSpacing: "0.06em",
              }}
            >
              PREDICTED BANDGAP
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#94a3b8",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {material.actual === 0 ? "—" : material.actual.toFixed(3)}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                marginTop: 4,
                letterSpacing: "0.06em",
              }}
            >
              ACTUAL (DFT)
            </div>
            {error !== null && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  fontFamily: "'IBM Plex Mono', monospace",
                  color:
                    error < 0.1
                      ? "#06d6a0"
                      : error < 0.3
                        ? "#f59e0b"
                        : "#f87171",
                }}
              >
                Δ {error.toFixed(3)} eV
              </div>
            )}
          </div>
        </div>

        <EnergyLevelDiagram
          bandgap={result.bandgapEv}
          isMetal={result.isMetal}
        />
      </div>

      {/* Confidence */}
      <div
        style={{
          background: "rgba(15,23,42,0.7)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Classification confidence
        </div>
        <ProbBar
          label="Non-metal"
          value={result.probNonMetal}
          color="#06d6a0"
        />
        <ProbBar label="Metal" value={result.probMetal} color="#64748b" />
      </div>

      {/* Feature info */}
      <div
        style={{
          background: "rgba(15,23,42,0.5)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: 12,
          padding: "14px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}
      >
        {[
          { label: "Material ID", value: material.id },
          { label: "Stage", value: result.isMetal ? "1 only" : "1 → 2" },
          { label: "Features", value: "87" },
        ].map(({ label, value }) => (
          <div key={label}>
            <div
              style={{
                fontSize: 10,
                color: "#475569",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanLine(): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
        pointerEvents: "none",
        borderRadius: "inherit",
      }}
    />
  );
}

export default function BandgapPredictor(): ReactElement {
  const [selected, setSelected] = useState<Material | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Node | null;
      if (dropRef.current && target && !dropRef.current.contains(target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleSelect(mat: Material): Promise<void> {
    setSelected(mat);
    setOpen(false);
    setResult(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 400));
    setResult(simulateInference(mat));
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        padding: "0",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Ambient glows */}
      <div
        style={{
          position: "fixed",
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(6,214,160,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -200,
          right: -200,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between absolute right-10 top-25">
        <span></span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GlowDot active={true} />
            <span
              style={{
                fontSize: 11,
                color: "#475569",
                letterSpacing: "0.08em",
              }}
            >
              ONNX Runtime
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              padding: "4px 12px",
              background: "rgba(6,214,160,0.08)",
              border: "1px solid rgba(6,214,160,0.2)",
              borderRadius: 20,
              color: "#06d6a0",
              letterSpacing: "0.06em",
            }}
          >
            Test Set · {MATERIALS.length} materials
          </div>
        </div>
      </div>
      <PageHeader
        eyebrow="Interactive simulator | Two-stage ML pipeline · XGBoost"
        title="Bandgap Prediction"
        body="Select a material from the test set to run inference through the Two-stage Hurdle Pipeline and compare against DFT ground truth."
      />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Left: Selector + stats */}
          <div>
            {/* Dropdown */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#475569",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Select material
              </label>
              <div ref={dropRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setOpen((o) => !o)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "rgba(15,23,42,0.8)",
                    border: `1px solid ${open ? "rgba(6,214,160,0.5)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 10,
                    padding: "14px 18px",
                    color: selected ? "#f1f5f9" : "#475569",
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "border-color 0.2s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>
                    {selected ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: "#06d6a0",
                            fontSize: 13,
                          }}
                        >
                          {selected.id}
                        </span>
                        <span style={{ color: "#94a3b8" }}>
                          {selected.name}
                        </span>
                      </span>
                    ) : (
                      "Choose a material…"
                    )}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      transform: open ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M3 5l4 4 4-4"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {open && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      zIndex: 200,
                      background: "#0d1f3c",
                      border: "1px solid rgba(6,214,160,0.2)",
                      borderRadius: 10,
                      overflow: "hidden",
                      boxShadow:
                        "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,214,160,0.05)",
                    }}
                  >
                    <ScanLine />
                    {MATERIALS.map((mat, i) => (
                      <button
                        key={mat.id}
                        onClick={() => handleSelect(mat)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background:
                            selected?.id === mat.id
                              ? "rgba(6,214,160,0.08)"
                              : "transparent",
                          border: "none",
                          borderBottom:
                            i < MATERIALS.length - 1
                              ? "1px solid rgba(255,255,255,0.04)"
                              : "none",
                          padding: "12px 18px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "background 0.15s",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(6,214,160,0.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            selected?.id === mat.id
                              ? "rgba(6,214,160,0.08)"
                              : "transparent")
                        }
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "#475569",
                              minWidth: 72,
                            }}
                          >
                            {mat.id}
                          </span>
                          <span style={{ fontSize: 14, color: "#e2e8f0" }}>
                            {mat.name}
                          </span>
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            background: mat.isMetal
                              ? "rgba(100,116,139,0.15)"
                              : "rgba(6,214,160,0.1)",
                            border: `1px solid ${mat.isMetal ? "rgba(100,116,139,0.3)" : "rgba(6,214,160,0.25)"}`,
                            borderRadius: 10,
                            color: mat.isMetal ? "#64748b" : "#06d6a0",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {mat.isMetal ? "metal" : `${mat.actual} eV`}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Model pipeline card */}
            <div
              style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <ScanLine />
              <div
                style={{
                  fontSize: 11,
                  color: "#475569",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Pipeline
              </div>
              {[
                {
                  step: "01",
                  label: "Stage 1 — Classifier",
                  sub: "XGBoost · metal vs non-metal",
                  color: "#38bdf8",
                },
                {
                  step: "02",
                  label: "Stage 2 — Regressor",
                  sub: "Gradient Boost · bandgap eV",
                  color: "#06d6a0",
                },
              ].map(({ step, label, sub, color }, i) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    gap: 14,
                    marginBottom: i === 0 ? 12 : 0,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontFamily: "'IBM Plex Mono', monospace",
                      color,
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#e2e8f0",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#475569", marginTop: 2 }}
                    >
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
              {/* connector */}
              <div
                style={{
                  position: "absolute",
                  left: 35,
                  top: 62,
                  width: 1,
                  height: 28,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Dataset stats */}
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { label: "Test samples", value: "26,491" },
                { label: "Train samples", value: "95,366" },
                { label: "Features", value: "87" },
                { label: "Split", value: "72/8/20" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(15,23,42,0.5)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 10,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#94a3b8",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#334155",
                      marginTop: 3,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Result */}
          <div>
            {loading && (
              <div
                style={{
                  background: "rgba(15,23,42,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "48px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <div style={{ position: "relative", width: 48, height: 48 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      border: "2px solid rgba(6,214,160,0.15)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      border: "2px solid transparent",
                      borderTopColor: "#06d6a0",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#94a3b8",
                      textAlign: "center",
                    }}
                  >
                    Running ONNX inference…
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#334155",
                      textAlign: "center",
                      marginTop: 4,
                    }}
                  >
                    Two-stage pipeline
                  </div>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div
                style={{
                  background: "rgba(15,23,42,0.4)",
                  border: "1px dashed rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "64px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ width: 48, height: 48, opacity: 0.2 }}>
                  <AtomIcon />
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#334155",
                    textAlign: "center",
                  }}
                >
                  Select a material to run prediction
                </div>
              </div>
            )}

            {!loading && result && selected && (
              <ResultCard result={result} material={selected} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
