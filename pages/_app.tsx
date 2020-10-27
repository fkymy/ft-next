import '@styles/global.css';
import Head from 'next/head';

import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Head>
        <title>42Tokyo-peers</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default App;
