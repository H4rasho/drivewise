import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicleStore } from "@/shared/stores/vehicle.store";
import { useProgressStore } from "@/shared/stores/progress.store";
import type { ParkingType } from "@drivewise/shared";
import ParkingAnimation from "../animations/ParkingAnimation";
import { getVehicleTip } from "../lib/vehicleTips";
import { getParkingGuide } from "../lib/parkingData";

const typeLabels: Record<ParkingType, string> = {
  paralelo: "Paralelo",
  bateria: "Batería",
  diagonal: "Diagonal",
  pendiente: "En Pendiente",
};

const validTypes: ParkingType[] = ["paralelo", "bateria", "diagonal", "pendiente"];

export default function ParkingDetailPage() {
  const { type } = useParams<{ type: string }>();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const { vehicle } = useVehicleStore();
  const { markModuleComplete } = useProgressStore();

  useEffect(() => {
    setStep(0);
    setDone(false);
  }, [type]);

  if (!type || !validTypes.includes(type as ParkingType)) {
    return (
      <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
        <Link
          to="/parking"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
        <p className="text-muted-foreground text-sm">Tipo de estacionamiento no válido.</p>
      </div>
    );
  }

  const parkingType = type as ParkingType;
  const guide = getParkingGuide(parkingType);
  const currentStep = guide.steps[step];
  const isFirst = step === 0;
  const isLast = step === guide.steps.length - 1;
  const vehicleTip = getVehicleTip(parkingType, vehicle);

  const handleNext = () => {
    if (isLast) {
      setDone(true);
      markModuleComplete("parking");
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (done) {
      setDone(false);
    } else {
      setStep((s) => Math.max(0, s - 1));
    }
  };

  const handleRestart = () => {
    setStep(0);
    setDone(false);
  };

  return (
    <div className="px-5 pt-14 pb-8 max-w-lg mx-auto">
      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Link
          to="/parking"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Estacionar
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h1
          className="text-6xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          {typeLabels[parkingType]}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-xs font-light tracking-widest uppercase">
            {done ? "Completado" : `Paso ${step + 1} de ${guide.steps.length}`}
          </p>
        </div>
      </motion.div>

      {/* SVG Animation */}
      <motion.div
        className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-border/30 mb-5"
        style={{
          aspectRatio:
            parkingType === "paralelo" ? "260/420" :
            parkingType === "pendiente" ? "300/340" :
            "320/310",
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ParkingAnimation type={parkingType} step={done ? guide.steps.length - 1 : step} />
      </motion.div>

      {/* Step progress dots */}
      <div className="flex items-center justify-center gap-2 mb-5">
        {guide.steps.map((_, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setDone(false); }}
            className={`rounded-full transition-all duration-300 ${
              i === step && !done
                ? "w-5 h-2 bg-primary"
                : i < step || done
                ? "w-2 h-2 bg-primary/40"
                : "w-2 h-2 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="mb-5"
          >
            {/* Step number + instruction */}
            <div className="rounded-xl border border-border/40 bg-secondary/20 px-4 py-4">
              <div className="flex items-start gap-3">
                <span
                  className="text-3xl leading-none text-primary/40 shrink-0 pt-0.5"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {String(currentStep.order).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-foreground">{currentStep.instruction}</p>
              </div>

              {currentStep.tip && (
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/30">
                  <Lightbulb size={12} className="text-primary/60 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{currentStep.tip}</p>
                </div>
              )}
            </div>

            {/* Vehicle-specific tip (only on first step) */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-2 mt-3 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/15"
              >
                <Car size={12} className="text-primary/70 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{vehicleTip}</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-5 text-center mb-5"
          >
            <p className="text-sm font-medium text-primary tracking-wide">¡Guía completada!</p>
            <p className="text-xs text-muted-foreground mt-1">Practica hasta que sea natural</p>
            <button
              onClick={handleRestart}
              className="mt-3 text-xs text-primary/70 hover:text-primary transition-colors underline underline-offset-2"
            >
              Volver a empezar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={isFirst && !done}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-border disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={done}
          className="flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
        >
          {isLast ? "Completar" : "Siguiente"}
          {!isLast && <ChevronRight size={16} />}
          {isLast && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}
