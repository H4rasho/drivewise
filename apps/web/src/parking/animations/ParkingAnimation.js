import { jsx as _jsx } from "react/jsx-runtime";
import ParaleloAnimation from "./ParaleloAnimation";
import BateriaAnimation from "./BateriaAnimation";
import DiagonalAnimation from "./DiagonalAnimation";
import PendienteAnimation from "./PendienteAnimation";
export default function ParkingAnimation({ type, step }) {
    switch (type) {
        case "paralelo":
            return _jsx(ParaleloAnimation, { step: step });
        case "bateria":
            return _jsx(BateriaAnimation, { step: step });
        case "diagonal":
            return _jsx(DiagonalAnimation, { step: step });
        case "pendiente":
            return _jsx(PendienteAnimation, { step: step });
    }
}
