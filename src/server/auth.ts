import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ account, profile, user, ...props }) {
      console.log({ account, profile, user });

      return true;
      // Do different verification for other providers that don't have `email_verified`
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendars.readonly",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

// Email HTML body
function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
    <table
        style="
          width: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
            sans-serif;
        "
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tr>
          <td align="center" style="background-color: #f1f5f9">
          <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="
            background: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 16px;
            color: #444444;
          "
        >
          <tr>
            <td>
              <div style="padding: 20px 20px 0">
                <p style="font-size: 24px; margin: 0">Welcome to venturepipes,</p>
                <p style="margin: 20px 0 0">
                  Please confirm your email <strong>${escapedEmail}</strong>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="padding: 24px 20px">
                <a
                  href="${url}"
                  target="_blank"
                  style="
                    font-size: 16px;
                    font-family: Helvetica, Arial, sans-serif;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    background-color: #346df1;
                    border: 1px solid #346df1;
                    border-radius: 4px;
                    display: inline-block;
                    font-weight: bold;
                  "
                  >Confirm my email</a
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="padding: 0 20px 20px">
               
              </div>
            </td>
          </tr>
        </table>
          </td>
        </tr>
    </table>
`;
}
