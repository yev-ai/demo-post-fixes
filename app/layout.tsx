import type { Metadata } from "next";

import { AuthProvider } from "@providers";

import { LocalizationProvider, ThemeProvider } from "@providers";

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
            <AuthProvider>{children}</AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
