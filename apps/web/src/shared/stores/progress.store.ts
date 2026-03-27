import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Module } from "@drivewise/shared";

interface ProgressState {
  completedModules: Module[];
  quizHistory: { date: string; score: number; total: number }[];
  markModuleComplete: (module: Module) => void;
  addQuizResult: (score: number, total: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedModules: [],
      quizHistory: [],

      markModuleComplete: (module) => {
        set((s) => ({
          completedModules: s.completedModules.includes(module)
            ? s.completedModules
            : [...s.completedModules, module],
        }));
      },

      addQuizResult: (score, total) => {
        set((s) => ({
          quizHistory: [
            ...s.quizHistory,
            { date: new Date().toISOString(), score, total },
          ],
        }));
      },
    }),
    { name: "drivewise-progress" }
  )
);
