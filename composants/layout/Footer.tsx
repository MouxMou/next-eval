import Link from "next/link";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="px-6 md py-8 flex flex-col gap-4">
        <Logo color="light" />
        <Link href="/mentions" className="text-sm hover:underline">
          Mentions légales
        </Link>
        <p className="text-sm text-white/60">
          © 2026 DEV — Offres d&apos;emploi
        </p>
      </div>
    </footer>
  );
}
