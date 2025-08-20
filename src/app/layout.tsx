import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSN Asia – Full Stack Developer Assessment",
  description: "Assessment project for Talent Strategist Network (TSN Asia), built with Next.js, Express, PostgreSQL, and Sequelize.",
  authors: [{ name: "Christo Natanael Pontoh", url: "https://github.com/ChristoNP" }],
  keywords: [
    "Next.js",
    "Express.js",
    "PostgreSQL",
    "Sequelize",
    "Full Stack Developer",
    "TSN Asia",
    "Assessment"
  ],
  applicationName: "TSN Assessment App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
