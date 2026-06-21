import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anush Kulal M — Software Developer & UI/UX Designer",
  description:
    "Portfolio of Anush Kulal M — Software Developer, QA Engineer, and UI/UX Designer skilled in React, Node.js, Java, Python, and modern web technologies.",
  keywords: [
    "Anush Kulal",
    "Software Developer",
    "QA Engineer",
    "UI/UX Designer",
    "React",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Anush Kulal M" }],
  openGraph: {
    title: "Anush Kulal M — Software Developer & UI/UX Designer",
    description:
      "Portfolio of Anush Kulal M — Software Developer, QA Engineer, and UI/UX Designer.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
      style={{ scrollBehavior: "auto" }}
    >
      <body className="antialiased" style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
