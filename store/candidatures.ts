import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Candidature = { uid: string; date: string };

type CandidaturesState = {
  candidatures: Candidature[];
  addCandidature: (uid: string) => void;
  keepOnly: (validUids: string[]) => void;
};

export const useCandidaturesStore = create<CandidaturesState>()(
  persist(
    (set) => ({
      candidatures: [],
      addCandidature: (uid) =>
        set((s) => ({
          candidatures: [
            { uid, date: new Date().toISOString() },
            ...s.candidatures,
          ],
        })),
      keepOnly: (validUids) =>
        set((s) => ({
          candidatures: s.candidatures.filter((c) => validUids.includes(c.uid)),
        })),
    }),
    { name: "candidatures" },
  ),
);
