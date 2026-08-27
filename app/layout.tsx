import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
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

/* 
  SENIOR ARCHITECT REMEDY 1: Native Variable Font Mapping
  By loading the font through Next.js localFont framework with adjustFontFallback,
  Next.js applies metric overrides directly. 
  "display: 'swap'" is guaranteed to bind seamlessly without render-blocking stalls.
*/
const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  variable: "--font-material-symbols",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "ZeroEgress - Optimization Engine",
  description: "AWS Data-Transfer Cost Auditor",
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
        </UserSessionProvider>
      </body>
    </html>
  );
}
