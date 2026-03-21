import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
import type { Rule, RuleCategory } from "@drivewise/shared";

const categoryLabel: Record<RuleCategory, string> = {
  velocidad: "Velocidad",
  preferencia: "Preferencia",
  estacionamiento: "Estacionamiento",
  adelantamiento: "Adelantamiento",
  alcoholemia: "Alcoholemia",
  documentacion: "Documentación",
};

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[] | null>(null);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.rules.list().then(setRules).catch(() => setError(true));
  }, []);

  const grouped = rules
    ? Object.entries(
        rules.reduce<Record<string, Rule[]>>((acc, rule) => {
          if (!acc[rule.category]) acc[rule.category] = [];
          acc[rule.category].push(rule);
          return acc;
        }, {})
      )
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
          Reglas
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            {rules ? `${rules.length} reglas` : "Reglas de conducción"}
          </p>
        </div>
      </motion.div>

      {error && <p className="text-muted-foreground text-sm">No se pudieron cargar las reglas.</p>}

      {!rules && !error && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {grouped && (
        <div className="flex flex-col gap-8">
          {grouped.map(([cat, group], gi) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-widest uppercase text-primary font-medium">
                  {categoryLabel[cat as RuleCategory] ?? cat}
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="flex flex-col gap-2">
                {group.map((rule) => {
                  const open = expanded === rule.id;
                  return (
                    <button
                      key={rule.id}
                      onClick={() => setExpanded(open ? null : rule.id)}
                      className="w-full text-left rounded-xl border border-border/50 bg-secondary/20 hover:border-border px-4 py-3 transition-all duration-200 active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-foreground">{rule.title}</p>
                        <span className="text-muted-foreground/40 text-xs shrink-0">{open ? "▲" : "▼"}</span>
                      </div>
                      {open && (
                        <div className="mt-2 space-y-1.5">
                          <p className="text-xs text-muted-foreground leading-relaxed">{rule.content}</p>
                          {rule.legalRef && (
                            <p className="text-xs text-primary/60 mt-1">Ref: {rule.legalRef}</p>
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
