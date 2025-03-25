import { LocaleType } from "@types";
import { ISO_639_1_CODES } from "./languages";
/**
 * Enhances a partial language config with metadata derived from the language key
 *
 * @param key - ISO 639-1 language code (e.g., 'en', 'es')
 * @param config - Base configuration missing englishName and nativeName
 * @returns Complete language configuration with added metadata
 */
export const createLocale = (
  key: keyof typeof ISO_639_1_CODES,
  config: Omit<LocaleType, "language">
): LocaleType => {
  return {
    ...config,
    language: {
      ...ISO_639_1_CODES[key],
    },
  };
};
