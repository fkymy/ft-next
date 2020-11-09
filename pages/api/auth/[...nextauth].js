import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Profile from 'interfaces/User';
import ftProvider from 'lib/ftProvider';
import { ftTokenRefresh, ftTokenIsExpired, calcExpiresAt, calcExpiresIn } from 'lib/ftToken';

const options = {
  providers: [
    ftProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/database
  //
  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)  
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true, 
    
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens 
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw', 
    
    // Set to true to use encryption (default: false)
    // encryption: true,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/api/auth/signin',  // Displays signin buttons
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  callbacks: { 
    signIn: async (user, account, profile) => {
      console.log('SIGNIN CALLBACK...');
      const isAllowedToSignIn = profile ? true : false;
      console.log(isAllowedToSignIn ? 'isAllowedToSignIn' : 'isNOTAllowedToSignIn');
      user.displayName = profile.displayname;
      return Promise.resolve(true)
    },

    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl);
    },

    session: async (session, user, sessionToken) => {
      console.log('SESSION CALLBACK...');
      console.log('USER: ', user);

      if (user && user.displayName) {
        session.user.displayName = user.displayName;
      }
      // If you need token on client-side, do this.
      if (user && user.accessToken && user.refreshToken) {
        session.accessToken = user.accessToken;
        // session.refreshToken = user.refreshToken;
        // session.expiresAt = user.expiresAt;
      }
      return Promise.resolve(session);
    },

    jwt: async (token, user, account, profile, isNewUser) => {
      console.log('JWT CALLBACK...');
      console.log('USER: ', user);

      // First sign in
      if (user && user.displayName) {
        token.displayName = user.displayName;
      }

      if (account && account.refreshToken && account.accessToken) {
        // let now = Date.now();
        // let expiresAt = now + 10 * 1000;
        token.refreshToken = account.refreshToken;
        token.accessToken = account.accessToken;
        token.expiresAt = calcExpiresAt();
        console.log('JWT INITIALIZE ON SIGN IN');
        console.log(`now: ${Date.now()}, expiresAt: ${token.expiresAt}, expiresAt - now: ${(token.expiresAt - Date.now()) / 1000}`);
        return Promise.resolve(token);
      }

      // Not sure if this is the best approach
      // https://github.com/nextauthjs/next-auth/issues/371
      if (ftTokenIsExpired(token.expiresAt)) {
        console.log('ACCESS TOKEN IS EXPIRED');
        
        const newToken = await ftTokenRefresh(
          token.accessToken,
          token.refreshToken,
          calcExpiresIn(token.expiresAt),
        );
        token.refreshToken = newToken.token.refresh_token;
        token.accessToken = newToken.token.access_token;
        token.expiresAt = calcExpiresAt(); // not really
        return Promise.resolve(token);
      }
      console.log('ACCESS TOKEN IS NOT EXPIRED');
      return Promise.resolve(token)
    }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: { },

  // Enable debug messages in the console if you are having problems
  debug: false,
}

export default (req, res) => NextAuth(req, res, options)
