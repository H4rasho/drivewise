import { useVehicleStore, type VehicleType } from "@/shared/stores/vehicle.store";

const options: { value: VehicleType; label: string; sublabel: string }[] = [
  { value: "compacto", label: "Compacto", sublabel: "Hatchback" },
  { value: "sedan", label: "Sedán", sublabel: "/ Familiar" },
  { value: "suv", label: "SUV", sublabel: "/ Camioneta" },
];

export default function VehicleSelector() {
  const { vehicle, setVehicle } = useVehicleStore();

  return (
    <div className="flex gap-2">
      {options.map(({ value, label, sublabel }) => (
        <button
          key={value}
          onClick={() => setVehicle(value)}
          className={`flex-1 py-2.5 px-2 rounded-lg border text-left transition-all duration-200 active:scale-[0.97] ${
            vehicle === value
              ? "border-primary/50 bg-primary/8 text-foreground"
              : "border-border/40 bg-secondary/20 text-muted-foreground hover:border-border"
          }`}
        >
          <p className="text-xs font-medium leading-none">{label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">{sublabel}</p>
        </button>
      ))}
    </div>
  );
}
