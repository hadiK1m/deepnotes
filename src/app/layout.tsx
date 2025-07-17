import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Hadi Nurhakim | Portofolio Developer",
  description: "Portofolio personal Hadi Nurhakim, seorang Creative Frontend Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${onest.variable} font-sans main-gradient-bg`}>
        {children}
      </body>
    </html>
  );
}