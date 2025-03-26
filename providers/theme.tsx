"use client";

import { useSelector } from "@hooks";
import { getTheme as getReduxTheme } from "@slices/ui-state";
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
  // Get the initial theme from Redux
  const reduxTheme = useSelector(getReduxTheme);

  // Create merged options with Redux theme as the initial value
  const mergedOptions = {
    ...themeOptions,
    // Only override the default if Redux has a value
    ...(reduxTheme ? { defaultTheme: reduxTheme } : {}),
  };

  return (
    <NextThemesProvider {...mergedOptions} {...props}>
      {children}
    </NextThemesProvider>
  );
}
