"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

const themeOptions = {
  attribute: "class",
  enableSystem: true,
  defaultTheme: "system",
  disableTransitionOnChange: true,
} as const;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...themeOptions} {...props}>
      {children}
    </NextThemesProvider>
  );
}
