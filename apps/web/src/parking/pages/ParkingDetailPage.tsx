import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Lightbulb, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
import type { ParkingTip, ParkingType } from "@drivewise/shared";

const typeLabels: Record<ParkingType, string> = {
  paralelo: "Paralelo",
  bateria: "Batería",
  diagonal: "Diagonal",
  pendiente: "En Pendiente",
};

export default function ParkingDetailPage() {
  const { type } = useParams<{ type: ParkingType }>();
  const [tip, setTip] = useState<ParkingTip | null>(null);
  const [error, setError] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!type) return;
    api.parking
      .tipByType(type as ParkingType)
      .then(setTip)
      .catch(() => setError(true));
  }, [type]);

  const toggleStep = (order: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(order) ? next.delete(order) : next.add(order);
      return next;
    });
  };

  if (error) {
    return (
      <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
        <Link
          to="/parking"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
        <p className="text-muted-foreground text-sm">No se pudo cargar la guía.</p>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
        <div className="h-4 w-32 bg-secondary rounded animate-pulse mb-10" />
        <div className="h-16 w-48 bg-secondary rounded animate-pulse mb-4" />
        <div className="space-y-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const allDone = completedSteps.size === tip.steps.length;

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Link
          to="/parking"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Estacionar
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      >
        <h1
          className="text-7xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          {typeLabels[tip.type]}
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            {tip.steps.length} pasos · {completedSteps.size} completados
          </p>
        </div>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        {tip.steps.map((step, i) => {
          const done = completedSteps.has(step.order);
          return (
            <motion.div
              key={step.order}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07, ease: "easeOut" }}
            >
              <button
                onClick={() => toggleStep(step.order)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 active:scale-[0.98] ${
                  done
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/50 bg-secondary/30 hover:border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Step number + check */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <span
                      className="text-2xl leading-none text-primary/40"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      {String(step.order).padStart(2, "0")}
                    </span>
                    {done ? (
                      <CheckCircle2 size={14} className="text-primary" />
                    ) : (
                      <Circle size={14} className="text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 ${
                        done ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                    >
                      {step.instruction}
                    </p>
                    {step.tip && !done && (
                      <div className="flex items-start gap-1.5 mt-2.5">
                        <Lightbulb size={12} className="text-primary/60 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Completion banner */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 text-center"
        >
          <p className="text-sm font-medium text-primary tracking-wide">
            Completaste todos los pasos
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Practica hasta que sea natural
          </p>
        </motion.div>
      )}

      {/* Reset */}
      {completedSteps.size > 0 && (
        <button
          onClick={() => setCompletedSteps(new Set())}
          className="mt-4 w-full text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors py-2"
        >
          Reiniciar pasos
        </button>
      )}
    </div>
  );
}
