import { SiteHeader } from "@/components/site-header";
import { seoMetadata } from "@/config/seo-metadata";
import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = seoMetadata;

export const viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en_US"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} scroll-smooth`}
    >
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
