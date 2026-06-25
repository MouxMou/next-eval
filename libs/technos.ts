import { Content, isFilled } from "@prismicio/client";

export type TechnoIndex = Map<string, Content.TechnoDocument>;

/** Construit un index id → document techno (pour résoudre les relations des offres). */
export function buildTechnoIndex(
  technos: Content.TechnoDocument[],
): TechnoIndex {
  return new Map(technos.map((t) => [t.id, t]));
}

/** Renvoie les documents techno reliés à une offre, dans l'ordre. */
export function getOffreTechnos(
  offre: Content.OffreDocument,
  index: TechnoIndex,
): Content.TechnoDocument[] {
  return offre.data.technos
    .map(({ techno }) =>
      isFilled.contentRelationship(techno) ? index.get(techno.id) : undefined,
    )
    .filter((t): t is Content.TechnoDocument => Boolean(t));
}

/**
 * Chaque techno avec le nombre d'offres qui l'utilisent
 * trié du plus utilisé au moins utilisé (technos sans offre exclues).
 */
export function getTechnoCloud(
  offres: Content.OffreDocument[],
  technos: Content.TechnoDocument[],
): { techno: Content.TechnoDocument; count: number }[] {
  const count = new Map<string, number>();
  for (const offre of offres) {
    for (const { techno } of offre.data.technos) {
      if (isFilled.contentRelationship(techno)) {
        count.set(techno.id, (count.get(techno.id) ?? 0) + 1);
      }
    }
  }

  return technos
    .map((techno) => ({ techno, count: count.get(techno.id) ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);
}
