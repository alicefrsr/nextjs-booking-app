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
};

export const { auth, handlers } = NextAuth(authConfig);
