import { Inter } from '@next/font/google';
import clsx from 'clsx';
import Script from 'next/script';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

const title = 'Luke Clark';
const description = 'Sydney based Software Engineer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title key="title">Luke Clark</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
      </head>
      <body className="bg-white text-base">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-17879409-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-17879409-1');
        `}
        </Script>
        <main
          className={clsx('mx-auto', 'container', 'px-4')}
          style={{ maxWidth: '65ch' }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
