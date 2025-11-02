// src/components/LoadingSpinner.tsx
import React from "react";

type LoadingSpinnerProps = {
  /** Diameter in pixels */
  size?: number;
  /** Spinner color (defaults to Spotify green) */
  color?: string;
  /** Accessible label (screen readers) */
  label?: string;
  /** If true, covers the viewport and centers the spinner */
  fullscreen?: boolean;
  /** If true with fullscreen, adds a subtle dim overlay */
  dimBackground?: boolean;
};

const SPOTIFY_GREEN = "#1DB954";
const SPOTIFY_BLACK = "#121212"; // used only for overlay tint

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const centerBox: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  zIndex: 9999,
};

export default function LoadingSpinner({
  size = 40,
  color = SPOTIFY_GREEN,
  label = "Loading…",
  fullscreen = false,
  dimBackground = true,
}: LoadingSpinnerProps) {
  const spinner = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      role="img"
      aria-label={label}
      aria-live="polite"
    >
      {/* Background circle (track) */}
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="4"
      />
      {/* Animated arc */}
      <circle
        cx="22"
        cy="22"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="28 113"
      >
        {/* Dash “pulse” */}
        <animate
          attributeName="stroke-dasharray"
          values="28 113; 90 51; 28 113"
          dur="1.4s"
          repeatCount="indefinite"
        />
        {/* Rotate */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 22 22"
          to="360 22 22"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Use currentColor so we can set via style */}
      <title>{label}</title>
    </svg>
  );

  if (fullscreen) {
    return (
      <div
        role="status"
        style={{
          ...centerBox,
          background:
            dimBackground ? `${SPOTIFY_BLACK}cc` /* ~80% */ : "transparent",
          color, // sets currentColor for the SVG
        }}
      >
        {spinner}
        {/* Optional visible text under spinner (kept for a11y offscreen instead) */}
        <span style={srOnly}>{label}</span>
      </div>
    );
  }

  // Inline (non-fullscreen) version
  return (
    <span
      role="status"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color, // sets currentColor for the SVG
      }}
    >
      {spinner}
      <span style={srOnly}>{label}</span>
    </span>
  );
}
