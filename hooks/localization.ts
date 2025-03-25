"use client";

import { LocalizationContext } from "@providers";
import { use } from "react";

/**
 * Custom hook that provides localization functionality with optional namespace support.
 *
 * This hook allows components to access localization functions and can automatically
 * prefix translation keys with a namespace to organize translations hierarchically.
 *
 * @param namespace - Optional string prefix to be applied to all translation keys
 * @returns The localization context object, with the `tx` function modified to apply the namespace if provided
 * @throws {Error} If the hook is used outside of a LocalizationProvider
 *
 * @example
 * // Basic usage
 * const { tx } = useLocalization();
 * const message = tx('common.welcome');
 *
 * @example
 * // With namespace
 * const { tx } = useLocalization('profile');
 * const title = tx('title'); // Will look up 'profile.title'
 */
export function useLocalization(namespace?: string) {
  const context = use(LocalizationContext);

  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }

  if (!namespace) return context;

  const namespacedLocalization = (
    key: string,
    loadingDefault?: string
  ): string => {
    const fullKey = `${namespace}.${key}`;
    return context.tx(fullKey, loadingDefault);
  };

  return {
    ...context,
    tx: namespacedLocalization,
  };
}
