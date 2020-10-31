import Router from 'next/router';
import React, { Component } from 'react';
import { GetServerSidePropsContext } from 'next';

// https://github.com/vercel/next.js/discussions/11281

export type Redirect = {
  href: string,
  asPath: string,
  permanent: boolean
};

export const browserRedirect = (redirect: Redirect) => {
  return class Redirect extends Component {
    componenttDidMount() {
      const { href, asPath } = redirect;
      Router.push(href, asPath);
    }

    render() {
      return <p>Redirecting...</p>
    }
  };
};

export const serverRedirect = (ctx: GetServerSidePropsContext, redirect: Redirect) => {
  const req = ctx.req;
  const res = ctx.res;
  if (!req || !res) {
    return { props: {} };
  }

  const { referer } = req.headers;
  const { asPath, permanent } = redirect;

  if (!referer) {
    res.writeHead(permanent ? 301 : 307, { Location: asPath });
    res.end()
  }

  return { props: {} };
};
