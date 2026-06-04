import { ReactElement } from "react";
import GlowDot from "./GlowDot";

function StatusLoaderIcon({
  state,
  color,
}: {
  state: "connecting" | "down";
  color: string;
}): ReactElement {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <defs>
        <linearGradient id={`status-ring-${state}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle
        cx="42"
        cy="42"
        r="28"
        stroke={color}
        strokeOpacity="0.14"
        strokeWidth="2"
      />
      {state === "connecting" ? (
        <>
          <circle
            cx="42"
            cy="42"
            r="18"
            stroke={`url(#status-ring-${state})`}
            strokeWidth="3"
            strokeDasharray="10 7"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 42 42"
              to="360 42 42"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="42" cy="42" r="7" fill={color} fillOpacity="0.88" />
          <circle cx="42" cy="16" r="4" fill={color}>
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="62" cy="46" r="4" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0.25;1"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="24" cy="49" r="4" fill={color}>
            <animate
              attributeName="opacity"
              values="0.35;1;0.35"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      ) : (
        <>
          <path
            d="M34 28h16l8 10v18c0 2.2-1.8 4-4 4H30c-2.2 0-4-1.8-4-4V32c0-2.2 1.8-4 4-4z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M34 38h16"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M34 46h10"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M50 50l10 10"
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M60 50l-10 10"
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function StatusFallbackCard({
  state,
}: {
  state: "connecting" | "down";
}): ReactElement {
  const isConnecting = state === "connecting";
  const color = isConnecting ? "#f59e0b" : "#ef4444";
  const title = isConnecting ? "Model Connecting" : "Server Down";
  const body = isConnecting
    ? "The runtime health probe is still pending."
    : "The inference server is unavailable right now.";
  const detail = isConnecting
    ? "Waiting for the model endpoint to report healthy status."
    : "We will notify you once it's back online.";

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "72px auto 0",
        padding: "28px 24px",
        borderRadius: 18,
        border: `1px solid ${color}33`,
        background: "linear-gradient(135deg, rgb(8 20 23), rgb(7 22 23 / 60%))",
        boxShadow: `0 24px 56px rgba(0,0,0,0.36), 0 0 0 1px ${color}12`,
        display: "grid",
        gridTemplateColumns: "92px 1fr",
        gap: 20,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 24,
          display: "grid",
          placeItems: "center",
          background: `${color}10`,
          border: `1px solid ${color}24`,
        }}
      >
        <StatusLoaderIcon state={state} color={color} />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <GlowDot active={isConnecting ? 0 : -1} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color,
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#f8fafc",
            marginBottom: 8,
          }}
        >
          {isConnecting
            ? "Initializing the model health check"
            : "Inference service is offline"}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#94a3b8",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          {body}
          <br />
          {detail}
        </div>
        <div
          style={{
            marginTop: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            borderRadius: 999,
            background: `${color}12`,
            border: `1px solid ${color}22`,
            color,
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          {isConnecting ? "PLEASE WAIT" : "RETRY AFTER SOME TIME"}
        </div>
      </div>
    </div>
  );
}

export default StatusFallbackCard;
