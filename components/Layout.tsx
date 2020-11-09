import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = '42API' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style jsx global>{`
      // globals
    `}</style>
    <div className="max-w-3xl mx-auto pb-4">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;
