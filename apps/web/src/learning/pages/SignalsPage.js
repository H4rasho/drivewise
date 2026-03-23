import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
const categoryLabel = {
    regulatoria: "Regulatoria",
    preventiva: "Preventiva",
    informativa: "Informativa",
    transitoria: "Transitoria",
};
const categoryOrder = ["regulatoria", "preventiva", "informativa", "transitoria"];
export default function SignalsPage() {
    const [signals, setSignals] = useState(null);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState(null);
    useEffect(() => {
        api.signals.list().then(setSignals).catch(() => setError(true));
    }, []);
    const grouped = signals
        ? categoryOrder.reduce((acc, cat) => {
            const group = signals.filter((s) => s.category === cat);
            if (group.length)
                acc[cat] = group;
            return acc;
        }, {})
        : null;
    return (_jsxs("div", { className: "px-5 pt-14 pb-4 max-w-lg mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, children: _jsxs(Link, { to: "/learning", className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase", children: [_jsx(ArrowLeft, { size: 14 }), "Aprender"] }) }), _jsxs(motion.div, { className: "mb-10", initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05, ease: "easeOut" }, children: [_jsx("h1", { className: "text-7xl leading-none text-foreground", style: { fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }, children: "Se\u00F1ales" }), _jsxs("div", { className: "flex items-center gap-3 mt-3", children: [_jsx("div", { className: "w-6 h-px bg-primary" }), _jsx("p", { className: "text-muted-foreground text-sm font-light tracking-widest uppercase", children: signals ? `${signals.length} señales` : "Señales de tránsito" })] })] }), error && _jsx("p", { className: "text-muted-foreground text-sm", children: "No se pudieron cargar las se\u00F1ales." }), !signals && !error && (_jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => (_jsx("div", { className: "h-14 bg-secondary rounded-xl animate-pulse" }, i))) })), grouped && (_jsx("div", { className: "flex flex-col gap-8", children: Object.entries(grouped).map(([cat, group], gi) => (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-xs tracking-widest uppercase text-primary font-medium", children: categoryLabel[cat] }), _jsx("div", { className: "flex-1 h-px bg-border/40" })] }), _jsx("div", { className: "flex flex-col gap-2", children: group.map((signal) => {
                                const open = expanded === signal.id;
                                return (_jsxs("button", { onClick: () => setExpanded(open ? null : signal.id), className: "w-full text-left rounded-xl border border-border/50 bg-secondary/20 hover:border-border px-4 py-3 transition-all duration-200 active:scale-[0.98]", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: signal.name }), _jsx("span", { className: "text-muted-foreground/40 text-xs shrink-0", children: open ? "▲" : "▼" })] }), open && (_jsxs("div", { className: "mt-2 space-y-1.5", children: [_jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: signal.description }), signal.mnemonic && (_jsx("p", { className: "text-xs text-primary/70 italic leading-relaxed", children: signal.mnemonic }))] }))] }, signal.id));
                            }) })] }, cat))) }))] }));
}
