 import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";
import {
  isBlocked,
  recordFailedAttempt,
  resetAttempts,
  getRemainingMinutes,
} from "@/lib/loginAttempts";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        // ── IP nikalo ──────────────────────────────────────────
        const headersList = await headers();
        const ip =
          headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
          headersList.get("x-real-ip") ??
          "unknown";

        // ── IP blocked hai? ────────────────────────────────────
        if (isBlocked(ip)) {
          const mins = getRemainingMinutes(ip);
          throw new Error(`IP_BLOCKED:${mins}`);
        }

        // ── Credentials check ──────────────────────────────────
        const isEmailCorrect    = credentials?.email    === process.env.ADMIN_EMAIL;
        const isPasswordCorrect = credentials?.password === process.env.ADMIN_PASSWORD;

        if (isEmailCorrect && isPasswordCorrect) {
          resetAttempts(ip); // ✅ Sahi — attempts reset
          return {
            id:    "1",
            email: process.env.ADMIN_EMAIL,
            name:  "Admin",
          };
        }

        // ❌ Galat — attempt record karo
        const count = recordFailedAttempt(ip);
        const remaining = 5 - count;

        if (remaining <= 0) {
          throw new Error("IP_BLOCKED:15");
        }

        throw new Error(`INVALID_CREDENTIALS:${remaining}`);
      },
    }),
  ],
  pages:   { signIn: "/zm-secure-entry" },
  secret:  process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };