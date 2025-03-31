import EmailProvider from "@auth/core/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";

import { prisma } from "@/lib/prisma";

const isProduction = process.env.NODE_ENV === "production";
const EMAIL_SIGNUP_ALLOWED_SUFFIXES =
  process.env.EMAIL_SIGNUP_ALLOWED_SUFFIXES?.split(",") ?? [];

const nextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  /* This is an important design choice, especially for NextJS.
   * strategy "database" means:
   *   - 1) JWT contains the session ID
   *   - 2) We use that to look up the session in DB
   *   - 3) callbacks.session lets us filter what goes from the DB to the client
   *   - Pro: other services can read / write to the session without client RQs.
   *   - Pro: control, audits, analytics. You can track logged in devices, etc.
   *   - Pro: session invalidation can be done instantly (significant security +)
   *   - Con: DB query latency for requests (1-3 ms on top of 20ms+ client RTT)
   *   - Con: horizontal scaling is tricky in distributed systems, esp at scale
   * strategy "jwt" means:
   *   - 1) server receives encrypted JWT
   *   - 2) server verifies and decrypts the JWT
   *   - 3) callbacks.session lets us filter what goes from the JWT to the client
   *   - Pro: easy and pleasant to integrate with other services.
   *   - Pro: JWT signatures can be verified at edge.
   *   - Pro: very horizontally scalable.
   *   - Pro: extremely fast.
   *   - Con: Hard limit on session object size.
   *   - Con: session invalidation is not instant.
   *   - Con: only services with the auth secret can write to session.
   *   - Con: token rotation must be handled (less work than a DB, especially at scale)
   *   - Con: you *can* get hit with replay attacks if you don't rotate often enough.
   * TLDR unless you explicitly need some of the DB session strategy features, use JWT.
   */
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      name: "Email",
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  trustHost: true,
  cookies: {
    sessionToken: {
      name: isProduction
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: isProduction,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        domain: isProduction ? process.env.SECURE_COOKIE_DOMAIN : undefined,
      },
    },
  },
  // This is non-standard configuration. Feel free to remove it for your use case.
  callbacks: EMAIL_SIGNUP_ALLOWED_SUFFIXES
    ? {
        async signIn({ user, account }) {
          if (account?.provider === "nodemailer") {
            if (
              user.email &&
              EMAIL_SIGNUP_ALLOWED_SUFFIXES.some((suffix) =>
                user.email!.toLowerCase().endsWith(suffix.toLowerCase())
              )
            ) {
              return true;
            } else {
              // Always allow existing users to sign in.
              const dbUser = await prisma.user.findUnique({
                where: {
                  email: user.email!,
                },
              });
              return !!dbUser;
            }
          }

          return true;
        },
      }
    : {},
} satisfies NextAuthConfig;

/**
 * Exports authentication utilities from NextAuth.js.
 *
 * @remarks
 * This is the main authentication export that provides access to NextAuth.js functionality.
 *
 * @exports
 * @property {object} handlers - API route handlers for NextAuth.js authentication
 * @property {Function} auth - Authentication function to protect routes
 * @property {Function} signIn - Function to programmatically sign users in
 * @property {Function} signOut - Function to programmatically sign users out
 *
 * @see {@link https://next-auth.js.org/} for more information on NextAuth.js
 */
export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);
