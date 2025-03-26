import type { LocaleDetails } from "@types";
import { validLocaleCodes } from "@types";

import { en, es } from "./languages";

const localeData = {
  en,
  es,
};

validLocaleCodes.forEach((code) => {
  if (!(code in localeData)) {
    throw new Error(
      `Missing import for language: ${code}. Update your imports to include this language.`
    );
  }
});

export const AVAILABLE_LOCALES: LocaleDetails[] = validLocaleCodes.map(
  (code) => ({
    languageCode: code,
    englishName: localeData[code].englishName,
    nativeName: localeData[code].nativeName,
  })
);
