import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";

interface CareItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

const categoryLabel: Record<string, string> = {
  motor: "Motor",
  neumaticos: "Neumáticos",
  frenos: "Frenos",
  exterior: "Exterior",
  electrico: "Eléctrico",
};

export default function CarePage() {
  const [items, setItems] = useState<CareItem[] | null>(null);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.care.checklist().then(setItems).catch(() => setError(true));
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const grouped = items
    ? Object.entries(
        items.reduce<Record<string, CareItem[]>>((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {})
      )
    : null;

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
        className="mb-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      >
        <h1
          className="text-7xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          Cuidados
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            {items ? `${checked.size}/${items.length} revisados` : "Checklist del auto"}
          </p>
        </div>
      </motion.div>

      {error && (
        <p className="text-muted-foreground text-sm">No se pudo cargar el checklist.</p>
      )}

      {!items && !error && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 w-20 bg-secondary rounded animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-14 bg-secondary rounded-xl animate-pulse" />
                <div className="h-14 bg-secondary rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {grouped && (
        <div className="flex flex-col gap-8">
          {grouped.map(([category, group], gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-widest uppercase text-primary font-medium">
                  {categoryLabel[category] ?? category}
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="flex flex-col gap-2">
                {group.map((item) => {
                  const done = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition-all duration-200 active:scale-[0.98] ${
                        done
                          ? "border-primary/30 bg-primary/5"
                          : "border-border/50 bg-secondary/20 hover:border-border"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {done ? (
                          <CheckSquare size={15} className="text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                        ) : (
                          <Square size={15} className="text-muted-foreground/40 mt-0.5 shrink-0" strokeWidth={1.5} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium transition-colors duration-200 ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                            {item.title}
                          </p>
                          {!done && (
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {checked.size > 0 && (
            <button
              onClick={() => setChecked(new Set())}
              className="text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors py-2"
            >
              Reiniciar checklist
            </button>
          )}
        </div>
      )}
    </div>
  );
}
