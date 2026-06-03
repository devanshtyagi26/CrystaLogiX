"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { benchmarkLift } from "../data/research";

function BenchmarkLiftBars() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

          return (
            <div key={item.model} className="grid gap-3 rounded-md p-1.5">
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

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
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
