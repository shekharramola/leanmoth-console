import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { GlobalFooter } from "@/components/GlobalFooter";
import { GlobalHeader } from "@/components/GlobalHeader";
import { UserSessionProvider } from "@/context/UserSessionContext";

// Optimize Google Fonts with immediate hot swapping
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sys-interface",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-sys-technical",
  subsets: ["latin"],
  display: "swap",
});

const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  variable: "--font-material-symbols",
  display: "block",
});

export const metadata: Metadata = {
  title: "LeanMoth — 100% Client-Side AWS Cost Auditor",
  description:
    "Identify architectural cloud waste entirely in your browser. Zero data collection, completely open source, and pricing strictly capped at $50.",
  icons: {
    icon: "/brand/logo.webp",
    shortcut: "/brand/logo.webp",
    apple: "/brand/logo.webp",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${materialSymbols.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-surface-container-lowest text-on-surface">
        <UserSessionProvider>
          <GlobalHeader />
          {children}
          <GlobalFooter />
        </UserSessionProvider>
      </body>
    </html>
  );
}
