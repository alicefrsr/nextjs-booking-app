import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, req }) {
      return !!auth?.user; // return true or false
    },
    // create a new guest when there isn't an existing email for that user
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch (error) {
        console.log('aaargh');
        return false;
      }
    },
  },
  pages: {
    signIn: '/login',
  },
};

// signIn and signOut for the auth flow to happen server side (server actions)
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
