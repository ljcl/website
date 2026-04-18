import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import "./global.css";

import { type Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Pirata_One,
  Space_Grotesk,
} from "next/font/google";
import { Bio } from "#components/Bio/Bio";
import { Masthead } from "#components/Masthead/Masthead";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const blackletter = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-blackletter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lukeclark.com.au"),
  title: {
    default: "Luke Clark",
    template: "%s - Luke Clark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${blackletter.variable}`}
    >
      <body>
        <Masthead />
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
