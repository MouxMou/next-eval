import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import OffreCard from "@/composants/ui/OffreCard";
import Pagination from "@/composants/ui/Pagination";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";
import { PAGE_SIZE } from "@/libs/pagination";

type Params = Promise<{ uid: string }>;
type Search = Promise<{ page?: string }>;

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

export default async function TechnoPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { uid } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const client = createClient();

  const techno = await client.getByUID("techno", uid).catch(() => null);
  if (!techno) notFound();

  const [response, technos] = await Promise.all([    
    client.getByType("offre", {
      filters: [filter.at("my.offre.technos.techno", techno.id)],
      orderings: [{ field: "my.offre.date", direction: "desc" }],
      pageSize: PAGE_SIZE,
      page: currentPage,
    }),
    client.getAllByType("techno"),
  ]);

  const related = response.results;
  const technoIndex = buildTechnoIndex(technos);

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
          {response.total_results_size} offre
          {response.total_results_size > 1 ? "s" : ""}
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

      <Pagination
        basePath={`/technos/${uid}`}
        currentPage={currentPage}
        totalPages={response.total_pages}
      />
    </main>
  );
}
