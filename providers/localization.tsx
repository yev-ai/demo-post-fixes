"use client";

import {
  LocaleCode,
  LocaleDetails,
  LocaleType,
  LocaleValue,
  LocalizationContext as LocalizationContextType,
} from "@types";
import { createContext, ReactNode, useEffect, useState } from "react";

const localeMetadata: Record<LocaleCode, LocaleType["language"]> = {
  en: { englishName: "English", nativeName: "English" },
  es: { englishName: "Spanish", nativeName: "Español" },
};

const availableLocales = Object.freeze(
  Object.entries(localeMetadata).map(([code, config]) => ({
    languageCode: code as LocaleCode,
    ...config,
  }))
) as readonly LocaleDetails[];

export const LocalizationContext =
  createContext<LocalizationContextType | null>(null);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("en");
  const [translations, setTranslations] = useState<Record<string, LocaleType>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load the default locale on initial mount
  useEffect(() => {
    loadLocale("en");
  }, []);

  /**
   * Dynamically loads a locale file
   */
  const loadLocale = async (localeCode: LocaleCode) => {
    if (translations[localeCode]) {
      return; // Already loaded
    }

    try {
      // Dynamic import of the locale file
      const localeModule = await import(
        `@/lib/localization/locales/${localeCode}`
      );

      setTranslations((prev) => ({
        ...prev,
        [localeCode]: localeModule[localeCode],
      }));
    } catch (error) {
      console.error(`Failed to load locale: ${localeCode}`, error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sets the active locale and ensures it's loaded
   */
  const setLocale = async (newLocale: LocaleCode) => {
    if (newLocale === locale && translations[newLocale]) {
      return; // Already using this locale and it's loaded
    }

    // Start loading if not already loaded
    if (!translations[newLocale]) {
      setIsLoading(true);
      await loadLocale(newLocale);
    }

    setLocaleState(newLocale);

    // TODO - Optionally save preference
    // localStorage.setItem("preferredLocale", newLocale);
  };

  /**
   * Retrieves a localized string based on a dot-notation key.
   * Traverses the localization object using the dot-separated path.
   *
   * @param key - A dot-separated string representing the path to the localized value
   * @returns The localized string if found, or the original key if the path doesn't exist or doesn't resolve to a string
   *
   * @example
   * // If locales[locale] = { "common": { "submit": "Submit" } }
   * tx("common.submit") // Returns "Submit"
   * tx("common.cancel") // Returns "common.cancel" if the key doesn't exist
   */
  const tx = (key: string, loadingDefault?: string): string => {
    if (!translations[locale]) return loadingDefault ?? key;

    const keys = key.split(".");
    let value: LocaleValue = translations[locale];

    for (const k of keys) {
      if (value === undefined) return key;
      value = typeof value === "object" ? value[k] : key;
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LocalizationContext.Provider
      value={{ tx, locale, setLocale, availableLocales, isLoading }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
