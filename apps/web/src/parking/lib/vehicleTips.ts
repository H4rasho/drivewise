import type { ParkingType } from "@drivewise/shared";
import type { VehicleType } from "@/shared/stores/vehicle.store";

const tips: Record<ParkingType, Record<VehicleType, string>> = {
  paralelo: {
    compacto: "Con auto compacto necesitas un espacio de al menos 5.5m — unos 70cm más que tu auto.",
    sedan: "Busca un espacio de al menos 6.5m. Tendrás que maniobrar más veces si el espacio es justo.",
    suv: "Con SUV necesitas al menos 7.5m. Si el espacio es muy ajustado, sigue buscando.",
  },
  bateria: {
    compacto: "El radio de giro compacto te ayuda — puedes entrar con menos distancia previa.",
    sedan: "Posiciónate a 1m de los autos estacionados antes de iniciar el giro.",
    suv: "Necesitas más distancia previa: posiciónate a 1.5–2m antes de girar. Cuida los retrovisores.",
  },
  diagonal: {
    compacto: "Fácil con compacto — el ángulo del cajón hace el trabajo. Entra despacio.",
    sedan: "Alinéate bien de frente al espacio antes de entrar para no quedar torcido.",
    suv: "Con SUV verifica que no sobresalgas de la línea frontal y que los retrovisores quepan.",
  },
  pendiente: {
    compacto: "Siempre activa el freno de mano aunque sea leve pendiente — el auto es liviano.",
    sedan: "Activa freno de mano y deja en 1ª marcha (cuesta arriba) o reversa (cuesta abajo).",
    suv: "El peso del SUV aumenta la fuerza de rodadura — freno de mano siempre, sin excepción.",
  },
};

export function getVehicleTip(type: ParkingType, vehicle: VehicleType): string {
  return tips[type][vehicle];
}
