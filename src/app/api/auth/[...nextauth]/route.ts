import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/utils/env";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    jwt: ({ token, user, account }) => {
      if (account) token.accessToken = account.access_token;
      console.log("id_token", account?.id_token);
      console.log("user: ", user);
      console.log("token: ", token);
      return token;
    },
    session: ({ session }) => {
      console.log("session: ", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
