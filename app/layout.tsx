import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { ReduxProvider, ThemeProvider } from "@providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS 15 Demo",
  description: "React 19 with Tailwind 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>NextJS 15 Demo</title>
      </head>
      <body>
        <ThemeProvider>
          <ReduxProvider>
            <SessionProvider
              refetchOnWindowFocus={false}
              refetchWhenOffline={false}
            >
              {children}
            </SessionProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
