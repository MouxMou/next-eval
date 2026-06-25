import { createClient } from "@/prismicio";
import OffreCard from "@/composants/ui/OffreCard";
import TagCloud from "@/composants/ui/TagCloud";
import Pagination from "@/composants/ui/Pagination";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";
import { PAGE_SIZE } from "@/libs/pagination";

type OffresPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OffresPage({ searchParams }: OffresPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const client = createClient();
  const [single, response, technos] = await Promise.all([
    client.getSingle("offres"),    
    client.getByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
      pageSize: PAGE_SIZE,
      page: currentPage,
    }),
    client.getAllByType("techno"),
  ]);

  const offres = response.results;
  const technoIndex = buildTechnoIndex(technos);  
  const filtres = technos.map((techno) => ({ techno, count: 0 }));

  return (
    <main className="px-6 md:px-12 py-12">
      <header className="flex items-end justify-between border-b border-navy/20 pb-4">
        <h1>{single.data.title || "Offres d'emploi"}</h1>
        <p className="flex items-center gap-2 text-blue font-semibold whitespace-nowrap">
          <span className="material-symbols-outlined text-blue">work</span>
          {response.total_results_size} offre
          {response.total_results_size > 1 ? "s" : ""}
        </p>
      </header>

      {filtres.length > 0 && (
        <div className="pt-6">
          <TagCloud technos={filtres} />
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

      <Pagination
        basePath="/offres"
        currentPage={currentPage}
        totalPages={response.total_pages}
      />
    </main>
  );
}
