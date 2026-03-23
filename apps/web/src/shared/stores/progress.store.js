import { create } from "zustand";
import { getDeviceId } from "../lib/device";
import { api } from "../lib/api";
export const useProgressStore = create((set, get) => ({
    deviceId: getDeviceId(),
    completedModules: [],
    quizHistory: [],
    markModuleComplete: (module) => {
        set((s) => ({
            completedModules: s.completedModules.includes(module)
                ? s.completedModules
                : [...s.completedModules, module],
        }));
        get().syncWithServer();
    },
    addQuizResult: (score, total) => {
        set((s) => ({
            quizHistory: [
                ...s.quizHistory,
                { date: new Date().toISOString(), score, total },
            ],
        }));
        get().syncWithServer();
    },
    syncWithServer: async () => {
        const { deviceId, completedModules, quizHistory } = get();
        try {
            await api.progress.sync({ deviceId, completedModules, quizHistory });
        }
        catch {
            // silent — offline-first
        }
    },
}));
// Load progress from server on init
const { deviceId } = useProgressStore.getState();
api.progress.get(deviceId).then((p) => {
    useProgressStore.setState({
        completedModules: p.completedModules,
        quizHistory: p.quizHistory,
    });
}).catch(() => {
    // not found yet — fresh device
});
