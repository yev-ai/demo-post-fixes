"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useLocalization } from "@hooks";
import { useTransition } from "react";

export function LanguageSelector({ className }: { className?: string }) {
  const { availableLocales, tx, locale, setLocale } =
    useLocalization("general");
  const [isPending, startTransition] = useTransition();

  const onSelect = (value: typeof locale) => {
    startTransition(() => {
      setLocale(value);
    });
  };

  const currentLocaleLabel = availableLocales.filter(
    (x) => x.languageCode === locale
  )[0].nativeName;

  return (
    <div className={className}>
      <Select value={locale} onValueChange={onSelect} disabled={isPending}>
        <SelectTrigger>
          {isPending ? tx("languageSwitchPending") : currentLocaleLabel}
        </SelectTrigger>
        <SelectContent>
          {availableLocales.map((language) => (
            <SelectItem
              key={language.languageCode}
              value={language.languageCode}
            >
              {language.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
