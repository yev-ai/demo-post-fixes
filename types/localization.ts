import type { LocaleCode } from "./ui-state";

/**
 * Type definition for application-wide localization strings.
 * This type structure organizes all translatable text content used throughout the application.
 */
// This will never change at runtime so we don't need typeguards.
export type LocaleData = {
  general: {
    languageSwitchPending: string;
  };
  translationNames: {
    englishName: string;
    nativeName: string;
  };
  authButton: {
    login: string;
    logout: string;
  };
  mainApp: {
    welcome: string;
    pleaseLogin: string;
  };
};

export type LocaleValue = string | { [key: string]: LocaleValue };

export type LocaleDetails = {
  languageCode: LocaleCode;
} & LocaleData["translationNames"];

export type LocalizationContext = {
  /** Translates a key to the current locale's value */
  tx: (key: string, loadingDefault?: string) => string;
  /** Current active locale code */
  locale: LocaleCode;
  availableLocales: readonly LocaleDetails[];
  /** Function to change the active locale */
  setLocale: (locale: LocaleCode) => void;
  isLoading: boolean;
};
