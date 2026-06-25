import Link from "next/link";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import OffreCard from "@/composants/ui/OffreCard";
import TagCloud from "@/composants/ui/TagCloud";
import {
  buildTechnoIndex,
  getOffreTechnos,
  getTechnoCloud,
} from "@/libs/technos";

export default async function HomePage() {
  const client = createClient();
  const [home, offres, technos] = await Promise.all([
    client.getSingle("home"),
    client.getAllByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
    }),
    client.getAllByType("techno"),
  ]);

  const technoIndex = buildTechnoIndex(technos);
  const cloud = getTechnoCloud(offres, technos);
  const latest = offres.slice(0, 6);

  return (
    <main>
      {isFilled.image(home.data.hero_image) && (
        <div className="relative w-full h-64 md:h-80">
          <PrismicNextImage
            field={home.data.hero_image}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <section className="px-6 md:px-12 py-12">
        <h1 className="border-b border-navy/20 pb-4">
          Nos dernières opportunités
        </h1>

        {cloud.length > 0 && (
          <section className="pt-8">
            <h2 className="mb-4">Explorez par technologie</h2>
            <TagCloud technos={cloud} />
          </section>
        )}

        <div className="grid md:grid-cols-3 gap-6 pt-10">
          {latest.map((offre) => (
            <OffreCard
              key={offre.id}
              offre={offre}
              technos={getOffreTechnos(offre, technoIndex)}
            />
          ))}
        </div>

        <div className="flex justify-center pt-10">
          <Link
            href="/offres"
            className="bg-blue text-white font-semibold rounded-md px-5 py-3"
          >
            Voir toutes les offres
          </Link>
        </div>
      </section>
    </main>
  );
}
