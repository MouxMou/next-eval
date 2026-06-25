import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";

type Params = Promise<{ uid: string }>;

export async function generateStaticParams() {
  const client = createClient();
  const offres = await client.getAllByType("offre");
  return offres.map((offre) => ({ uid: offre.uid }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const offre = await client.getByUID("offre", uid).catch(() => null);
  if (!offre) return {};

  return {
    title: offre.data.meta_title || offre.data.title || "Offre",
    description: offre.data.meta_description || undefined,
    openGraph: isFilled.image(offre.data.meta_image)
      ? { images: [{ url: offre.data.meta_image.url }] }
      : undefined,
  };
}

export default async function OffrePage({ params }: { params: Params }) {
  const { uid } = await params;
  const client = createClient();

  const offre = await client.getByUID("offre", uid).catch(() => null);
  if (!offre) notFound();

  const technos = await client.getAllByType("techno");
  const offreTechnos = getOffreTechnos(offre, buildTechnoIndex(technos));

  const date = offre.data.date
    ? new Date(offre.data.date).toLocaleDateString("fr-FR")
    : null;

  return (
    <main className="px-6 md:px-12 py-10 flex flex-col gap-8">
      <Link
        href="/offres"
        className="self-start bg-blue text-white font-semibold rounded-md px-4 py-2 text-sm"
      >
        &lt; Voir toutes les offres
      </Link>

      <header className="flex flex-col gap-4">
        <h1 className="border-b-4 border-blue pb-3">{offre.data.title}</h1>

        {date && (
          <p className="flex items-center gap-2 text-sm text-blue">
            <span className="material-symbols-outlined text-blue">
              calendar_month
            </span>
            {date}
          </p>
        )}

        {offreTechnos.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {offreTechnos.map((techno) => (
              <li key={techno.id}>
                <Link
                  href={`/technos/${techno.uid}`}
                  className="inline-block border border-blue text-blue rounded-md px-3 py-1 text-sm hover:bg-blue hover:text-white"
                >
                  {techno.data.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      <SliceZone slices={offre.data.slices} components={components} />
    </main>
  );
}
