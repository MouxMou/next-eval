import Link from "next/link";
import { Content } from "@prismicio/client";

type TagCloudProps = {
  technos: { techno: Content.TechnoDocument; count: number }[];
};

export default function TagCloud({ technos }: TagCloudProps) {
  if (technos.length === 0) return null;

  const max = Math.max(...technos.map((t) => t.count));

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {technos.map(({ techno, count }) => {
        // Taille relative au nombre d'offres (effet "nuage").
        const scale = 0.9 + (count / max) * 0.9;
        return (
          <li key={techno.id}>
            <Link
              href={`/technos/${techno.uid}`}
              style={{ fontSize: `${scale}rem` }}
              className="inline-block rounded-md border border-blue px-3 py-1 leading-none text-blue hover:bg-blue hover:text-white"
            >
              {techno.data.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
