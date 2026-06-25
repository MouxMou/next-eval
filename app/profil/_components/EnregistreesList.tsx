"use client";

import { useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import OffreCard from "@/composants/ui/OffreCard";
import { useEnregistreesStore } from "@/store/enregistrees";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";

type Props = {
  offres: Content.OffreDocument[];
  technos: Content.TechnoDocument[];
};

export default function EnregistreesList({ offres, technos }: Props) {
  const [mounted, setMounted] = useState(false);
  const enregistrees = useEnregistreesStore((s) => s.enregistrees);
  const keepOnly = useEnregistreesStore((s) => s.keepOnly);

  useEffect(() => {
    setMounted(true);
    keepOnly(offres.map((o) => o.uid));
  }, [offres, keepOnly]);

  if (!mounted) return null;

  const index = buildTechnoIndex(technos);
  const saved = offres.filter((o) => enregistrees.includes(o.uid));

  if (saved.length === 0) {
    return (
      <p className="text-muted">Aucune offre enregistrée pour le moment.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {saved.map((offre) => (
        <OffreCard
          key={offre.id}
          offre={offre}
          technos={getOffreTechnos(offre, index)}
        />
      ))}
    </div>
  );
}
