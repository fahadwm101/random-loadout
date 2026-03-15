import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Finals Loadout Generator",
  description: "Random loadout generator for The Finals (Cyberpunk aesthetic)",
  icons: {
    icon: "/web.p.png",
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
        className={`${montserrat.variable} antialiased bg-background text-foreground tracking-wide font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
