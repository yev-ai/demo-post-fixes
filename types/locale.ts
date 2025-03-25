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
