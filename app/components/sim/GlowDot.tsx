function GlowDot({ active }: { active: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background:
          active === 1
            ? "#06d6a0"
            : active === -1
              ? "#ef4444"
              : active === 0
                ? "#f59e0b"
                : "#334155",
        boxShadow:
          active === 1
            ? "0 0 8px #06d6a0, 0 0 16px rgba(6,214,160,0.4)"
            : active === -1
              ? "0 0 8px #ef4444, 0 0 16px rgba(239,68,68,0.4)"
              : active === 0
                ? "0 0 8px #f59e0b, 0 0 16px rgba(245,158,11,0.35)"
                : "none",
        transition: "all 0.4s ease",
      }}
    />
  );
}

export default GlowDot;
