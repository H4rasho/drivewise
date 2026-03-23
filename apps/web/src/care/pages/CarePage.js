import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
const categoryLabel = {
    motor: "Motor",
    neumaticos: "Neumáticos",
    frenos: "Frenos",
    exterior: "Exterior",
    electrico: "Eléctrico",
};
export default function CarePage() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState(new Set());
    useEffect(() => {
        api.care.checklist().then(setItems).catch(() => setError(true));
    }, []);
    const toggle = (id) => {
        setChecked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const grouped = items
        ? Object.entries(items.reduce((acc, item) => {
            if (!acc[item.category])
                acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {}))
        : null;
    return (_jsxs("div", { className: "px-5 pt-14 pb-4 max-w-lg mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase", children: [_jsx(ArrowLeft, { size: 14 }), "Inicio"] }) }), _jsxs(motion.div, { className: "mb-10", initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05, ease: "easeOut" }, children: [_jsx("h1", { className: "text-7xl leading-none text-foreground", style: { fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }, children: "Cuidados" }), _jsxs("div", { className: "flex items-center gap-3 mt-3", children: [_jsx("div", { className: "w-6 h-px bg-primary" }), _jsx("p", { className: "text-muted-foreground text-sm font-light tracking-widest uppercase", children: items ? `${checked.size}/${items.length} revisados` : "Checklist del auto" })] })] }), error && (_jsx("p", { className: "text-muted-foreground text-sm", children: "No se pudo cargar el checklist." })), !items && !error && (_jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => (_jsxs("div", { children: [_jsx("div", { className: "h-3 w-20 bg-secondary rounded animate-pulse mb-3" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-14 bg-secondary rounded-xl animate-pulse" }), _jsx("div", { className: "h-14 bg-secondary rounded-xl animate-pulse" })] })] }, i))) })), grouped && (_jsxs("div", { className: "flex flex-col gap-8", children: [grouped.map(([category, group], gi) => (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-xs tracking-widest uppercase text-primary font-medium", children: categoryLabel[category] ?? category }), _jsx("div", { className: "flex-1 h-px bg-border/40" })] }), _jsx("div", { className: "flex flex-col gap-2", children: group.map((item) => {
                                    const done = checked.has(item.id);
                                    return (_jsx("button", { onClick: () => toggle(item.id), className: `w-full text-left rounded-xl border px-4 py-3 transition-all duration-200 active:scale-[0.98] ${done
                                            ? "border-primary/30 bg-primary/5"
                                            : "border-border/50 bg-secondary/20 hover:border-border"}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [done ? (_jsx(CheckSquare, { size: 15, className: "text-primary mt-0.5 shrink-0", strokeWidth: 1.5 })) : (_jsx(Square, { size: 15, className: "text-muted-foreground/40 mt-0.5 shrink-0", strokeWidth: 1.5 })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: `text-sm font-medium transition-colors duration-200 ${done ? "text-muted-foreground line-through" : "text-foreground"}`, children: item.title }), !done && (_jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: item.description }))] })] }) }, item.id));
                                }) })] }, category))), checked.size > 0 && (_jsx("button", { onClick: () => setChecked(new Set()), className: "text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors py-2", children: "Reiniciar checklist" }))] }))] }));
}
