import { motion } from "framer-motion";

// Bird's-eye view. Road runs vertically, traffic goes south (down).
// Parking spaces on the RIGHT side (curb at x=230).
// User car w=52, h=88. Coordinates are the car's CENTER (cx, cy).
// rotation=0 → front pointing UP. rotation=180 → front pointing DOWN (south).

const STEPS = [
  // Step 1: aligned in traffic lane, level with front parked car
  { cx: 72, cy: 148, rot: 180, arrow: { x: 72, y: 175, dir: 180 } },
  // Step 2: reversing, wheel right → rear entering space, car angles right
  { cx: 115, cy: 198, rot: 155, arrow: { x: 130, y: 215, dir: 40 } },
  // Step 3: wheel left → straightening, deeper into space
  { cx: 168, cy: 218, rot: 178, arrow: { x: 175, y: 240, dir: 0 } },
  // Step 4: centered in space, parallel
  { cx: 173, cy: 198, rot: 180, arrow: { x: 173, y: 175, dir: 180 } },
];

interface Props {
  step: number; // 0-indexed
}

export default function ParaleloAnimation({ step }: Props) {
  const pos = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <svg viewBox="0 0 260 420" className="w-full h-full" aria-hidden>
      {/* Sidewalk right */}
      <rect x="220" y="0" width="40" height="420" fill="#1a1a1a" />
      {/* Road */}
      <rect x="0" y="0" width="220" height="420" fill="#242424" />
      {/* Sidewalk edge line */}
      <line x1="220" y1="0" x2="220" y2="420" stroke="#3a3a3a" strokeWidth="2" />
      {/* Center lane dashed */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x="108" y={i * 32} width="4" height="18" rx="1" fill="#ffffff18" />
      ))}

      {/* Parking lane dashes at entry/exit of space */}
      <line x1="130" y1="115" x2="222" y2="115" stroke="#ffffff30" strokeWidth="1.5" strokeDasharray="6 4" />
      <line x1="130" y1="295" x2="222" y2="295" stroke="#ffffff30" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Parked car FRONT (top) */}
      <g>
        <rect x="135" y="18" width="78" height="92" rx="6" fill="#3f3f46" />
        <rect x="142" y="25" width="64" height="28" rx="3" fill="#2a2a2e" opacity="0.8" />
        <rect x="142" y="76" width="64" height="24" rx="3" fill="#2a2a2e" opacity="0.6" />
      </g>

      {/* Parked car REAR (bottom) */}
      <g>
        <rect x="135" y="300" width="78" height="92" rx="6" fill="#3f3f46" />
        <rect x="142" y="307" width="64" height="28" rx="3" fill="#2a2a2e" opacity="0.8" />
        <rect x="142" y="358" width="64" height="24" rx="3" fill="#2a2a2e" opacity="0.6" />
      </g>

      {/* Space corner markers */}
      {[{ x: 130, y: 115 }, { x: 130, y: 295 }].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="#ffffff25" />
        </g>
      ))}

      {/* Direction arrow (pulsing, shows movement for current step) */}
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
      {/* Shadow */}
      <rect x="2" y="2" width="52" height="88" rx="8" fill="#000000" opacity="0.3" />
      {/* Body */}
      <rect x="0" y="0" width="52" height="88" rx="8" fill="#10b981" />
      {/* Windshield front */}
      <rect x="6" y="6" width="40" height="22" rx="4" fill="#065f46" opacity="0.85" />
      {/* Roof */}
      <rect x="8" y="28" width="36" height="28" rx="3" fill="#059669" />
      {/* Rear window */}
      <rect x="6" y="60" width="40" height="20" rx="4" fill="#065f46" opacity="0.65" />
    </g>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: number }) {
  // dir: degrees, 0 = pointing up, 180 = pointing down
  return (
    <g transform={`translate(${x}, ${y}) rotate(${dir})`}>
      <polygon points="0,-14 9,4 0,-1 -9,4" fill="#10b981" />
    </g>
  );
}
