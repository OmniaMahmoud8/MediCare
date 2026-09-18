import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      // Current Patient

      currentPatient: null,

      setCurrentPatient: (patient) =>
        set({
          currentPatient: patient,
        }),

      clearCurrentPatient: () =>
        set({
          currentPatient: null,
        }),

      // Favorite Doctors

      favoriteDoctors: [],

      toggleFavoriteDoctor: (doctorId) =>
        set((state) => {
          const exists = state.favoriteDoctors.includes(doctorId);

          return {
            favoriteDoctors: exists
              ? state.favoriteDoctors.filter((id) => id !== doctorId)
              : [...state.favoriteDoctors, doctorId],
          };
        }),
    }),
    {
      name: "medicare-storage",
    },
  ),
);

export default useAppStore;
