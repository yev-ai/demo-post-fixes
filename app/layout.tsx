import { auth } from "@/lib/auth";
import { en } from "@/lib/localization/locales/en";
import { RootState } from "@types";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { ReduxProvider, ThemeProvider } from "@providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS 15 Demo",
  description: "React 19 with Tailwind 4",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const themeFromCookie =
  //   (await cookies()).get("user-theme")?.value || "system";

  const session = await auth();

  // We have to either set defaults or pull from cookie/auth here.
  const initialState = {
    uiState: {
      theme: "light",
      language: "en" as const,
    },
    localization: {
      translations: {
        en,
      },
      isLoading: false,
    },
  } as RootState;

  return (
    <html
      lang={initialState.uiState.language}
      className={initialState.uiState.theme}
      style={{
        // @ts-expect-error theme override.
        "color-scheme": initialState.uiState.theme,
      }}
    >
      <head>
        <title>NextJS 15 Demo</title>
      </head>
      <body>
        <SessionProvider session={session}>
          <ReduxProvider initialState={initialState}>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
