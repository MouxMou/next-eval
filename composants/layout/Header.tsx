import Link from "next/link";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="bg-navy border-b-4 border-blue-soft">
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <Logo color="light" />
        <Link href="/profil" aria-label="Mon profil" className="flex text-white">
          <span className="material-symbols-outlined text-white">account_circle</span>
        </Link>
      </div>
    </header>
  );
}
