import { create } from "zustand";
const STORAGE_KEY = "dw_vehicle";
export const useVehicleStore = create((set) => ({
    vehicle: localStorage.getItem(STORAGE_KEY) ?? "sedan",
    setVehicle: (vehicle) => {
        localStorage.setItem(STORAGE_KEY, vehicle);
        set({ vehicle });
    },
}));
