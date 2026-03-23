import { create } from "zustand";

export type VehicleType = "compacto" | "sedan" | "suv";

interface VehicleState {
  vehicle: VehicleType;
  setVehicle: (v: VehicleType) => void;
}

const STORAGE_KEY = "dw_vehicle";

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicle: (localStorage.getItem(STORAGE_KEY) as VehicleType) ?? "sedan",
  setVehicle: (vehicle) => {
    localStorage.setItem(STORAGE_KEY, vehicle);
    set({ vehicle });
  },
}));
