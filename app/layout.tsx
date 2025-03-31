import { auth } from "@/lib/auth";
import { getInitialState } from "@/lib/redux/initialState";
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
  const session = await auth();
  const initialState = await getInitialState();

  return (
    <html
      lang={initialState.uiState.language}
      className={initialState.uiState.theme}
      style={{
        colorScheme: initialState.uiState.theme,
      }}
    >
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
