import { motion } from "framer-motion";

// Bird's-eye view. Road horizontal, traffic goes LEFT.
// Parking spaces at bottom at ~45° angle.
// Only 3 steps for diagonal.

const STEPS = [
  // Step 1: approaching in traffic lane, at distance from parked cars
  { cx: 250, cy: 82, rot: 270, arrow: { x: 218, y: 82, dir: 270 } },
  // Step 2: turning into angled space, at ~45°
  { cx: 175, cy: 140, rot: 315, arrow: { x: 155, y: 165, dir: 200 } },
  // Step 3: fully entered, aligned with diagonal angle
  { cx: 128, cy: 200, rot: 315, arrow: { x: 108, y: 222, dir: 200 } },
];

interface Props {
  step: number;
}

export default function DiagonalAnimation({ step }: Props) {
  const pos = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <svg viewBox="0 0 320 300" className="w-full h-full" aria-hidden>
      {/* Road */}
      <rect x="0" y="0" width="320" height="130" fill="#242424" />
      {/* Parking lot */}
      <rect x="0" y="130" width="320" height="140" fill="#1e1e1e" />
      {/* Sidewalk */}
      <rect x="0" y="270" width="320" height="30" fill="#1a1a1a" />
      {/* Separator */}
      <line x1="0" y1="130" x2="320" y2="130" stroke="#ffffff20" strokeWidth="2" />

      {/* Road center dash */}
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={i} x={i * 32} y="60" width="18" height="4" rx="1" fill="#ffffff18" />
      ))}

      {/* Diagonal parking lines at ~45° */}
      {[0, 70, 140, 210, 280].map((x, i) => (
        <line
          key={i}
          x1={x + 60} y1="130"
          x2={x} y2="270"
          stroke="#ffffff22"
          strokeWidth="1.5"
        />
      ))}

      {/* Parked cars in diagonal spaces (static, other spaces occupied) */}
      <g transform="translate(8, 152) rotate(-45, 32, 44)">
        <rect x="0" y="0" width="52" height="82" rx="6" fill="#3f3f46" />
        <rect x="6" y="6" width="40" height="20" rx="3" fill="#2a2a2e" opacity="0.8" />
      </g>
      <g transform="translate(210, 152) rotate(-45, 32, 44)">
        <rect x="0" y="0" width="52" height="82" rx="6" fill="#3f3f46" />
        <rect x="6" y="6" width="40" height="20" rx="3" fill="#2a2a2e" opacity="0.8" />
      </g>

      {/* Direction arrow */}
      <motion.g
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.1, 0.85] }}
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
      >
        <Car />
      </motion.g>
    </svg>
  );
}

function Car() {
  return (
    <g transform="translate(-26, -44)">
      <rect x="2" y="2" width="52" height="88" rx="8" fill="#000000" opacity="0.3" />
      <rect x="0" y="0" width="52" height="88" rx="8" fill="#10b981" />
      <rect x="6" y="6" width="40" height="22" rx="4" fill="#065f46" opacity="0.85" />
      <rect x="8" y="28" width="36" height="28" rx="3" fill="#059669" />
      <rect x="6" y="60" width="40" height="20" rx="4" fill="#065f46" opacity="0.65" />
    </g>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${dir})`}>
      <polygon points="0,-14 9,4 0,-1 -9,4" fill="#10b981" />
    </g>
  );
}
