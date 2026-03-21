import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, TriangleAlert, BookText, CircleHelp } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
import type { Signal, Rule } from "@drivewise/shared";

export default function LearningPage() {
  const [signals, setSignals] = useState<Signal[] | null>(null);
  const [rules, setRules] = useState<Rule[] | null>(null);

  useEffect(() => {
    api.signals.list().then(setSignals).catch(() => {});
    api.rules.list().then(setRules).catch(() => {});
  }, []);

  const modules = [
    {
      icon: TriangleAlert,
      num: "01",
      title: "Señales de tránsito",
      description: signals ? `${signals.length} señales` : "Regulatorias, preventivas, informativas",
      to: "/learning/signals",
    },
    {
      icon: BookText,
      num: "02",
      title: "Reglas de conducción",
      description: rules ? `${rules.length} reglas` : "Velocidad, preferencia, adelantamiento",
      to: "/learning/rules",
    },
    {
      icon: CircleHelp,
      num: "03",
      title: "Quiz",
      description: "Pon a prueba tus conocimientos",
      to: "/learning/quiz",
    },
  ];

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Inicio
        </Link>
      </motion.div>

      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      >
        <h1
          className="text-7xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          Aprender
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            Elige una sección
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col">
        {modules.map(({ icon: Icon, num, title, description, to }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.12 + i * 0.08, ease: "easeOut" }}
          >
            <Link
              to={to}
              className="group flex items-center gap-4 py-4 border-b border-border/50 transition-all duration-200 active:scale-[0.98]"
            >
              <span
                className="text-4xl w-10 shrink-0 text-primary/30 group-hover:text-primary/60 transition-colors duration-200 leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {num}
              </span>
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                <Icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm tracking-wide text-foreground">{title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
              </div>
              <ArrowRight
                size={15}
                className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
