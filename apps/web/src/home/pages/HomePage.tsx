import { Link } from "react-router";
import { ParkingSquare, Wrench, BookOpen, Car } from "lucide-react";

const modules = [
  {
    to: "/parking",
    icon: ParkingSquare,
    title: "Estacionamiento",
    description: "Aprende paralelo, batería, diagonal y más",
    color: "bg-blue-50 text-blue-600",
  },
  {
    to: "/maintenance",
    icon: Wrench,
    title: "Mantención",
    description: "Recordatorios y calendario de mantención",
    color: "bg-orange-50 text-orange-600",
  },
  {
    to: "/care",
    icon: Car,
    title: "Cuidados",
    description: "Checklists y guías de cuidado del auto",
    color: "bg-green-50 text-green-600",
  },
  {
    to: "/learning",
    icon: BookOpen,
    title: "Aprender",
    description: "Señales, reglas y quiz de conducción",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function HomePage() {
  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">DriveWise</h1>
        <p className="text-muted-foreground mt-1">
          Tu guía para aprender a manejar en 2026
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {modules.map(({ to, icon: Icon, title, description, color }) => (
          <Link
            key={to}
            to={to}
            className="rounded-xl border border-border p-4 hover:shadow-sm transition-shadow active:scale-95"
          >
            <div className={`inline-flex p-2 rounded-lg mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <h2 className="font-semibold text-sm">{title}</h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
