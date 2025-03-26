"use client";

import { useLocalization, useUiState } from "@hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@ui-base/select";
import { useEffect, useState } from "react";

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale } = useLocalization("general");
  const { availableLocales } = useUiState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on the server or during hydration
  if (!isMounted) {
    return (
      <div className={className}>
        {/* Skeleton dropdown trigger */}
        <div
          style={{
            backgroundColor: "#000000",
            borderRadius: "4px",
            height: "2.3rem",
            width: "5.2rem",
            display: "flex",
            alignItems: "center",
            padding: "0 6px",
          }}
        >
          English
        </div>
      </div>
    ); // Empty placeholder with same className
  }

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
