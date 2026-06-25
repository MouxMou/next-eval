import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import OffreCard from "@/composants/ui/OffreCard";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";

type Params = Promise<{ uid: string }>;

// Une page statique par techno.
export async function generateStaticParams() {
  const client = createClient();
  const technos = await client.getAllByType("techno");
  return technos.map((techno) => ({ uid: techno.uid }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const techno = await client.getByUID("techno", uid).catch(() => null);
  if (!techno) return {};

  return {
    title: techno.data.meta_title || `Offres ${techno.data.name}`,
    description: techno.data.meta_description || undefined,
  };
}

export default async function TechnoPage({ params }: { params: Params }) {
  const { uid } = await params;
  const client = createClient();

  const techno = await client.getByUID("techno", uid).catch(() => null);
  if (!techno) notFound();

  const [offres, technos] = await Promise.all([
    client.getAllByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
    }),
    client.getAllByType("techno"),
  ]);
  const technoIndex = buildTechnoIndex(technos);

  // Offres reliées à cette techno.
  const related = offres.filter((offre) =>
    offre.data.technos.some(
      ({ techno: rel }) =>
        isFilled.contentRelationship(rel) && rel.id === techno.id,
    ),
  );

  return (
    <main className="px-6 md:px-12 py-12 flex flex-col gap-8">
      <Link
        href="/offres"
        className="self-start bg-blue text-white font-semibold rounded-md px-4 py-2 text-sm"
      >
        &lt; Voir toutes les offres
      </Link>

      <header className="flex items-end justify-between border-b border-navy/20 pb-4">
        <h1>{techno.data.name}</h1>
        <p className="flex items-center gap-2 text-blue font-semibold whitespace-nowrap">
          <span className="material-symbols-outlined text-blue">work</span>
          {related.length} offre{related.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {related.map((offre) => (
          <OffreCard
            key={offre.id}
            offre={offre}
            technos={getOffreTechnos(offre, technoIndex)}
          />
        ))}
      </div>
    </main>
  );
}
