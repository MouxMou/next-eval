import Link from "next/link";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

const linkClass =
  "bg-blue text-white font-semibold rounded-md px-4 py-2 text-sm";
const disabledClass =
  "rounded-md border border-line px-4 py-2 text-sm text-muted";

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-4 pt-10">
      {currentPage > 1 ? (
        <Link href={`${basePath}?page=${currentPage - 1}`} className={linkClass}>
          Précédent
        </Link>
      ) : (
        <span className={disabledClass}>Précédent</span>
      )}

      <span className="text-sm font-semibold text-navy">
        Page {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={`${basePath}?page=${currentPage + 1}`} className={linkClass}>
          Suivant
        </Link>
      ) : (
        <span className={disabledClass}>Suivant</span>
      )}
    </nav>
  );
}
