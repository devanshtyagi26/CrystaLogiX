"use client";
import { useEffect, useState } from "react";

function ProbBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setWidth(value * 100), 80);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="uppercase tracking-[0.12em] text-[#94a3b8]">
          {label}
        </span>
        <span className="font-mono text-[#e2e8f0]">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded bg-white/8">
        <div
          className="h-full rounded transition-[width] duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

export default ProbBar;
