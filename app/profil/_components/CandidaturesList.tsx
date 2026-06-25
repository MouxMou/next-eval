"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { asText, Content } from "@prismicio/client";
import { Candidature, useCandidaturesStore } from "@/store/candidatures";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";

type Props = {
  offres: Content.OffreDocument[];
  technos: Content.TechnoDocument[];
};

export default function CandidaturesList({ offres, technos }: Props) {
  const [mounted, setMounted] = useState(false);
  const candidatures = useCandidaturesStore((s) => s.candidatures);
  const keepOnly = useCandidaturesStore((s) => s.keepOnly);

  useEffect(() => {
    setMounted(true);
    keepOnly(offres.map((o) => o.uid));
  }, [offres, keepOnly]);

  if (!mounted) return null;

  const index = buildTechnoIndex(technos);
  const offreByUid = new Map(offres.map((o) => [o.uid, o]));

  const items = candidatures
    .map((c) => ({ ...c, offre: offreByUid.get(c.uid) }))
    .filter(
      (c): c is Candidature & { offre: Content.OffreDocument } =>
        Boolean(c.offre),
    );

  if (items.length === 0) {
    return <p className="text-muted">Aucune candidature pour le moment.</p>;
  }

  return (
    <ul className="flex flex-col gap-6">
      {items.map(({ uid, date, offre }) => {
        const technosResolved = getOffreTechnos(offre, index);
        const firstText = offre.data.slices.find(
          (s) => s.slice_type === "text_slice",
        );
        const excerpt = firstText ? asText(firstText.primary.text) : "";
        return (
          <li
            key={`${uid}-${date}`}
            className="border-b border-blue/40 pb-4 flex flex-col gap-2"
          >
            <p className="flex items-center gap-2 text-sm text-blue">
              <span className="material-symbols-outlined text-blue">
                calendar_month
              </span>
              {new Date(date).toLocaleDateString("fr-FR")}
            </p>
            <h3>
              <Link href={`/offres/${offre.uid}`} className="hover:text-blue">
                {offre.data.title}
              </Link>
            </h3>
            {technosResolved.length > 0 && (
              <p className="flex items-center gap-2 text-sm text-blue">
                <span className="material-symbols-outlined text-blue">code</span>
                {technosResolved.map((t) => t.data.name).join(", ")}
              </p>
            )}
            {excerpt && (
              <p className="text-sm text-blue/80 line-clamp-2">{excerpt}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
