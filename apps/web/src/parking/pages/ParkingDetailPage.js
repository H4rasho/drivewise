import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/shared/lib/api";
import { useVehicleStore } from "@/shared/stores/vehicle.store";
import { useProgressStore } from "@/shared/stores/progress.store";
import ParkingAnimation from "../animations/ParkingAnimation";
import { getVehicleTip } from "../lib/vehicleTips";
const typeLabels = {
    paralelo: "Paralelo",
    bateria: "Batería",
    diagonal: "Diagonal",
    pendiente: "En Pendiente",
};
export default function ParkingDetailPage() {
    const { type } = useParams();
    const [tip, setTip] = useState(null);
    const [error, setError] = useState(false);
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);
    const { vehicle } = useVehicleStore();
    const { markModuleComplete } = useProgressStore();
    useEffect(() => {
        if (!type)
            return;
        api.parking
            .tipByType(type)
            .then(setTip)
            .catch(() => setError(true));
    }, [type]);
    // Reset step when type changes
    useEffect(() => {
        setStep(0);
        setDone(false);
    }, [type]);
    if (error) {
        return (_jsxs("div", { className: "px-5 pt-14 pb-4 max-w-lg mx-auto", children: [_jsxs(Link, { to: "/parking", className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase", children: [_jsx(ArrowLeft, { size: 14 }), "Volver"] }), _jsx("p", { className: "text-muted-foreground text-sm", children: "No se pudo cargar la gu\u00EDa." })] }));
    }
    if (!tip) {
        return (_jsxs("div", { className: "px-5 pt-14 pb-4 max-w-lg mx-auto", children: [_jsx("div", { className: "h-4 w-32 bg-secondary rounded animate-pulse mb-10" }), _jsx("div", { className: "aspect-[4/3] bg-secondary rounded-2xl animate-pulse mb-6" }), _jsx("div", { className: "h-16 w-48 bg-secondary rounded animate-pulse mb-4" }), _jsx("div", { className: "h-24 bg-secondary rounded-xl animate-pulse" })] }));
    }
    const currentStep = tip.steps[step];
    const isFirst = step === 0;
    const isLast = step === tip.steps.length - 1;
    const vehicleTip = getVehicleTip(tip.type, vehicle);
    const handleNext = () => {
        if (isLast) {
            setDone(true);
            markModuleComplete("parking");
        }
        else {
            setStep((s) => s + 1);
        }
    };
    const handlePrev = () => {
        if (done) {
            setDone(false);
        }
        else {
            setStep((s) => Math.max(0, s - 1));
        }
    };
    const handleRestart = () => {
        setStep(0);
        setDone(false);
    };
    return (_jsxs("div", { className: "px-5 pt-14 pb-8 max-w-lg mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, children: _jsxs(Link, { to: "/parking", className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 tracking-wide uppercase", children: [_jsx(ArrowLeft, { size: 14 }), "Estacionar"] }) }), _jsxs(motion.div, { className: "mb-5", initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.05 }, children: [_jsx("h1", { className: "text-6xl leading-none text-foreground", style: { fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }, children: typeLabels[tip.type] }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsx("div", { className: "w-6 h-px bg-primary" }), _jsx("p", { className: "text-muted-foreground text-xs font-light tracking-widest uppercase", children: done ? "Completado" : `Paso ${step + 1} de ${tip.steps.length}` })] })] }), _jsx(motion.div, { className: "rounded-2xl overflow-hidden bg-[#1a1a1a] border border-border/30 mb-5", style: { aspectRatio: tip.type === "paralelo" ? "260/420" : tip.type === "pendiente" ? "300/340" : "320/310" }, initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 0.1 }, children: _jsx(ParkingAnimation, { type: tip.type, step: done ? tip.steps.length - 1 : step }) }), _jsx("div", { className: "flex items-center justify-center gap-2 mb-5", children: tip.steps.map((_, i) => (_jsx("button", { onClick: () => { setStep(i); setDone(false); }, className: `rounded-full transition-all duration-300 ${i === step && !done
                        ? "w-5 h-2 bg-primary"
                        : i < step || done
                            ? "w-2 h-2 bg-primary/40"
                            : "w-2 h-2 bg-border"}` }, i))) }), _jsx(AnimatePresence, { mode: "wait", children: !done ? (_jsxs(motion.div, { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -12 }, transition: { duration: 0.25 }, className: "mb-5", children: [_jsxs("div", { className: "rounded-xl border border-border/40 bg-secondary/20 px-4 py-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: "text-3xl leading-none text-primary/40 shrink-0 pt-0.5", style: { fontFamily: "'Bebas Neue', cursive" }, children: String(currentStep.order).padStart(2, "0") }), _jsx("p", { className: "text-sm leading-relaxed text-foreground", children: currentStep.instruction })] }), currentStep.tip && (_jsxs("div", { className: "flex items-start gap-2 mt-3 pt-3 border-t border-border/30", children: [_jsx(Lightbulb, { size: 12, className: "text-primary/60 mt-0.5 shrink-0" }), _jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: currentStep.tip })] }))] }), step === 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, className: "flex items-start gap-2 mt-3 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/15", children: [_jsx(Car, { size: 12, className: "text-primary/70 mt-0.5 shrink-0" }), _jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: vehicleTip })] }))] }, step)) : (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.35 }, className: "rounded-xl border border-primary/30 bg-primary/5 px-5 py-5 text-center mb-5", children: [_jsx("p", { className: "text-sm font-medium text-primary tracking-wide", children: "\u00A1Gu\u00EDa completada!" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Practica hasta que sea natural" }), _jsx("button", { onClick: handleRestart, className: "mt-3 text-xs text-primary/70 hover:text-primary transition-colors underline underline-offset-2", children: "Volver a empezar" })] }, "done")) }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("button", { onClick: handlePrev, disabled: isFirst && !done, className: "flex items-center gap-2 px-4 py-3 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]", children: [_jsx(ChevronLeft, { size: 16 }), "Anterior"] }), _jsxs("button", { onClick: handleNext, disabled: done, className: "flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]", children: [isLast ? "Completar" : "Siguiente", !isLast && _jsx(ChevronRight, { size: 16 }), isLast && _jsx(ArrowRight, { size: 16 })] })] })] }));
}
