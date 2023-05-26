import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import './global.css';
import { Metadata } from 'next';
import { Bio } from './components/Bio/Bio';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lukeclark.com.au'),
};

const GA_STRING = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-CXQM4J1Z9M');
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: GA_STRING,
          }}
        ></script>
      </head>
      <body className="bg-white text-base">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CXQM4J1Z9M"
        />
        <main>{children}</main>
        <section className="mx-auto container px-4">
          <Bio />
        </section>
        <Analytics />
      </body>
    </html>
  );
}
