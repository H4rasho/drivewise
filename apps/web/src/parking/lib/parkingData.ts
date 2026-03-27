import type { ParkingType } from "@drivewise/shared";

export interface ParkingStep {
  order: number;
  instruction: string;
  tip?: string;
}

export interface ParkingGuide {
  type: ParkingType;
  title: string;
  steps: ParkingStep[];
}

const parkingGuides: Record<ParkingType, ParkingGuide> = {
  paralelo: {
    type: "paralelo",
    title: "Estacionamiento en Paralelo",
    steps: [
      {
        order: 1,
        instruction: "Posiciónate paralelo al auto de adelante, a unos 60–80 cm de distancia lateral, con tus espejos alineados con su parachoques trasero.",
        tip: "Enciende las intermitentes para avisar a los conductores de atrás que vas a estacionar.",
      },
      {
        order: 2,
        instruction: "Gira el volante a la derecha y retrocede despacio hasta que puedas ver el bordillo en el espejo izquierdo.",
        tip: "Mantén la velocidad al mínimo — solo el ralentí del motor es suficiente.",
      },
      {
        order: 3,
        instruction: "Gira el volante a la izquierda mientras sigues retrocediendo para alinear el auto paralelo al bordillo.",
        tip: "El parabrisas trasero debe apuntar al centro del espacio.",
      },
      {
        order: 4,
        instruction: "Ajusta hacia adelante y atrás hasta quedar centrado en el espacio, dejando unos 30–40 cm de separación con cada auto.",
        tip: "Activa el freno de mano y deja la marcha engranada al aparcar en pendiente.",
      },
    ],
  },

  bateria: {
    type: "bateria",
    title: "Estacionamiento en Batería",
    steps: [
      {
        order: 1,
        instruction: "Pasa de largo el espacio elegido y detente cuando tu eje trasero esté alineado con la línea divisoria derecha del cajón.",
        tip: "Señaliza con el intermitente para avisar a los conductores que vienen detrás.",
      },
      {
        order: 2,
        instruction: "Gira el volante al máximo hacia el espacio y retrocede despacio controlando los ángulos.",
        tip: "Mira los espejos laterales para verificar que tienes espacio a ambos lados.",
      },
      {
        order: 3,
        instruction: "A medida que el frontal del auto se alinea con los autos vecinos, endereza el volante y continúa retrocediendo.",
      },
      {
        order: 4,
        instruction: "Detente cuando el auto esté centrado y paralelo a las líneas del cajón. Activa el freno de mano.",
        tip: "Deja al menos 50 cm entre tu parachoques trasero y el bordillo o pared.",
      },
    ],
  },

  diagonal: {
    type: "diagonal",
    title: "Estacionamiento en Diagonal",
    steps: [
      {
        order: 1,
        instruction: "Reduce la velocidad y mantente a unos 2 m de distancia lateral de los autos estacionados, identificando el espacio vacío.",
        tip: "La diagonal facilita la entrada — casi no necesitas maniobras especiales.",
      },
      {
        order: 2,
        instruction: "Cuando el borde derecho del espacio quede frente a ti, gira el volante hacia el espacio y entra a velocidad mínima.",
      },
      {
        order: 3,
        instruction: "Endereza el volante al entrar y avanza hasta que el frontal quede dentro del cajón sin sobrepasar la línea.",
        tip: "Comprueba que los retrovisores no sobresalgan demasiado de los autos vecinos.",
      },
    ],
  },

  pendiente: {
    type: "pendiente",
    title: "Estacionamiento en Pendiente",
    steps: [
      {
        order: 1,
        instruction: "Cuesta arriba con bordillo: gira las ruedas hacia la izquierda (alejándolas del bordillo). Si el auto rueda, el bordillo lo detiene.",
        tip: "Deja la marcha en 1ª para reforzar el freno de mano.",
      },
      {
        order: 2,
        instruction: "Cuesta abajo con bordillo: gira las ruedas hacia la derecha (hacia el bordillo). El bordillo actuará de tope si el auto se mueve.",
        tip: "Deja la marcha en reversa para reforzar el freno de mano.",
      },
      {
        order: 3,
        instruction: "Sin bordillo (cualquier pendiente): gira las ruedas hacia la calzada para que el auto ruede fuera de la vía si el freno falla.",
        tip: "Esta posición de ruedas es obligatoria en muchos países cuando no hay acera.",
      },
      {
        order: 4,
        instruction: "Activa siempre el freno de mano antes de soltar el pedal de freno y deja la marcha engranada.",
        tip: "El freno de mano puede debilitarse con el tiempo — revísalo periódicamente.",
      },
    ],
  },
};

export function getParkingGuide(type: ParkingType): ParkingGuide {
  return parkingGuides[type];
}

export function getAllParkingGuides(): ParkingGuide[] {
  return Object.values(parkingGuides);
}
