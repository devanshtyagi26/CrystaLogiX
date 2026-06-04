import { Material, InferenceResult } from "@/lib/types";

function LabelInfo({
  material,
  result,
}: {
  material: Material;
  result: InferenceResult;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/5 bg-[#071515]/50 p-4">
      {[
        { label: "Material ID", value: material.id },
        { label: "Stage", value: result.isMetal ? "1 only" : "1 to 2" },
        { label: "Labels", value: "server-side" },
      ].map(({ label, value }) => (
        <div key={label}>
          <div className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#475569]">
            {label}
          </div>
          <div className="truncate font-mono text-xs text-[#94a3b8]">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabelInfo;
