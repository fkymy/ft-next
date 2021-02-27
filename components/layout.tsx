import React, { ReactNode } from 'react';	
import Head from 'next/head';	
import Header from './header';	
import Footer from './footer';	

type Props = {	
  children?: ReactNode;	
  title?: string;	
};	

const Layout = ({ children, title = 'ft-next' }: Props) => (	
  <div className="max-w-3xl mx-auto px-10 pb-4">	
    <Head>	
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />	
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />	
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />	
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />	
      <link rel="manifest" href="/manifest.json" />	
      <meta charSet="utf-8" />	
      <meta name="msapplication-TileColor" content="#ffffff" />	
      <meta name="msapplication-config" content="/browserconfig.xml" />	
      <meta name="theme-color" content="#ffffff" />	
      <meta property="og:url" content="" />	
      <meta property="og:type" content="website" />	
      <meta property="og:title" content="ft-next" />	
      <meta property="og:description" content="" />	
      <meta property="og:image" content='https://og-image.vercel.app/**ft**-next.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg' />	
      <meta name="description" content="" />	
    </Head>	
    <style jsx global>{`	
    `}</style>	
    <Header />	
    <main>	
      {children}	
    </main>	
    <Footer />	
  </div>	
);	

export default Layout;