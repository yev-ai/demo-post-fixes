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

/**
 * Application theme provider with proper type compatibility
 *
 * @param props - Component props matching next-themes provider interface
 * @param props.children - React node children that will receive theme context
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...themeOptions} {...props}>
      {children}
    </NextThemesProvider>
  );
}
