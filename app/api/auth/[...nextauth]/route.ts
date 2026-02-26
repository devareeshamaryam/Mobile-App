 import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        // .env se email aur password check karo
        const isEmailCorrect = credentials?.email === process.env.ADMIN_EMAIL;
        const isPasswordCorrect = credentials?.password === process.env.ADMIN_PASSWORD;

        if (isEmailCorrect && isPasswordCorrect) {
          // ✅ Sahi - login allow karo
          return { 
            id: "1", 
            email: process.env.ADMIN_EMAIL,
            name: "Admin"
          };
        }

        // ❌ Galat email ya password
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
 