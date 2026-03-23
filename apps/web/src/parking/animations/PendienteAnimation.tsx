import { motion } from "framer-motion";

// Pendiente is conceptually different: the car is already parked.
// We show bird's-eye view of parked car + animated wheel direction indicator
// + slope direction arrows.
// 4 steps: uphill+curb, downhill+curb, no-curb, handbrake.

const WHEEL_STATES = [
  // Step 1: uphill + curb → wheels turned LEFT (away from curb)
  { wheelRot: -35, label: "↖ Izquierda", slopeDir: "up" },
  // Step 2: downhill + curb → wheels turned RIGHT (toward curb)
  { wheelRot: 35, label: "↗ Derecha", slopeDir: "down" },
  // Step 3: no curb → wheels toward edge of road (right)
  { wheelRot: 35, label: "↗ Orilla", slopeDir: "down" },
  // Step 4: handbrake — wheels neutral, highlight brake
  { wheelRot: 0, label: "Freno de mano", slopeDir: "neutral" },
];

interface Props {
  step: number;
}

export default function PendienteAnimation({ step }: Props) {
  const state = WHEEL_STATES[Math.min(step, WHEEL_STATES.length - 1)];

  return (
    <svg viewBox="0 0 300 340" className="w-full h-full" aria-hidden>
      {/* Road (slight visual slope hint with gradient) */}
      <defs>
        <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={state.slopeDir === "up" ? "#2d2d2d" : "#202020"} />
          <stop offset="100%" stopColor={state.slopeDir === "up" ? "#202020" : "#2d2d2d"} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="300" height="340" fill="url(#slopeGrad)" />

      {/* Curb (right side, visible in steps 1 and 2) */}
      {state.slopeDir !== "neutral" && step < 3 && (
        <rect x="240" y="0" width="60" height="340" fill="#1a1a1a" />
      )}
      {state.slopeDir !== "neutral" && step < 3 && (
        <line x1="240" y1="0" x2="240" y2="340" stroke="#3a3a3a" strokeWidth="3" />
      )}

      {/* Road edge / cliff (step 3: no curb) */}
      {step === 2 && (
        <g>
          <rect x="240" y="0" width="60" height="340" fill="#111111" />
          <line x1="240" y1="0" x2="240" y2="340" stroke="#ffffff15" strokeWidth="2" strokeDasharray="8 6" />
        </g>
      )}

      {/* Lane markings */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="146" y={i * 30} width="4" height="16" rx="1" fill="#ffffff18" />
      ))}

      {/* Slope arrow */}
      {state.slopeDir !== "neutral" && (
        <motion.g
          animate={{ opacity: [0.3, 0.7, 0.3], y: state.slopeDir === "up" ? [-4, 0, -4] : [4, 0, 4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <text
            x="30"
            y="170"
            fill="#ffffff30"
            fontSize="11"
            fontWeight="500"
            transform="rotate(-90, 30, 170)"
            textAnchor="middle"
          >
            {state.slopeDir === "up" ? "CUESTA ARRIBA ↑" : "CUESTA ABAJO ↓"}
          </text>
        </motion.g>
      )}

      {/* Car body (stationary, parked) */}
      <g transform="translate(150, 170)">
        {/* Shadow */}
        <rect x="-24" y="-42" width="52" height="88" rx="8" fill="#000000" opacity="0.25" transform="translate(2,2)" />
        {/* Body */}
        <rect x="-26" y="-44" width="52" height="88" rx="8" fill="#10b981" />
        {/* Windshield */}
        <rect x="-20" y="-38" width="40" height="22" rx="4" fill="#065f46" opacity="0.85" />
        {/* Roof */}
        <rect x="-18" y="-16" width="36" height="28" rx="3" fill="#059669" />
        {/* Rear window */}
        <rect x="-20" y="16" width="40" height="20" rx="4" fill="#065f46" opacity="0.65" />

        {/* Front wheels (animated rotation) */}
        <motion.g
          animate={{ rotate: state.wheelRot }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: "0px", originY: "0px" }}
        >
          {/* Front-left wheel */}
          <rect x="-36" y="-34" width="12" height="22" rx="3" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
          {/* Front-right wheel */}
          <rect x="24" y="-34" width="12" height="22" rx="3" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
        </motion.g>

        {/* Rear wheels (fixed) */}
        <rect x="-36" y="14" width="12" height="22" rx="3" fill="#374151" />
        <rect x="24" y="14" width="12" height="22" rx="3" fill="#374151" />

        {/* Handbrake indicator (step 4) */}
        {step === 3 && (
          <motion.g
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
            <text x="0" y="5" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700">P</text>
          </motion.g>
        )}
      </g>

      {/* Wheel direction label */}
      {step < 3 && (
        <motion.g
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <rect x="84" y="290" width="132" height="28" rx="6" fill="#10b98118" />
          <text x="150" y="309" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">
            Ruedas: {state.label}
          </text>
        </motion.g>
      )}
      {step === 3 && (
        <motion.g
          key="brake"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <rect x="64" y="290" width="172" height="28" rx="6" fill="#f59e0b18" />
          <text x="150" y="309" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">
            Activa el freno de mano
          </text>
        </motion.g>
      )}
    </svg>
  );
}
