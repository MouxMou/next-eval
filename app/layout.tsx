import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/composants/layout/Header";
import Footer from "@/composants/layout/Footer";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DEV — Offres d'emploi",
  description:
    "Trouvez, enregistrez et suivez les dernières offres d'emploi en développement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL"
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
