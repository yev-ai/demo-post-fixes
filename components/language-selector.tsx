"use client";

import { useLocalization } from "@hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@ui-base/select";

export function LanguageSelector({ className }: { className?: string }) {
  const { availableLocales, locale, setLocale } = useLocalization("general");

  const currentLocaleLabel =
    availableLocales.find((x) => x.languageCode === locale)?.nativeName ||
    locale;

  const localeItems = availableLocales.map((language) => (
    <SelectItem key={language.languageCode} value={language.languageCode}>
      {language.nativeName}
    </SelectItem>
  ));

  return (
    <div className={className}>
      <Select value={locale} onValueChange={setLocale}>
        <SelectTrigger>{currentLocaleLabel}</SelectTrigger>
        <SelectContent>{localeItems}</SelectContent>
      </Select>
    </div>
  );
}
