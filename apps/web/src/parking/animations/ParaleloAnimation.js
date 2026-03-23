import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export default function ParaleloAnimation({ step }) {
    const pos = STEPS[Math.min(step, STEPS.length - 1)];
    return (_jsxs("svg", { viewBox: "0 0 260 420", className: "w-full h-full", "aria-hidden": true, children: [_jsx("rect", { x: "220", y: "0", width: "40", height: "420", fill: "#1a1a1a" }), _jsx("rect", { x: "0", y: "0", width: "220", height: "420", fill: "#242424" }), _jsx("line", { x1: "220", y1: "0", x2: "220", y2: "420", stroke: "#3a3a3a", strokeWidth: "2" }), Array.from({ length: 14 }).map((_, i) => (_jsx("rect", { x: "108", y: i * 32, width: "4", height: "18", rx: "1", fill: "#ffffff18" }, i))), _jsx("line", { x1: "130", y1: "115", x2: "222", y2: "115", stroke: "#ffffff30", strokeWidth: "1.5", strokeDasharray: "6 4" }), _jsx("line", { x1: "130", y1: "295", x2: "222", y2: "295", stroke: "#ffffff30", strokeWidth: "1.5", strokeDasharray: "6 4" }), _jsxs("g", { children: [_jsx("rect", { x: "135", y: "18", width: "78", height: "92", rx: "6", fill: "#3f3f46" }), _jsx("rect", { x: "142", y: "25", width: "64", height: "28", rx: "3", fill: "#2a2a2e", opacity: "0.8" }), _jsx("rect", { x: "142", y: "76", width: "64", height: "24", rx: "3", fill: "#2a2a2e", opacity: "0.6" })] }), _jsxs("g", { children: [_jsx("rect", { x: "135", y: "300", width: "78", height: "92", rx: "6", fill: "#3f3f46" }), _jsx("rect", { x: "142", y: "307", width: "64", height: "28", rx: "3", fill: "#2a2a2e", opacity: "0.8" }), _jsx("rect", { x: "142", y: "358", width: "64", height: "24", rx: "3", fill: "#2a2a2e", opacity: "0.6" })] }), [{ x: 130, y: 115 }, { x: 130, y: 295 }].map((p, i) => (_jsx("g", { children: _jsx("circle", { cx: p.x, cy: p.y, r: "3", fill: "#ffffff25" }) }, i))), _jsx(motion.g, { animate: { opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.1, 0.85] }, transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }, style: { originX: `${pos.arrow.x}px`, originY: `${pos.arrow.y}px` }, children: _jsx(Arrow, { x: pos.arrow.x, y: pos.arrow.y, dir: pos.arrow.dir }) }), _jsx(motion.g, { animate: { x: pos.cx, y: pos.cy, rotate: pos.rot }, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] }, style: { originX: "0px", originY: "0px" }, children: _jsx(Car, {}) })] }));
}
function Car() {
    return (_jsxs("g", { transform: "translate(-26, -44)", children: [_jsx("rect", { x: "2", y: "2", width: "52", height: "88", rx: "8", fill: "#000000", opacity: "0.3" }), _jsx("rect", { x: "0", y: "0", width: "52", height: "88", rx: "8", fill: "#10b981" }), _jsx("rect", { x: "6", y: "6", width: "40", height: "22", rx: "4", fill: "#065f46", opacity: "0.85" }), _jsx("rect", { x: "8", y: "28", width: "36", height: "28", rx: "3", fill: "#059669" }), _jsx("rect", { x: "6", y: "60", width: "40", height: "20", rx: "4", fill: "#065f46", opacity: "0.65" })] }));
}
function Arrow({ x, y, dir }) {
    // dir: degrees, 0 = pointing up, 180 = pointing down
    return (_jsx("g", { transform: `translate(${x}, ${y}) rotate(${dir})`, children: _jsx("polygon", { points: "0,-14 9,4 0,-1 -9,4", fill: "#10b981" }) }));
}
