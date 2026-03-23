import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
const frequencyLabel = {
    mensual: "Mensual",
    trimestral: "Trimestral",
    semestral: "Semestral",
    anual: "Anual",
    por_kilometraje: "Por km",
};
const frequencyOrder = [
    "mensual",
    "trimestral",
    "semestral",
    "anual",
    "por_kilometraje",
];
export default function MaintenancePage() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        api.maintenance.schedule().then(setItems).catch(() => setError(true));
    }, []);
    const grouped = items
        ? frequencyOrder.reduce((acc, freq) => {
            const group = items.filter((i) => i.frequency === freq);
            if (group.length)
                acc[freq] = group;
            return acc;
        }, {})
        : null;
    return (_jsxs("div", { className: "px-5 pt-14 pb-4 max-w-lg mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase", children: [_jsx(ArrowLeft, { size: 14 }), "Inicio"] }) }), _jsxs(motion.div, { className: "mb-10", initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05, ease: "easeOut" }, children: [_jsx("h1", { className: "text-7xl leading-none text-foreground", style: { fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }, children: "Mantenci\u00F3n" }), _jsxs("div", { className: "flex items-center gap-3 mt-3", children: [_jsx("div", { className: "w-6 h-px bg-primary" }), _jsx("p", { className: "text-muted-foreground text-sm font-light tracking-widest uppercase", children: "Calendario de mantenci\u00F3n" })] })] }), error && (_jsx("p", { className: "text-muted-foreground text-sm", children: "No se pudo cargar el calendario." })), !items && !error && (_jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => (_jsxs("div", { children: [_jsx("div", { className: "h-3 w-24 bg-secondary rounded animate-pulse mb-3" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-16 bg-secondary rounded-xl animate-pulse" }), _jsx("div", { className: "h-16 bg-secondary rounded-xl animate-pulse" })] })] }, i))) })), grouped && (_jsx("div", { className: "flex flex-col gap-8", children: Object.entries(grouped).map(([freq, group], gi) => (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-xs tracking-widest uppercase text-primary font-medium", children: frequencyLabel[freq] }), _jsx("div", { className: "flex-1 h-px bg-border/40" })] }), _jsx("div", { className: "flex flex-col gap-2", children: group.map((item) => (_jsx("div", { className: "rounded-xl border border-border/50 bg-secondary/20 px-4 py-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Gauge, { size: 14, className: "text-primary/50 mt-0.5 shrink-0", strokeWidth: 1.5 }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: item.name }), _jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: item.description }), item.kmInterval && (_jsxs("p", { className: "text-xs text-primary/60 mt-1", children: ["Cada ", item.kmInterval.toLocaleString(), " km"] }))] })] }) }, item.id))) })] }, freq))) }))] }));
}
