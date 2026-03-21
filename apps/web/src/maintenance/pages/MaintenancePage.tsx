import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/shared/lib/api";
import type { MaintenanceItem, MaintenanceFrequency } from "@drivewise/shared";

const frequencyLabel: Record<MaintenanceFrequency, string> = {
  mensual: "Mensual",
  trimestral: "Trimestral",
  semestral: "Semestral",
  anual: "Anual",
  por_kilometraje: "Por km",
};

const frequencyOrder: MaintenanceFrequency[] = [
  "mensual",
  "trimestral",
  "semestral",
  "anual",
  "por_kilometraje",
];

export default function MaintenancePage() {
  const [items, setItems] = useState<MaintenanceItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.maintenance.schedule().then(setItems).catch(() => setError(true));
  }, []);

  const grouped = items
    ? frequencyOrder.reduce<Record<string, MaintenanceItem[]>>((acc, freq) => {
        const group = items.filter((i) => i.frequency === freq);
        if (group.length) acc[freq] = group;
        return acc;
      }, {})
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
          Mantención
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            Calendario de mantención
          </p>
        </div>
      </motion.div>

      {error && (
        <p className="text-muted-foreground text-sm">No se pudo cargar el calendario.</p>
      )}

      {!items && !error && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-secondary rounded animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-16 bg-secondary rounded-xl animate-pulse" />
                <div className="h-16 bg-secondary rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {grouped && (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([freq, group], gi) => (
            <motion.div
              key={freq}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + gi * 0.06, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-widest uppercase text-primary font-medium">
                  {frequencyLabel[freq as MaintenanceFrequency]}
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="flex flex-col gap-2">
                {group.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border/50 bg-secondary/20 px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <Gauge size={14} className="text-primary/50 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        {item.kmInterval && (
                          <p className="text-xs text-primary/60 mt-1">
                            Cada {item.kmInterval.toLocaleString()} km
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
