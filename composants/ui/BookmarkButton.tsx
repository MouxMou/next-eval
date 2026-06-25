"use client";

import { useEnregistreesStore } from "@/store/enregistrees";

export default function BookmarkButton({ uid }: { uid: string }) {
  const isEnregistree = useEnregistreesStore((s) =>
    s.enregistrees.includes(uid),
  );
  const toggle = useEnregistreesStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(uid)}
      aria-label={
        isEnregistree ? "Retirer des enregistrées" : "Enregistrer l'offre"
      }
      className="text-navy cursor-pointer"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: isEnregistree ? "'FILL' 1" : "'FILL' 0" }}
      >
        bookmark
      </span>
    </button>
  );
}
