import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anush Kulal M | Portfolio",
  description:
    "MCA Student at Jain University — UI/UX Designer, Frontend Developer & Team Leader. Explore my work in design, development, and quality assurance.",
  keywords: ["UI/UX Designer", "Frontend Developer", "React", "Figma", "Portfolio", "Anush Kulal"],
  authors: [{ name: "Anush Kulal M" }],
  openGraph: {
    title: "Anush Kulal M | Portfolio",
    description: "UI/UX Designer & Frontend Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
