import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export default function BateriaAnimation({ step }) {
    const pos = STEPS[Math.min(step, STEPS.length - 1)];
    return (_jsxs("svg", { viewBox: "0 0 320 310", className: "w-full h-full", "aria-hidden": true, children: [_jsx("rect", { x: "0", y: "0", width: "320", height: "140", fill: "#242424" }), _jsx("rect", { x: "0", y: "280", width: "320", height: "30", fill: "#1a1a1a" }), _jsx("rect", { x: "0", y: "140", width: "320", height: "140", fill: "#1e1e1e" }), _jsx("line", { x1: "0", y1: "140", x2: "320", y2: "140", stroke: "#ffffff20", strokeWidth: "2" }), Array.from({ length: 11 }).map((_, i) => (_jsx("rect", { x: i * 32, y: "67", width: "18", height: "4", rx: "1", fill: "#ffffff18" }, i))), [0, 80, 160, 240, 320].map((x, i) => (_jsx("line", { x1: x, y1: "140", x2: x, y2: "280", stroke: "#ffffff22", strokeWidth: "1.5" }, i))), _jsxs("g", { children: [_jsx("rect", { x: "8", y: "148", width: "64", height: "88", rx: "6", fill: "#3f3f46" }), _jsx("rect", { x: "14", y: "154", width: "52", height: "20", rx: "3", fill: "#2a2a2e", opacity: "0.8" })] }), _jsxs("g", { children: [_jsx("rect", { x: "248", y: "148", width: "64", height: "88", rx: "6", fill: "#3f3f46" }), _jsx("rect", { x: "254", y: "154", width: "52", height: "20", rx: "3", fill: "#2a2a2e", opacity: "0.8" })] }), _jsx(motion.g, { animate: { opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.1, 0.85] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }, style: { originX: `${pos.arrow.x}px`, originY: `${pos.arrow.y}px` }, children: _jsx(Arrow, { x: pos.arrow.x, y: pos.arrow.y, dir: pos.arrow.dir }) }), _jsx(motion.g, { animate: { x: pos.cx, y: pos.cy, rotate: pos.rot }, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] }, style: { originX: "0px", originY: "0px" }, children: _jsx(Car, {}) })] }));
}
function Car() {
    return (_jsxs("g", { transform: "translate(-26, -44)", children: [_jsx("rect", { x: "2", y: "2", width: "52", height: "88", rx: "8", fill: "#000000", opacity: "0.3" }), _jsx("rect", { x: "0", y: "0", width: "52", height: "88", rx: "8", fill: "#10b981" }), _jsx("rect", { x: "6", y: "6", width: "40", height: "22", rx: "4", fill: "#065f46", opacity: "0.85" }), _jsx("rect", { x: "8", y: "28", width: "36", height: "28", rx: "3", fill: "#059669" }), _jsx("rect", { x: "6", y: "60", width: "40", height: "20", rx: "4", fill: "#065f46", opacity: "0.65" })] }));
}
function Arrow({ x, y, dir }) {
    return (_jsx("g", { transform: `translate(${x}, ${y}) rotate(${dir})`, children: _jsx("polygon", { points: "0,-14 9,4 0,-1 -9,4", fill: "#10b981" }) }));
}
