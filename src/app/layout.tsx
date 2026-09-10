import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { resumeData } from '@/lib/resume-data';

import { ThemeProvider } from "@/components/theme-provider";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export const metadata: Metadata = {
  title: `${resumeData.name}`,
  description: `Personal Portfolio of ${resumeData.name}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* The handwritten heading parses this file at runtime, so the download is
            started with the document rather than after hydration. */}
        <link rel="preload" href="/fonts/handwriting.ttf" as="fetch" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LiquidEffectAnimation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
