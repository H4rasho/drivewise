import { Link } from "react-router";
import { ParkingSquare, Wrench, Car, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const modules = [
  {
    to: "/parking",
    icon: ParkingSquare,
    num: "01",
    title: "Estacionamiento",
    description: "Paralelo, batería, diagonal y en pendiente",
  },
  {
    to: "/maintenance",
    icon: Wrench,
    num: "02",
    title: "Mantención",
    description: "Recordatorios y calendario de mantención",
  },
  {
    to: "/care",
    icon: Car,
    num: "03",
    title: "Cuidados",
    description: "Checklists y guías de cuidado del auto",
  },
  {
    to: "/learning",
    icon: BookOpen,
    num: "04",
    title: "Aprender",
    description: "Señales, reglas y quiz de conducción",
  },
];

export default function HomePage() {
  return (
    <div className="px-5 pt-14 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h1
          className="text-7xl leading-none text-foreground"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
        >
          DriveWise
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-px bg-primary" />
          <p className="text-muted-foreground text-sm font-light tracking-widest uppercase">
            Tu guía para aprender a manejar
          </p>
        </div>
      </motion.div>

      {/* Modules */}
      <div className="flex flex-col">
        {modules.map(({ to, icon: Icon, num, title, description }, i) => (
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
              {/* Number */}
              <span
                className="text-4xl w-10 shrink-0 text-primary/30 group-hover:text-primary/60 transition-colors duration-200 leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {num}
              </span>

              {/* Icon */}
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                <Icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm tracking-wide text-foreground">{title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
              </div>

              {/* Arrow */}
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
