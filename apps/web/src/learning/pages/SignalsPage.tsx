import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
import type { Signal, SignalCategory } from "@drivewise/shared";

const categoryLabel: Record<SignalCategory, string> = {
  regulatoria: "Regulatoria",
  preventiva: "Preventiva",
  informativa: "Informativa",
  transitoria: "Transitoria",
};

const categoryOrder: SignalCategory[] = ["regulatoria", "preventiva", "informativa", "transitoria"];

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[] | null>(null);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.signals.list().then(setSignals).catch(() => setError(true));
  }, []);

  const grouped = signals
    ? categoryOrder.reduce<Record<string, Signal[]>>((acc, cat) => {
        const group = signals.filter((s) => s.category === cat);
        if (group.length) acc[cat] = group;
        return acc;
      }, {})
    : null;

  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Link
          to="/learning"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Aprender
        </Link>
      </motion.div>

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
          Señales
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            {signals ? `${signals.length} señales` : "Señales de tránsito"}
          </p>
        </div>
      </motion.div>

      {error && <p className="text-muted-foreground text-sm">No se pudieron cargar las señales.</p>}

      {!signals && !error && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {grouped && (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([cat, group], gi) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-widest uppercase text-primary font-medium">
                  {categoryLabel[cat as SignalCategory]}
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="flex flex-col gap-2">
                {group.map((signal) => {
                  const open = expanded === signal.id;
                  return (
                    <button
                      key={signal.id}
                      onClick={() => setExpanded(open ? null : signal.id)}
                      className="w-full text-left rounded-xl border border-border/50 bg-secondary/20 hover:border-border px-4 py-3 transition-all duration-200 active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">{signal.name}</p>
                        <span className="text-muted-foreground/40 text-xs shrink-0">{open ? "▲" : "▼"}</span>
                      </div>
                      {open && (
                        <div className="mt-2 space-y-1.5">
                          <p className="text-xs text-muted-foreground leading-relaxed">{signal.description}</p>
                          {signal.mnemonic && (
                            <p className="text-xs text-primary/70 italic leading-relaxed">
                              {signal.mnemonic}
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
