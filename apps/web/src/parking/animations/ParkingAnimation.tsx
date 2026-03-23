import type { ParkingType } from "@drivewise/shared";
import ParaleloAnimation from "./ParaleloAnimation";
import BateriaAnimation from "./BateriaAnimation";
import DiagonalAnimation from "./DiagonalAnimation";
import PendienteAnimation from "./PendienteAnimation";

interface Props {
  type: ParkingType;
  step: number; // 0-indexed
}

export default function ParkingAnimation({ type, step }: Props) {
  switch (type) {
    case "paralelo":
      return <ParaleloAnimation step={step} />;
    case "bateria":
      return <BateriaAnimation step={step} />;
    case "diagonal":
      return <DiagonalAnimation step={step} />;
    case "pendiente":
      return <PendienteAnimation step={step} />;
  }
}
