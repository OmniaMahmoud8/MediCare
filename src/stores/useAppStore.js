import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      // Current Patient

      currentPatient: null,

      // Create / Set Current Patient

      setCurrentPatient: (patient) =>
        set({
          currentPatient: patient,
        }),

      // Update Current Patient

      updateCurrentPatient: (updatedData) =>
        set((state) => ({
          currentPatient: state.currentPatient
            ? {
                ...state.currentPatient,
                ...updatedData,
              }
            : updatedData,
        })),

      // Clear Profile

      clearCurrentPatient: () =>
        set({
          currentPatient: null,
        }),
    }),
    {
      name: "medicare-current-patient",
    },
  ),
);

export default useAppStore;
