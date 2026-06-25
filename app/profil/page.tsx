import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import EnregistreesList from "./_components/EnregistreesList";
import CandidaturesList from "./_components/CandidaturesList";

export const metadata: Metadata = {
  title: "Mon profil — DEV",
};

export default async function ProfilPage() {
  const client = createClient();
  const [offres, technos] = await Promise.all([
    client.getAllByType("offre", {
      orderings: [{ field: "my.offre.date", direction: "desc" }],
    }),
    client.getAllByType("techno"),
  ]);

  return (
    <main className="px-6 md:px-12 py-12 flex flex-col gap-12">
      <h1 className="border-b border-navy/20 pb-4">Bienvenue</h1>

      <section className="flex flex-col gap-6">
        <h2>Offres enregistrées</h2>
        <EnregistreesList offres={offres} technos={technos} />
      </section>

      <section className="flex flex-col gap-6">
        <h2>Historique des candidatures</h2>
        <CandidaturesList offres={offres} technos={technos} />
      </section>
    </main>
  );
}
