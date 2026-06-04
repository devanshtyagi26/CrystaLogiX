function EnergyLevelDiagram({
  bandgap,
  isMetal,
}: {
  bandgap: number | null;
  isMetal: boolean;
}) {
  const valenceY = 110;
  const conductionY = isMetal ? 114 : Math.max(30, 114 - (bandgap || 0) * 22);
  const gap = valenceY - conductionY;

  return (
    <svg width="100%" viewBox="0 0 260 150" className="overflow-visible">
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
      >
        Valence Band
      </text>

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
      >
        Conduction Band
      </text>

      {!isMetal && gap > 8 ? (
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
          >
            {(bandgap || 0).toFixed(2)} eV
          </text>
        </>
      ) : null}

      {isMetal ? (
        <>
          <text
            x="130"
            y={(valenceY + conductionY) / 2 + 4}
            textAnchor="middle"
            fill="#64748b"
            fontSize="9"
          >
            Overlap
          </text>
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
        </>
      ) : null}
    </svg>
  );
}

export default EnergyLevelDiagram;
