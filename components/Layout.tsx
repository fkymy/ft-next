import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = '42API' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>{`
      // globals   
    `}</style>
    <Header />
    <main>
      <div className="">{children}</div>
    </main>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
