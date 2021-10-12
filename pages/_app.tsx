import type { NextComponentType } from 'next';
import '../styles/global.css';

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}

export default App;
