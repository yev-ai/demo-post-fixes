/**
 * Type definition for application-wide localization strings.
 * This type structure organizes all translatable text content used throughout the application.
 */
export type LocaleType = {
  general: {
    languageSwitchPending: string;
  };
  language: {
    englishName: string;
    nativeName: string;
  };
  auth: {
    login: string;
    logout: string;
    loading: string;
  };
};

export type LocaleValue = string | { [key: string]: LocaleValue };

export type LocaleDetails = {
  languageCode: LocaleCode;
} & LocaleType["language"];

export type LocaleCode = "en" | "es";

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
