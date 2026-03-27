import { motion } from "framer-motion";

// Bird's-eye view. Road runs vertically, traffic goes south (down).
// Parking spaces on the RIGHT side (curb at x=230).
// Car center origin at (0,0). rotation=0 → front pointing UP. rotation=180 → front pointing DOWN.

const STEPS = [
  { cx: 72, cy: 148, rot: 180, arrow: { x: 72, y: 175, dir: 180 } },
  { cx: 115, cy: 198, rot: 155, arrow: { x: 130, y: 215, dir: 40 } },
  { cx: 168, cy: 218, rot: 178, arrow: { x: 175, y: 240, dir: 0 } },
  { cx: 173, cy: 198, rot: 180, arrow: { x: 173, y: 175, dir: 180 } },
];

interface Props {
  step: number;
}

export default function ParaleloAnimation({ step }: Props) {
  const pos = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <svg viewBox="0 0 260 420" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="roadGradP" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#252525" />
        </linearGradient>
        <linearGradient id="carBodyGradP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14d489" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="carRoofGradP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <filter id="carShadowP" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <filter id="carGlowP" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sidewalk right */}
      <rect x="220" y="0" width="40" height="420" fill="#161616" />
      <rect x="220" y="0" width="40" height="420" fill="#1a1a1a" />
      {/* Sidewalk texture dots */}
      {Array.from({ length: 26 }).map((_, i) => (
        <rect key={i} x={225 + (i % 3) * 10} y={8 + Math.floor(i / 3) * 16} width="3" height="3" rx="1" fill="#222" opacity="0.7" />
      ))}

      {/* Road */}
      <rect x="0" y="0" width="220" height="420" fill="url(#roadGradP)" />

      {/* Road surface texture */}
      <rect x="0" y="0" width="220" height="420" fill="#ffffff" opacity="0.012" />

      {/* Sidewalk edge line */}
      <line x1="220" y1="0" x2="220" y2="420" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="220" y1="0" x2="220" y2="420" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />

      {/* Center lane dashed */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x="107" y={i * 32 + 4} width="5" height="20" rx="1.5" fill="#ffffff" opacity="0.12" />
      ))}

      {/* Parking bay boundary lines */}
      <line x1="128" y1="115" x2="222" y2="115" stroke="#f0c040" strokeWidth="1.5" strokeDasharray="7 5" opacity="0.55" />
      <line x1="128" y1="295" x2="222" y2="295" stroke="#f0c040" strokeWidth="1.5" strokeDasharray="7 5" opacity="0.55" />

      {/* Parked car FRONT (top) — detailed */}
      <StaticCar x={174} y={64} />

      {/* Parked car REAR (bottom) — detailed */}
      <StaticCar x={174} y={346} />

      {/* Space corner markers */}
      {[{ x: 130, y: 115 }, { x: 130, y: 295 }, { x: 220, y: 115 }, { x: 220, y: 295 }].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#f0c040" opacity="0.4" />
      ))}

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
        filter="url(#carShadowP)"
      >
        <Car />
      </motion.g>
    </svg>
  );
}

// ─── Shared realistic top-view car (user car — emerald green) ───────────────
function Car() {
  // Origin at center of car. Car: 54w × 90h
  const W = 54, H = 90;
  const hw = W / 2, hh = H / 2;
  return (
    <g transform={`translate(${-hw}, ${-hh})`}>
      {/* ── Wheels (dark rubber, behind body) ── */}
      {/* Front-left */}
      <rect x="-9" y="8" width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x="-8" y="11" width="9" height="13" rx="2" fill="#2a2a2a" />
      {/* Front-right */}
      <rect x={W - 2} y="8" width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x={W - 1} y="11" width="9" height="13" rx="2" fill="#2a2a2a" />
      {/* Rear-left */}
      <rect x="-9" y={H - 27} width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x="-8" y={H - 24} width="9" height="13" rx="2" fill="#2a2a2a" />
      {/* Rear-right */}
      <rect x={W - 2} y={H - 27} width="11" height="19" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <rect x={W - 1} y={H - 24} width="9" height="13" rx="2" fill="#2a2a2a" />

      {/* ── Body ── */}
      <rect x="0" y="0" width={W} height={H} rx="9" fill="url(#carBodyGradP)" />

      {/* ── Hood (front) ── */}
      <rect x="4" y="2" width={W - 8} height="22" rx="5" fill="#12c97e" opacity="0.6" />
      {/* Hood center crease */}
      <line x1={hw} y1="3" x2={hw} y2="22" stroke="#0d9966" strokeWidth="1" opacity="0.5" />

      {/* ── Windshield (front) ── */}
      <rect x="6" y="22" width={W - 12} height="18" rx="4" fill="#0a3d2b" opacity="0.88" />
      {/* Glass reflection */}
      <line x1="10" y1="24" x2="14" y2="38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />

      {/* ── Roof ── */}
      <rect x="7" y="39" width={W - 14} height="24" rx="3" fill="url(#carRoofGradP)" />
      {/* Roof center line */}
      <line x1={hw} y1="40" x2={hw} y2="62" stroke="#043d2a" strokeWidth="1" opacity="0.4" />

      {/* ── Rear window ── */}
      <rect x="6" y="62" width={W - 12} height="16" rx="4" fill="#0a3d2b" opacity="0.72" />
      <line x1="10" y1="64" x2="14" y2="76" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.13" />

      {/* ── Trunk (rear) ── */}
      <rect x="4" y="77" width={W - 8} height="11" rx="4" fill="#0d9966" opacity="0.55" />

      {/* ── Headlights (front) ── */}
      <ellipse cx="9" cy="5" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
      <ellipse cx={W - 9} cy="5" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
      <ellipse cx="9" cy="5" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
      <ellipse cx={W - 9} cy="5" rx="3" ry="2" fill="#ffffff" opacity="0.7" />

      {/* ── Tail lights (rear) ── */}
      <rect x="4" y={H - 7} width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
      <rect x={W - 14} y={H - 7} width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
      <rect x="5" y={H - 6} width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />
      <rect x={W - 13} y={H - 6} width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />

      {/* ── Side mirrors ── */}
      {/* Left mirror */}
      <path d={`M -9 ${22} L -16 ${26} L -14 ${34} L -9 ${32} Z`} fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
      <rect x="-15" y="27" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />
      {/* Right mirror */}
      <path d={`M ${W + 9} ${22} L ${W + 16} ${26} L ${W + 14} ${34} L ${W + 9} ${32} Z`} fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
      <rect x={W + 9} y="27" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />

      {/* ── Door lines ── */}
      <line x1="5" y1="48" x2={W - 5} y2="48" stroke="#0a8a5e" strokeWidth="0.7" opacity="0.5" />
      {/* Door handle hints */}
      <rect x="3" y="44" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />
      <rect x={W - 7} y="44" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />
    </g>
  );
}

// ─── Static parked car (gray, detailed top-view) ────────────────────────────
function StaticCar({ x, y }: { x: number; y: number }) {
  const W = 54, H = 90;
  const hw = W / 2, hh = H / 2;
  return (
    <g transform={`translate(${x - hw}, ${y - hh})`}>
      {/* Wheels */}
      <rect x="-9" y="8" width="11" height="19" rx="3" fill="#111" />
      <rect x={W - 2} y="8" width="11" height="19" rx="3" fill="#111" />
      <rect x="-9" y={H - 27} width="11" height="19" rx="3" fill="#111" />
      <rect x={W - 2} y={H - 27} width="11" height="19" rx="3" fill="#111" />
      {/* Body */}
      <rect x="0" y="0" width={W} height={H} rx="9" fill="#3f3f46" />
      {/* Hood */}
      <rect x="4" y="2" width={W - 8} height="22" rx="5" fill="#4a4a52" opacity="0.7" />
      {/* Windshield */}
      <rect x="6" y="22" width={W - 12} height="18" rx="4" fill="#23232a" opacity="0.9" />
      {/* Roof */}
      <rect x="7" y="39" width={W - 14} height="24" rx="3" fill="#2e2e35" />
      {/* Rear window */}
      <rect x="6" y="62" width={W - 12} height="16" rx="4" fill="#23232a" opacity="0.8" />
      {/* Trunk */}
      <rect x="4" y="77" width={W - 8} height="11" rx="4" fill="#35353c" opacity="0.7" />
      {/* Headlights */}
      <ellipse cx="9" cy="5" rx="4.5" ry="3" fill="#cccccc" opacity="0.5" />
      <ellipse cx={W - 9} cy="5" rx="4.5" ry="3" fill="#cccccc" opacity="0.5" />
      {/* Tail lights */}
      <rect x="4" y={H - 7} width="10" height="5" rx="2" fill="#7a1f1f" opacity="0.7" />
      <rect x={W - 14} y={H - 7} width="10" height="5" rx="2" fill="#7a1f1f" opacity="0.7" />
      {/* Mirrors */}
      <path d={`M -9 ${22} L -15 ${26} L -13 ${33} L -9 ${31} Z`} fill="#36363d" />
      <path d={`M ${W + 9} ${22} L ${W + 15} ${26} L ${W + 13} ${33} L ${W + 9} ${31} Z`} fill="#36363d" />
      {/* Door line */}
      <line x1="5" y1="48" x2={W - 5} y2="48" stroke="#555" strokeWidth="0.7" opacity="0.5" />
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
