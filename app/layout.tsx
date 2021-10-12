import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./global.css";
import type { Metadata } from "next";
import { Bio } from "#components/Bio/Bio";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lukeclark.com.au"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="text-base">
        <main>{children}</main>
        <section className="layout-container">
          <Bio />
        </section>
        <GoogleAnalytics gaId="G-CXQM4J1Z9M" />
        <Analytics />
      </body>
    </html>
  );
}
