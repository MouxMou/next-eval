import Link from "next/link";

type LogoProps = {
  color?: "light" | "dark";
};

export default function Logo({ color = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Accueil DEV"
      className={` ${
        color === "light" ? "text-white" : "text-navy"
      }`}
    >
      <span className="material-symbols-outlined">desktop_windows</span>
      <span>DEV</span>
    </Link>
  );
}
