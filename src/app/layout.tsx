import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import Link from "next/link";
import { Aperture, Images, Upload } from "lucide-react";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luma Gallery",
  description: "Photo workflow used in the GitHub Copilot Advanced hands-on.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <header className="site-header">
          <Link className="brand" href="/">
            <Aperture aria-hidden="true" size={27} strokeWidth={1.8} />
            <span>Luma Gallery</span>
          </Link>
          <nav aria-label="Navegacao principal" className="site-nav">
            <Link href="/">
              <Images aria-hidden="true" size={18} />
              Galeria
            </Link>
            <Link href="/upload">
              <Upload aria-hidden="true" size={18} />
              Upload
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
