import { NextResponse } from "next/server";
import { createClient } from "@/prismicio";
import { buildTechnoIndex, getOffreTechnos } from "@/libs/technos";

export async function GET() {
  const client = createClient();

  const [offres, technos] = await Promise.all([
    client.getAllByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
    }),
    client.getAllByType("techno"),
  ]);

  const technoIndex = buildTechnoIndex(technos);

  const data = offres.slice(0, 3).map((offre) => ({
    uid: offre.uid,
    title: offre.data.title,
    date: offre.data.date,
    url: `/offres/${offre.uid}`,
    technos: getOffreTechnos(offre, technoIndex).map((t) => t.data.name),
  }));

  return NextResponse.json(data);
}
