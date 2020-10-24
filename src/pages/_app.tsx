import '@/src/styles/global.css'
import Head from 'next/head'

import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Head>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default App
