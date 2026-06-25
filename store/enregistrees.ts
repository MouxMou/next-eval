import { create } from "zustand";
import { persist } from "zustand/middleware";

type EnregistreesState = {
  enregistrees: string[];
  toggle: (uid: string) => void;
  remove: (uid: string) => void;
  isEnregistree: (uid: string) => boolean;
  keepOnly: (validUids: string[]) => void;
};

export const useEnregistreesStore = create<EnregistreesState>()(
  persist(
    (set, get) => ({
      enregistrees: [],
      toggle: (uid) =>
        set((s) => ({
          enregistrees: s.enregistrees.includes(uid)
            ? s.enregistrees.filter((u) => u !== uid)
            : [...s.enregistrees, uid],
        })),
      remove: (uid) =>
        set((s) => ({
          enregistrees: s.enregistrees.filter((u) => u !== uid),
        })),
      isEnregistree: (uid) => get().enregistrees.includes(uid),
      keepOnly: (validUids) =>
        set((s) => ({
          enregistrees: s.enregistrees.filter((u) => validUids.includes(u)),
        })),
    }),
    { name: "offres-enregistrees" },
  ),
);
