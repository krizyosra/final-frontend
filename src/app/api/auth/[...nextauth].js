import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Clé obtenue via Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Clé secrète obtenue via Google
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Chemin vers la page de connexion (facultatif)
  },
  session: {
    strategy: "jwt", // Utilisation des tokens JWT
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
