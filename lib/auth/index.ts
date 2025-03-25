import { prisma } from "@/lib/prisma";
import EmailProvider from "@auth/core/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";

const isProduction = process.env.NODE_ENV === "production";
const EMAIL_SIGNUP_ALLOWED_SUFFIXES =
  process.env.EMAIL_SIGNUP_ALLOWED_SUFFIXES?.split(",") ?? [];

const nextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
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
