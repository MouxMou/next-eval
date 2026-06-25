import { createClient } from "@/prismicio";
import OffreCard from "@/composants/ui/OffreCard";
import TagCloud from "@/composants/ui/TagCloud";
import {
  buildTechnoIndex,
  getOffreTechnos,
  getTechnoCloud,
} from "@/libs/technos";

export default async function OffresPage() {
  const client = createClient();
  const [page, offres, technos] = await Promise.all([
    client.getSingle("offres"),
    client.getAllByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
    }),
    client.getAllByType("techno"),
  ]);

  const technoIndex = buildTechnoIndex(technos);
  const cloud = getTechnoCloud(offres, technos);

  return (
    <main className="px-6 md:px-12 py-12">
      <header className="flex items-end justify-between border-b border-navy/20 pb-4">
        <h1>{page.data.title || "Offres d'emploi"}</h1>
        <p className="flex items-center gap-2 text-blue font-semibold whitespace-nowrap">
          <span className="material-symbols-outlined text-blue">work</span>
          {offres.length} offre{offres.length > 1 ? "s" : ""}
        </p>
      </header>

      {cloud.length > 0 && (
        <div className="pt-6">
          <TagCloud technos={cloud} />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 pt-10">
        {offres.map((offre) => (
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
