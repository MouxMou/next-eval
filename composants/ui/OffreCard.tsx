import Link from "next/link";
import { asText, Content } from "@prismicio/client";

type OffreCardProps = {
  offre: Content.OffreDocument;
  technos: Content.TechnoDocument[];
};

export default function OffreCard({ offre, technos }: OffreCardProps) {
  const firstText = offre.data.slices.find((s) => s.slice_type === "text_slice");
  const excerpt = firstText ? asText(firstText.primary.text) : "";
  const date = offre.data.date
    ? new Date(offre.data.date).toLocaleDateString("fr-FR")
    : null;

  return (
    <article className="bg-white border border-line rounded-lg p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3>
          <Link href={`/offres/${offre.uid}`} className="hover:text-blue">
            {offre.data.title}
          </Link>
        </h3>
        <span className="material-symbols-outlined text-navy">bookmark</span>
      </div>

      {date && (
        <p className="flex items-center gap-2 text-sm text-blue">
          <span className="material-symbols-outlined text-blue">
            calendar_month
          </span>
          {date}
        </p>
      )}

      {technos.length > 0 && (
        <p className="flex items-center gap-2 text-sm text-blue">
          <span className="material-symbols-outlined text-blue">code</span>
          {technos.map((t) => t.data.name).join(", ")}
        </p>
      )}

      {excerpt && <p className="text-sm text-ink/80 line-clamp-3">{excerpt}</p>}
    </article>
  );
}
