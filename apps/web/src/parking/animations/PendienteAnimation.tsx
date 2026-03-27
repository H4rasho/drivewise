import { motion } from "framer-motion";

// Pendiente: car is already parked, shown from bird's-eye view.
// Animated elements: front wheel rotation, slope arrows, handbrake indicator.
// 4 steps: uphill+curb, downhill+curb, no-curb, handbrake.

const WHEEL_STATES = [
  { wheelRot: -35, label: "↖ Izquierda", slopeDir: "up" },
  { wheelRot: 35, label: "↗ Derecha", slopeDir: "down" },
  { wheelRot: 35, label: "↗ Orilla", slopeDir: "down" },
  { wheelRot: 0, label: "Freno de mano", slopeDir: "neutral" },
];

interface Props {
  step: number;
}

export default function PendienteAnimation({ step }: Props) {
  const state = WHEEL_STATES[Math.min(step, WHEEL_STATES.length - 1)];

  return (
    <svg viewBox="0 0 300 340" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={state.slopeDir === "up" ? "#2d2d2d" : "#1c1c1c"} />
          <stop offset="100%" stopColor={state.slopeDir === "up" ? "#1c1c1c" : "#2d2d2d"} />
        </linearGradient>
        <linearGradient id="carBodyGradPend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14d489" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="carRoofGradPend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <filter id="carShadowPend" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3.5" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Road background with slope gradient */}
      <rect x="0" y="0" width="300" height="340" fill="url(#slopeGrad)" />

      {/* Lane markings */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="146" y={i * 30 + 4} width="5" height="18" rx="1.5" fill="#ffffff" opacity="0.11" />
      ))}

      {/* Curb (steps 1 and 2 with curb) */}
      {state.slopeDir !== "neutral" && step < 2 && (
        <>
          <rect x="242" y="0" width="58" height="340" fill="#161616" />
          {/* Curb texture */}
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x="248" y={i * 24 + 8} width="14" height="3" rx="1" fill="#222" opacity="0.7" />
          ))}
          <line x1="242" y1="0" x2="242" y2="340" stroke="#3a3a3a" strokeWidth="2.5" />
          <line x1="242" y1="0" x2="242" y2="340" stroke="#ffffff" strokeWidth="0.5" opacity="0.07" />
        </>
      )}

      {/* Road edge / cliff (step 2 = no curb) */}
      {step === 2 && (
        <>
          <rect x="242" y="0" width="58" height="340" fill="#111" />
          <line x1="242" y1="0" x2="242" y2="340" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="9 7" opacity="0.18" />
        </>
      )}

      {/* Slope direction label */}
      {state.slopeDir !== "neutral" && (
        <motion.g
          animate={{ opacity: [0.25, 0.65, 0.25], y: state.slopeDir === "up" ? [-5, 0, -5] : [5, 0, 5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <text
            x="28"
            y="170"
            fill="#ffffff"
            fontSize="10"
            fontWeight="500"
            opacity="0.35"
            transform="rotate(-90, 28, 170)"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {state.slopeDir === "up" ? "CUESTA ARRIBA ↑" : "CUESTA ABAJO ↓"}
          </text>
        </motion.g>
      )}

      {/* ── Parked car ── */}
      <g transform="translate(150, 170)" filter="url(#carShadowPend)">
        {/* Wheels — rear (fixed) */}
        <rect x="-35" y="16" width="12" height="20" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
        <rect x="-34" y="19" width="10" height="14" rx="2" fill="#2a2a2a" />
        <rect x="23" y="16" width="12" height="20" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
        <rect x="24" y="19" width="10" height="14" rx="2" fill="#2a2a2a" />

        {/* Body */}
        <rect x="-27" y="-44" width="54" height="90" rx="9" fill="url(#carBodyGradPend)" />

        {/* Hood */}
        <rect x="-23" y="-42" width="46" height="22" rx="5" fill="#12c97e" opacity="0.6" />
        <line x1="0" y1="-41" x2="0" y2="-22" stroke="#0d9966" strokeWidth="1" opacity="0.5" />

        {/* Windshield front */}
        <rect x="-21" y="-21" width="42" height="18" rx="4" fill="#0a3d2b" opacity="0.88" />
        <line x1="-17" y1="-19" x2="-13" y2="-5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />

        {/* Roof */}
        <rect x="-19" y="-4" width="38" height="24" rx="3" fill="url(#carRoofGradPend)" />
        <line x1="0" y1="-3" x2="0" y2="19" stroke="#043d2a" strokeWidth="1" opacity="0.4" />

        {/* Rear window */}
        <rect x="-21" y="19" width="42" height="16" rx="4" fill="#0a3d2b" opacity="0.72" />
        <line x1="-17" y1="21" x2="-13" y2="33" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.13" />

        {/* Trunk */}
        <rect x="-23" y="34" width="46" height="10" rx="4" fill="#0d9966" opacity="0.55" />

        {/* Headlights */}
        <ellipse cx="-18" cy="-41" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
        <ellipse cx="18" cy="-41" rx="5" ry="3.5" fill="#e8f8f0" opacity="0.9" />
        <ellipse cx="-18" cy="-41" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
        <ellipse cx="18" cy="-41" rx="3" ry="2" fill="#ffffff" opacity="0.7" />

        {/* Tail lights */}
        <rect x="-23" y="39" width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
        <rect x="13" y="39" width="10" height="5" rx="2" fill="#e53e3e" opacity="0.85" />
        <rect x="-22" y="40" width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />
        <rect x="14" y="40" width="8" height="3" rx="1.5" fill="#ff6b6b" opacity="0.6" />

        {/* Door line */}
        <line x1="-22" y1="4" x2="22" y2="4" stroke="#0a8a5e" strokeWidth="0.7" opacity="0.5" />
        <rect x="-24" y="0" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />
        <rect x="20" y="0" width="4" height="2" rx="1" fill="#0a8a5e" opacity="0.5" />

        {/* Side mirrors */}
        <path d="M -27 -21 L -34 -17 L -32 -9 L -27 -11 Z" fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
        <rect x="-33" y="-16" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />
        <path d="M 27 -21 L 34 -17 L 32 -9 L 27 -11 Z" fill="#0e9e6f" stroke="#087a55" strokeWidth="0.8" />
        <rect x="27" y="-16" width="6" height="5" rx="1" fill="#0a3d2b" opacity="0.6" />

        {/* ── Front wheels (animated rotation) ── */}
        <motion.g
          animate={{ rotate: state.wheelRot }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: "0px", originY: "0px" }}
        >
          {/* Front-left wheel */}
          <rect x="-35" y="-34" width="12" height="20" rx="3" fill="#1a1a1a" stroke="#34d399" strokeWidth="1.5" />
          <rect x="-34" y="-31" width="10" height="14" rx="2" fill="#2a2a2a" />
          {/* Front-right wheel */}
          <rect x="23" y="-34" width="12" height="20" rx="3" fill="#1a1a1a" stroke="#34d399" strokeWidth="1.5" />
          <rect x="24" y="-31" width="10" height="14" rx="2" fill="#2a2a2a" />
        </motion.g>

        {/* ── Handbrake indicator (step 4) ── */}
        {step === 3 && (
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <circle cx="0" cy="-2" r="18" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="0" cy="-2" r="12" fill="#f59e0b" opacity="0.08" />
            <text x="0" y="3" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700">P</text>
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
          <rect x="84" y="293" width="132" height="28" rx="7" fill="#10b981" opacity="0.12" />
          <rect x="84" y="293" width="132" height="28" rx="7" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.3" />
          <text x="150" y="312" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">
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
          <rect x="64" y="293" width="172" height="28" rx="7" fill="#f59e0b" opacity="0.1" />
          <rect x="64" y="293" width="172" height="28" rx="7" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.35" />
          <text x="150" y="312" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">
            Activa el freno de mano
          </text>
        </motion.g>
      )}
    </svg>
  );
}
