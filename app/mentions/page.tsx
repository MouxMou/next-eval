import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("mentions").catch(() => null);
  return {
    title: page?.data.meta_title || "Mentions légales — DEV",
    description: page?.data.meta_description || undefined,
  };
}

export default async function MentionsPage() {
  const client = createClient();
  const page = await client.getSingle("mentions");

  return (
    <main className="px-6 md:px-12 py-12 flex flex-col gap-8">
      <h1 className="border-b-4 border-blue pb-3">Mentions Légales</h1>
      <div className="flex flex-col gap-10 max-w-4xl">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </main>
  );
}
