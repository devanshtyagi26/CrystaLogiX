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
      className="relative h-full min-h-105 w-full overflow-hidden rounded-lg bg-background"
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--app-accent-ice) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--app-accent-ice) / 0.055) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgb(var(--app-black)) 20%, transparent 76%)",
          maskImage:
            "radial-gradient(circle at center, rgb(var(--app-black)) 20%, transparent 76%)",
        }}
      />

      {bonds.map((bond) => (
        <div
          key={`${bond.left}-${bond.top}`}
          className="absolute h-px origin-left"
          style={{
            left: bond.left,
            top: bond.top,
            width: bond.width,
            transform: `rotate(${bond.rotate})`,
            backgroundImage:
              "linear-gradient(to right, transparent, rgba(var(--app-accent-cyan-soft) / 0.45), transparent)",
          }}
        />
      ))}

      {latticeNodes.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          className="absolute rounded-full border border-line/30 animate-[node-breathe_5.8s_ease-in-out_infinite]"
          style={{
            left: node.left,
            top: node.top,
            height: node.size,
            width: node.size,
            animationDelay: node.delay,
            backgroundImage:
              "radial-gradient(circle at 32% 28%, rgb(var(--app-text-strong)) 0%, rgb(var(--app-accent-cyan-soft)) 34%, rgb(var(--app-accent-lavender)) 72%, rgb(var(--app-background) / 0.4) 100%)",
            boxShadow: "0 0 24px rgb(var(--app-accent-cyan) / 0.42)",
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2">
        {ribbons.map((ribbon) => (
          <div
            key={ribbon.rotate}
            className="absolute rounded-full animate-[iridescent-orbit_var(--speed)_linear_infinite]"
            style={
              {
                inset: ribbon.inset,
                opacity: ribbon.opacity,
                transform: `rotate(${ribbon.rotate})`,
                "--speed": ribbon.speed,
                background:
                  "conic-gradient(from 20deg, transparent 0deg, rgb(var(--app-accent-cyan-soft) / 0.9) 42deg, rgb(var(--app-accent-magenta) / 0.92) 92deg, rgb(var(--app-accent-orange) / 0.82) 138deg, rgb(var(--app-accent-blue) / 0.78) 208deg, transparent 286deg)",
                maskImage:
                  "radial-gradient(ellipse at center, transparent 53%, rgb(var(--app-black)) 55%, rgb(var(--app-black)) 61%, transparent 64%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, transparent 53%, rgb(var(--app-black)) 55%, rgb(var(--app-black)) 61%, transparent 64%)",
              } as CSSProperties
            }
          />
        ))}

        <div
          className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 animate-[blob-think_7s_ease-in-out_infinite] rounded-[48%_52%_46%_54%/42%_45%_55%_58%] border border-line/24"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 28%, rgb(var(--app-panel)) 0%, rgb(var(--app-accent-ice)) 17%, rgb(var(--app-accent-pink)) 42%, rgb(var(--app-accent-yellow-hover) / 0.7) 64%, rgb(var(--app-surface) / 0.38) 100%)",
            boxShadow:
              "inset -18px -24px 38px rgb(51 26 82 / 0.34), inset 18px 18px 28px rgb(var(--app-panel) / 0.28), 0 0 90px rgb(var(--app-accent-cyan) / 0.34)",
          }}
        >
          <div
            className="absolute inset-[14%] rounded-[56%_44%_58%_42%/48%_62%_38%_52%] border border-line/30 blur-[0.2px]"
            style={{
              backgroundImage:
                "conic-gradient(from 120deg, rgb(var(--app-panel) / 0.52), rgb(var(--app-accent-cyan) / 0.14), rgb(var(--app-accent-yellow) / 0.38), rgb(var(--app-accent-pink) / 0.22), rgb(var(--app-panel) / 0.52))",
            }}
          />
          <div className="absolute left-[18%] top-[20%] h-[26%] w-[34%] rounded-full bg-panel/48 blur-xl" />
          <div className="absolute bottom-[18%] right-[16%] h-[22%] w-[28%] rounded-full bg-teal/36 blur-xl" />
        </div>

        <div className="absolute left-1/2 top-1/2 h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 animate-[slow-spin_22s_linear_infinite_reverse] rounded-full border border-dashed border-line/22" />

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
            stroke="rgb(var(--app-panel) / 0.16)"
            strokeDasharray="6 10"
          />
          <defs>
            <linearGradient id="bandA" x1="10" x2="390" y1="118" y2="88">
              <stop
                stopColor="rgb(var(--app-accent-cyan-soft))"
                stopOpacity="0"
              />
              <stop offset="0.5" stopColor="rgb(var(--app-accent-cyan-soft))" />
              <stop
                offset="1"
                stopColor="rgb(var(--app-accent-orange))"
                stopOpacity="0.45"
              />
            </linearGradient>
            <linearGradient id="bandB" x1="10" x2="390" y1="66" y2="30">
              <stop
                stopColor="rgb(var(--app-accent-magenta))"
                stopOpacity="0"
              />
              <stop offset="0.55" stopColor="rgb(var(--app-accent-magenta))" />
              <stop
                offset="1"
                stopColor="rgb(var(--app-accent-cyan-soft))"
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {thoughtDots.map((dot, index) => (
        <span
          key={dot.left}
          className="absolute rounded-full animate-[thought-pop_3.6s_ease-in-out_infinite]"
          style={{
            left: dot.left,
            top: dot.top,
            height: `${0.44 + index * 0.12}rem`,
            width: `${0.44 + index * 0.12}rem`,
            animationDelay: dot.delay,
            backgroundImage:
              "radial-gradient(circle at 35% 30%, rgb(var(--app-text-strong)), rgb(var(--app-accent-cyan-soft)) 44%, rgb(var(--app-accent-pink)) 100%)",
            boxShadow: "0 0 22px rgb(var(--app-accent-pink) / 0.55)",
          }}
        />
      ))}

      <div className="absolute inset-x-[22%] bottom-[13%] h-px bg-linear-to-r from-transparent via-teal/30 to-transparent" />
    </div>
  );
}

export default MotionAnimation;
