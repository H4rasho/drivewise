import { motion } from "framer-motion";

// Bird's-eye view. Road runs horizontally, traffic goes LEFT (west).
// Parking spaces at the BOTTOM (perpendicular to road).
// User car w=52, h=88. rotation=0 → front pointing UP.
// rotation=90 → front pointing right (east). rotation=270 → front pointing left (west).

const STEPS = [
  // Step 1: driving left in traffic lane, past the space
  { cx: 245, cy: 90, rot: 270, arrow: { x: 215, y: 90, dir: 270 } },
  // Step 2: start reversing into space, wheel hard to space
  { cx: 195, cy: 112, rot: 300, arrow: { x: 175, y: 130, dir: 200 } },
  // Step 3: turning deep into space, nearly aligned
  { cx: 148, cy: 175, rot: 355, arrow: { x: 148, y: 200, dir: 180 } },
  // Step 4: fully in space, parallel to lines
  { cx: 148, cy: 210, rot: 0, arrow: { x: 148, y: 235, dir: 180 } },
];

interface Props {
  step: number;
}

export default function BateriaAnimation({ step }: Props) {
  const pos = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <svg viewBox="0 0 320 310" className="w-full h-full" aria-hidden>
      {/* Road (top area) */}
      <rect x="0" y="0" width="320" height="140" fill="#242424" />
      {/* Sidewalk (bottom) */}
      <rect x="0" y="280" width="320" height="30" fill="#1a1a1a" />
      {/* Parking lot area */}
      <rect x="0" y="140" width="320" height="140" fill="#1e1e1e" />
      {/* Road/parking separator */}
      <line x1="0" y1="140" x2="320" y2="140" stroke="#ffffff20" strokeWidth="2" />

      {/* Road center dashes (horizontal) */}
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={i} x={i * 32} y="67" width="18" height="4" rx="1" fill="#ffffff18" />
      ))}

      {/* Parking space lines */}
      {[0, 80, 160, 240, 320].map((x, i) => (
        <line key={i} x1={x} y1="140" x2={x} y2="280" stroke="#ffffff22" strokeWidth="1.5" />
      ))}

      {/* Parked cars in OTHER spaces */}
      {/* Left space (0-80) */}
      <g>
        <rect x="8" y="148" width="64" height="88" rx="6" fill="#3f3f46" />
        <rect x="14" y="154" width="52" height="20" rx="3" fill="#2a2a2e" opacity="0.8" />
      </g>
      {/* Right space (240-320) */}
      <g>
        <rect x="248" y="148" width="64" height="88" rx="6" fill="#3f3f46" />
        <rect x="254" y="154" width="52" height="20" rx="3" fill="#2a2a2e" opacity="0.8" />
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
