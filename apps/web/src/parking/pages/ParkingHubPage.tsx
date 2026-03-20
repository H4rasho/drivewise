import { Link } from "react-router";

const parkingTypes = [
  { type: "paralelo", label: "Paralelo", description: "Entre dos autos en fila" },
  { type: "bateria", label: "Batería", description: "Perpendicular al bordillo" },
  { type: "diagonal", label: "Diagonal", description: "En ángulo en el cajón" },
  { type: "pendiente", label: "En Pendiente", description: "Cuesta arriba o abajo" },
];

export default function ParkingHubPage() {
  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2">Estacionamiento</h1>
      <p className="text-muted-foreground mb-6">Elige el tipo de estacionamiento para ver la guía paso a paso.</p>
      <div className="flex flex-col gap-3">
        {parkingTypes.map(({ type, label, description }) => (
          <Link
            key={type}
            to={`/parking/${type}`}
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:shadow-sm transition-shadow"
          >
            <div>
              <h2 className="font-semibold">{label}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <span className="text-muted-foreground">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
