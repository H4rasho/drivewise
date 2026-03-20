import { useParams } from "react-router";

export default function ParkingDetailPage() {
  const { type } = useParams();
  return (
    <div className="px-4 py-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold capitalize">{type}</h1>
      <p className="text-muted-foreground mt-2">Guía en construcción — Fase 2</p>
    </div>
  );
}
