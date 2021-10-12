import clsx from 'clsx';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-white text-base">
          <div className={clsx('container mx-auto')} style={{ width: '65ch' }}>
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
