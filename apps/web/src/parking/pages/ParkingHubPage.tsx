import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import VehicleSelector from "../components/VehicleSelector";

const parkingTypes = [
  { type: "paralelo", num: "01", label: "Paralelo", description: "Entre dos autos en fila" },
  { type: "bateria", num: "02", label: "Batería", description: "Perpendicular al bordillo" },
  { type: "diagonal", num: "03", label: "Diagonal", description: "En ángulo en el cajón" },
  { type: "pendiente", num: "04", label: "En Pendiente", description: "Cuesta arriba o abajo" },
];

export default function ParkingHubPage() {
  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 tracking-wide uppercase"
        >
          <ArrowLeft size={14} />
          Inicio
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      >
        <h1
          className="text-7xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          Estacionar
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            Elige el tipo de estacionamiento
          </p>
        </div>
      </motion.div>

      {/* Vehicle selector */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
      >
        <p className="text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-2">
          Mi vehículo
        </p>
        <VehicleSelector />
      </motion.div>

      {/* Types */}
      <div className="flex flex-col">
        {parkingTypes.map(({ type, num, label, description }, i) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.18 + i * 0.08, ease: "easeOut" }}
          >
            <Link
              to={`/parking/${type}`}
              className="group flex items-center gap-4 py-4 border-b border-border/50 transition-all duration-200 active:scale-[0.98]"
            >
              <span
                className="text-4xl w-10 shrink-0 text-primary/30 group-hover:text-primary/60 transition-colors duration-200 leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {num}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm text-foreground">{label}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
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
