"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { benchmarkLift } from "../data/research";

type HoverCard = {
  model: string;
  note: string;
  improvement: number;
  x: number;
  y: number;
};

function BenchmarkLiftBars() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState<HoverCard | null>(null);

  const maxMae = useMemo(
    () => Math.max(...benchmarkLift.map((item) => item.mae)),
    [],
  );
  useEffect(() => {
    const node = chartRef.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);
  return (
    <div ref={chartRef} className="mt-8 space-y-5">
      <div className="flex items-center justify-between gap-4 text-xs tracking-[0.18em] text-[#9fb7b2]">
        <span>MODEL</span>
        <span>MAE, eV</span>
      </div>

      <div className="space-y-4">
        {benchmarkLift.map((item, index) => {
          const width = isVisible ? `${(item.mae / maxMae) * 100}%` : "0%";
          const isCurrentModel = item.model === "CrystaLogiX";
          const isHovered = hoverCard?.model === item.model;

          return (
            <div
              key={item.model}
              className="relative grid gap-3 rounded-md p-1.5"
              onMouseEnter={(event) => {
                setHoverCard({
                  model: item.model,
                  note: item.note,
                  improvement: item.improvement,
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              onMouseMove={(event) => {
                setHoverCard((current) =>
                  current
                    ? {
                        ...current,
                        x: event.clientX,
                        y: event.clientY,
                      }
                    : current,
                );
              }}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#fffaf0]">
                    {item.model}
                  </p>
                </div>
                <p className="font-mono text-sm font-semibold text-[#fffaf0]">
                  {item.mae.toFixed(4)}eV
                </p>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-white/10"
                style={{
                  transform: isHovered ? "scale(1.01)" : "scale(1)",
                  boxShadow: isHovered
                    ? isCurrentModel
                      ? "2px 3px 16px rgb(0 97 169 / 60%)"
                      : "2px 3px 16px rgb(169 83 0 / 60%)"
                    : "none",
                }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width,
                    transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                    background: isCurrentModel
                      ? "#7de2d6"
                      : "linear-gradient(to right, #fb5d52, #fbbc4f)",
                  }}
                />
              </div>

              {hoverCard?.model === item.model ? (
                <div
                  className="pointer-events-none fixed z-50 max-w-xs -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#071012] px-3 py-2 text-xs leading-5 text-[#dce7e4] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  style={{ left: hoverCard.x, top: hoverCard.y - 12 }}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[#7de2d6]">
                    {hoverCard.model}
                  </p>
                  <p className="mt-1 text-[#fffaf0]">{hoverCard.note}</p>
                  {hoverCard.improvement > 0 ? (
                    <p className="mt-2 font-mono text-[0.7rem] text-[#fbbc4f]">
                      MAE reduction: {hoverCard.improvement}%
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="text-xs leading-6 text-[#9fb7b2]">
        Lower MAE is better. Baseline MAEs are back-calculated from the
        dissertation&apos;s reported percentage improvements over CGCNN, MEGNet,
        and GATGNN.
      </p>
    </div>
  );
}

export default BenchmarkLiftBars;
