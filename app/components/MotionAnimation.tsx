"use client";

import type { CSSProperties } from "react";

const latticeNodes = [
  { left: "22%", top: "28%", size: "0.58rem", delay: "0s" },
  { left: "33%", top: "20%", size: "0.46rem", delay: "-1.2s" },
  { left: "46%", top: "30%", size: "0.72rem", delay: "-2.1s" },
  { left: "64%", top: "22%", size: "0.52rem", delay: "-0.7s" },
  { left: "76%", top: "34%", size: "0.64rem", delay: "-2.8s" },
  { left: "29%", top: "52%", size: "0.72rem", delay: "-3.4s" },
  { left: "50%", top: "50%", size: "0.5rem", delay: "-1.9s" },
  { left: "70%", top: "56%", size: "0.78rem", delay: "-4.2s" },
  { left: "38%", top: "73%", size: "0.54rem", delay: "-2.6s" },
  { left: "58%", top: "78%", size: "0.66rem", delay: "-0.4s" },
];

const bonds = [
  { left: "24%", top: "31%", width: "26%", rotate: "-21deg" },
  { left: "45%", top: "31%", width: "22%", rotate: "-16deg" },
  { left: "31%", top: "51%", width: "22%", rotate: "-5deg" },
  { left: "50%", top: "52%", width: "22%", rotate: "14deg" },
  { left: "40%", top: "72%", width: "20%", rotate: "8deg" },
  { left: "31%", top: "24%", width: "31%", rotate: "19deg" },
];

const ribbons = [
  { inset: "18%", rotate: "12deg", speed: "18s", opacity: 0.84 },
  { inset: "22%", rotate: "-34deg", speed: "24s", opacity: 0.68 },
  { inset: "27%", rotate: "63deg", speed: "31s", opacity: 0.48 },
];

const thoughtDots = [
  { left: "78%", top: "18%", delay: "0s" },
  { left: "84%", top: "27%", delay: "-0.5s" },
  { left: "87%", top: "39%", delay: "-1s" },
];

function MotionAnimation() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-[420px] w-full overflow-hidden rounded-lg bg-[#071012]"
    >
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(111,255,220,0.15),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(230,137,255,0.16),transparent_30%),radial-gradient(circle_at_50%_72%,rgba(255,209,120,0.13),transparent_30%),linear-gradient(145deg,#061012_0%,#0b1520_48%,#071012_100%)]" /> */}
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(183,255,242,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(183,255,242,0.055)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_center,black_20%,transparent_76%)]" />

      {bonds.map((bond) => (
        <div
          key={`${bond.left}-${bond.top}`}
          className="absolute h-px origin-left bg-gradient-to-r from-transparent via-[#aaf8ee]/45 to-transparent"
          style={{
            left: bond.left,
            top: bond.top,
            width: bond.width,
            transform: `rotate(${bond.rotate})`,
          }}
        />
      ))}

      {latticeNodes.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          className="absolute rounded-full border border-white/30 bg-[radial-gradient(circle_at_32%_28%,#fffaf0_0%,#aaf8ee_34%,#ba8cff_72%,rgba(7,16,18,0.4)_100%)] shadow-[0_0_24px_rgba(125,226,214,0.42)] animate-[node-breathe_5.8s_ease-in-out_infinite]"
          style={{
            left: node.left,
            top: node.top,
            height: node.size,
            width: node.size,
            animationDelay: node.delay,
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2">
        {ribbons.map((ribbon) => (
          <div
            key={ribbon.rotate}
            className="absolute rounded-full animate-[iridescent-orbit_var(--speed)_linear_infinite]"
            style={{
              inset: ribbon.inset,
              opacity: ribbon.opacity,
              transform: `rotate(${ribbon.rotate})`,
              "--speed": ribbon.speed,
              background:
                "conic-gradient(from 20deg, transparent 0deg, rgba(132,255,232,0.9) 42deg, rgba(236,151,255,0.92) 92deg, rgba(255,218,144,0.82) 138deg, rgba(142,180,255,0.78) 208deg, transparent 286deg)",
              maskImage:
                "radial-gradient(ellipse at center, transparent 53%, black 55%, black 61%, transparent 64%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, transparent 53%, black 55%, black 61%, transparent 64%)",
            } as CSSProperties}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 animate-[blob-think_7s_ease-in-out_infinite] rounded-[48%_52%_46%_54%/42%_45%_55%_58%] border border-white/24 bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.98)_0%,rgba(180,255,241,0.95)_17%,rgba(209,145,255,0.86)_42%,rgba(255,208,122,0.7)_64%,rgba(27,51,56,0.38)_100%)] shadow-[inset_-18px_-24px_38px_rgba(51,26,82,0.34),inset_18px_18px_28px_rgba(255,255,255,0.28),0_0_90px_rgba(125,226,214,0.34)]">
          <div className="absolute inset-[14%] rounded-[56%_44%_58%_42%/48%_62%_38%_52%] border border-white/30 bg-[conic-gradient(from_120deg,rgba(255,255,255,0.52),rgba(125,226,214,0.14),rgba(251,188,79,0.38),rgba(221,125,255,0.22),rgba(255,255,255,0.52))] blur-[0.2px]" />
          <div className="absolute left-[18%] top-[20%] h-[26%] w-[34%] rounded-full bg-white/48 blur-xl" />
          <div className="absolute bottom-[18%] right-[16%] h-[22%] w-[28%] rounded-full bg-[#7de2d6]/36 blur-xl" />
        </div>

        <div className="absolute left-1/2 top-1/2 h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 animate-[slow-spin_22s_linear_infinite_reverse] rounded-full border border-dashed border-white/22" />

        <svg
          className="absolute inset-x-[14%] bottom-[17%] h-[26%] w-[72%] opacity-80"
          viewBox="0 0 400 160"
          fill="none"
        >
          <path
            d="M10 118 C70 142 112 86 170 106 C230 128 270 64 390 88"
            stroke="url(#bandA)"
            strokeWidth="3"
          />
          <path
            d="M10 66 C76 44 118 86 174 58 C236 24 284 48 390 30"
            stroke="url(#bandB)"
            strokeWidth="3"
          />
          <path
            d="M20 93 L380 59"
            stroke="rgba(255,255,255,0.16)"
            strokeDasharray="6 10"
          />
          <defs>
            <linearGradient id="bandA" x1="10" x2="390" y1="118" y2="88">
              <stop stopColor="#A8FFF0" stopOpacity="0" />
              <stop offset="0.5" stopColor="#A8FFF0" />
              <stop offset="1" stopColor="#FFC875" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="bandB" x1="10" x2="390" y1="66" y2="30">
              <stop stopColor="#EC97FF" stopOpacity="0" />
              <stop offset="0.55" stopColor="#EC97FF" />
              <stop offset="1" stopColor="#A8FFF0" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {thoughtDots.map((dot, index) => (
        <span
          key={dot.left}
          className="absolute rounded-full bg-[radial-gradient(circle_at_35%_30%,#fffaf0,#aaf8ee_44%,#d891ff_100%)] shadow-[0_0_22px_rgba(216,145,255,0.55)] animate-[thought-pop_3.6s_ease-in-out_infinite]"
          style={{
            left: dot.left,
            top: dot.top,
            height: `${0.44 + index * 0.12}rem`,
            width: `${0.44 + index * 0.12}rem`,
            animationDelay: dot.delay,
          }}
        />
      ))}

      {/* <div className="absolute inset-x-[18%] top-[14%] h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" /> */}
      <div className="absolute inset-x-[22%] bottom-[13%] h-px bg-gradient-to-r from-transparent via-[#7de2d6]/30 to-transparent" />
    </div>
  );
}

export default MotionAnimation;
