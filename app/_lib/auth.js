import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // CredentialProvider(-->read.the.docs).
    // Github etc
  ],
  callbacks: {
    authorized({ auth, req }) {
      return !!auth?.user; // return true or false
    },
  },
  pages: {
    signIn: '/login',
  },
};

// signIn and signOut for the auth flow to happen server side (server actions)
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
