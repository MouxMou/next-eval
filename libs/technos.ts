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
