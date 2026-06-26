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
    "MCA graduate and Business QA Engineer (Intern) at Skypoint Cloud — Business Analyst, QA Engineer, UI/UX Designer & Frontend Developer. Explore my work across analysis, design, development, and quality assurance.",
  keywords: ["Business Analyst", "QA Engineer", "UI/UX Designer", "Frontend Developer", "React", "Figma", "Portfolio", "Anush Kulal"],
  authors: [{ name: "Anush Kulal M" }],
  openGraph: {
    title: "Anush Kulal M | Portfolio",
    description: "Business QA Engineer · Business Analyst · UI/UX Designer · Frontend Developer",
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
