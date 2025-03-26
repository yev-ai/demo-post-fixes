import type { Metadata } from "next";

import {
  AuthProvider,
  LocalizationProvider,
  ReduxProvider,
  ThemeProvider,
} from "@providers";

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
  return (
    <html suppressHydrationWarning>
      <head>
        <title>NextJS 15 Demo</title>
      </head>
      <body>
        <ThemeProvider>
          <LocalizationProvider>
            <ReduxProvider>
              <AuthProvider>{children}</AuthProvider>
            </ReduxProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
