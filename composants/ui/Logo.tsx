import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  color?: "light" | "dark";
  width?: number;
};

export default function Logo({ color = "dark", width = 80 }: LogoProps) {
  return (
    <Link href="/" aria-label="Accueil DEV" className="inline-flex">
      <Image
        src={color === "dark" ? "/logo.png" : "/logo-light.png"}
        alt="DEV"
        width={80}
        height={35}
        priority
        style={{ width, height: "auto" }}
      />
    </Link>
  );
}
