import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Finals Random Loadout Generator | Best Weapon Builds",
  description: "Get the best random loadouts for The Finals. Generate unique weapon builds, gadgets, and specializations for Light, Medium, and Heavy classes.",
  keywords: ["The Finals", "Loadout Generator", "Randomizer", "Builds", "Light", "Medium", "Heavy"],
  authors: [{ name: "Fahad" }],
  openGraph: {
    title: "The Finals Loadout Generator",
    description: "Generate random, fun, and competitive loadouts for The Finals.",
    url: "https://random-loadout.vercel.app",
    siteName: "The Finals Loadout Generator",
    images: [
      {
        url: "/web.p.png",
        width: 1200,
        height: 630,
        alt: "The Finals Random Loadout Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Finals Random Loadout Generator",
    description: "Generate random and competitive loadouts for The Finals.",
    images: ["/web.p.png"],
  },
  verification: {
    google: "CMBQUI4cSseRlxmvt6U9jezsaA9Pvvorub6mij-6QaA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground tracking-wide font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
