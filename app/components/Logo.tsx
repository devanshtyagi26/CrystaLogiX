"use client";
function Logo() {
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

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div className="animate-[spin_15s_linear_infinite]">
        <AtomIcon />
      </div>
      <div>
        <div
          style={{
            fontSize: 15,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: "#f1f5f9",
          }}
        >
          CrystaLogiX
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#475569",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: -2,
          }}
        >
          Materials Intelligence
        </div>
      </div>
    </div>
  );
}

export default Logo;
