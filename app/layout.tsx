import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextSJ 15 Demo",
  description: "React 19 with Tailwind 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={
          "antialiased min-h-full font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Oxygen,Ubuntu,Cantarell,Open_Sans,Helvetica_Neue,sans-serif] text-zinc-900 dark:text-zinc-100"
        }
      >
        {children}
      </body>
    </html>
  );
}
