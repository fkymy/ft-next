import '@styles/global.css';
import { Provider } from 'next-auth/client';
import { SWRConfig } from 'swr';
import fetch from 'lib/fetchJson';
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0
      }}
      session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}

export default App;
