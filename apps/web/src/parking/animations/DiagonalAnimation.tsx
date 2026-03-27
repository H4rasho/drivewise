import { motion } from "framer-motion";

// Bird's-eye view. Road horizontal, traffic goes LEFT.
// Parking spaces at bottom at ~45° angle. 3 steps.

const STEPS = [
  { cx: 250, cy: 82, rot: 270, arrow: { x: 218, y: 82, dir: 270 } },
  { cx: 175, cy: 140, rot: 315, arrow: { x: 155, y: 165, dir: 200 } },
  { cx: 128, cy: 200, rot: 315, arrow: { x: 108, y: 222, dir: 200 } },
];

interface Props {
  step: number;
}

export default function DiagonalAnimation({ step }: Props) {
  const pos = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <svg viewBox="0 0 320 300" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="roadGradD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#252525" />
        </linearGradient>
        <linearGradient id="carBodyGradD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14d489" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="carRoofGradD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <filter id="carShadowD" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Road */}
      <rect x="0" y="0" width="320" height="130" fill="url(#roadGradD)" />

      {/* Road center dashes */}
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={i} x={i * 32 + 6} y="59" width="20" height="5" rx="1.5" fill="#ffffff" opacity="0.11" />
      ))}

      {/* Road/parking separator */}
      <line x1="0" y1="130" x2="320" y2="130" stroke="#f0c040" strokeWidth="1.5" opacity="0.4" />

      {/* Parking lot */}
      <rect x="0" y="130" width="320" height="140" fill="#1e1e1e" />

      {/* Sidewalk */}
      <rect x="0" y="270" width="320" height="30" fill="#161616" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={8 + (i % 10) * 30} y={275 + Math.floor(i / 10) * 10} width="3" height="3" rx="1" fill="#222" opacity="0.8" />
      ))}
      <line x1="0" y1="270" x2="320" y2="270" stroke="#2e2e2e" strokeWidth="1.5" />

      {/* Diagonal parking lines at ~45° */}
      {[0, 70, 140, 210, 280].map((x, i) => (
        <line
          key={i}
          x1={x + 60} y1="130"
          x2={x} y2="270"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.15"
        />
      ))}

      {/* Parked cars in diagonal spaces */}
      <StaticCarDiag cx={35} cy={185} />
      <StaticCarDiag cx={243} cy={185} />

      {/* Direction arrow */}
      <motion.g
        animate={{ opacity: [0.4, 0.95, 0.4], scale: [0.88, 1.12, 0.88] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: `${pos.arrow.x}px`, originY: `${pos.arrow.y}px` }}
      >
        <Arrow x={pos.arrow.x} y={pos.arrow.y} dir={pos.arrow.dir} />
      </motion.g>

      {/* User car */}
      <motion.g
        animate={{ x: pos.cx, y: pos.cy, rotate: pos.rot }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        style={{ originX: "0px", originY: "0px" }}
        filter="url(#carShadowD)"
      >
        <Car />
      </motion.g>
    </svg>
  );
}

// ─── Realistic top-view user car (emerald) ──────────────────────────────────
function Car() {
  const W = 54, H = 90;
  const hw = W / 2, hh = H / 2;
  return (
    <g transform={`translate(${-hw}, ${-hh})`}>
      <rect x="-9" y="8" width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x="-8" y="11" width="9" height="13" rx="2" fill="#2a2a2a" />
      <rect x={W - 2} y="8" width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x={W - 1} y="11" width="9" height="13" rx="2" fill="#2a2a2a" />
      <rect x="-9" y={H - 27} width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x="-8" y={H - 24} width="9" height="13" rx="2" fill="#2a2a2a" />
      <rect x={W - 2} y={H - 27} width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x={W - 1} y={H - 24} width="9" height="13" rx="2" fill="#2a2a2a" />

      <rect x="0" y="0" width={W} height={H} rx="9" fill="url(#carBodyGradD)" />
      <rect x="4" y="2" width={W - 8} height="22" rx="5" fill="#12c97e" opacity="0.6" />
      <line x1={hw} y1="3" x2={hw} y2="22" stroke="#0d9966" strokeWidth="1" opacity="0.5" />
      <rect x="6" y="22" width={W - 12} height="18" rx="4" fill="#0a3d2b" opacity="0.88" />
      <line x1="10" y1="24" x2="14" y2="38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      <rect x="7" y="39" width={W - 14} height="24" rx="3" fill="url(#carRoofGradD)" />
      <line x1={hw} y1="40" x2={hw} y2="62" stroke="#043d2a" strokeWidth="1" opacity="0.4" />
      <rect x="6" y="62" width={W - 12} height="16" rx="4" fill="#0a3d2b" opacity="0.72" />
      <line x1="10" y1="64" x2="14" y2="76" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.13" />
      <rect x="4" y="77" width={W - 8} height="11" rx="4" fill="#0d9966" opacity="0.55" />

      <ellipse cx="9" cy="5" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
      <ellipse cx={W - 9} cy="5" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
      <ellipse cx="9" cy="5" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
      <ellipse cx={W - 9} cy="5" rx="3" ry="2" fill="#ffffff" opacity="0.7" />

      <rect x="4" y={H - 7} width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
      <rect x={W - 14} y={H - 7} width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
      <rect x="5" y={H - 6} width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />
      <rect x={W - 13} y={H - 6} width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />

      {/* Side mirrors */}
      <path d={`M -9 ${22} L -16 ${26} L -14 ${34} L -9 ${32} Z`} fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
      <rect x="-15" y="27" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />
      <path d={`M ${W + 9} ${22} L ${W + 16} ${26} L ${W + 14} ${34} L ${W + 9} ${32} Z`} fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
      <rect x={W + 9} y="27" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />

      <line x1="5" y1="48" x2={W - 5} y2="48" stroke="#0a8a5e" strokeWidth="0.7" opacity="0.5" />
      <rect x="3" y="44" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />
      <rect x={W - 7} y="44" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />
    </g>
  );
}

// ─── Static parked car at ~45° diagonal ─────────────────────────────────────
function StaticCarDiag({ cx, cy }: { cx: number; cy: number }) {
  const W = 54, H = 90;
  const hw = W / 2, hh = H / 2;
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(-45)`}>
      <g transform={`translate(${-hw}, ${-hh})`}>
        <rect x="-9" y="8" width="11" height="19" rx="3" fill="#111" />
        <rect x={W - 2} y="8" width="11" height="19" rx="3" fill="#111" />
        <rect x="-9" y={H - 27} width="11" height="19" rx="3" fill="#111" />
        <rect x={W - 2} y={H - 27} width="11" height="19" rx="3" fill="#111" />
        <rect x="0" y="0" width={W} height={H} rx="9" fill="#3f3f46" />
        <rect x="4" y="2" width={W - 8} height="22" rx="5" fill="#4a4a52" opacity="0.7" />
        <rect x="6" y="22" width={W - 12} height="18" rx="4" fill="#23232a" opacity="0.9" />
        <rect x="7" y="39" width={W - 14} height="24" rx="3" fill="#2e2e35" />
        <rect x="6" y="62" width={W - 12} height="16" rx="4" fill="#23232a" opacity="0.8" />
        <rect x="4" y="77" width={W - 8} height="11" rx="4" fill="#35353c" opacity="0.7" />
        <ellipse cx="9" cy="5" rx="4.5" ry="3" fill="#ccc" opacity="0.45" />
        <ellipse cx={W - 9} cy="5" rx="4.5" ry="3" fill="#ccc" opacity="0.45" />
        <rect x="4" y={H - 7} width="10" height="5" rx="2" fill="#7a1f1f" opacity="0.7" />
        <rect x={W - 14} y={H - 7} width="10" height="5" rx="2" fill="#7a1f1f" opacity="0.7" />
        {/* Mirrors */}
        <path d={`M -9 ${22} L -15 ${26} L -13 ${33} L -9 ${31} Z`} fill="#36363d" />
        <path d={`M ${W + 9} ${22} L ${W + 15} ${26} L ${W + 13} ${33} L ${W + 9} ${31} Z`} fill="#36363d" />
        <line x1="5" y1="48" x2={W - 5} y2="48" stroke="#555" strokeWidth="0.7" opacity="0.45" />
      </g>
    </g>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${dir})`}>
      <polygon points="0,-16 10,4 0,-2 -10,4" fill="#10b981" opacity="0.9" />
      <polygon points="0,-16 10,4 0,-2 -10,4" fill="none" stroke="#34d399" strokeWidth="1" />
    </g>
  );
}
