"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  getTranslation,
  loadTranslations,
  selectIsLoading,
  selectTranslations,
} from "@slices/localization";
import { getLocale, setLocale } from "@slices/ui-state";
import type { LocaleCode } from "@types";
import { useDispatch, useSelector } from "./redux";

export function useLocalization(namespace?: string) {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const isLoading = useSelector(selectIsLoading);

  // Get locale directly from the UI state slice
  const locale = useSelector(getLocale);

  const translationsRef = useRef(translations);
  useEffect(() => {
    translationsRef.current = translations;
  }, [translations]);

  const initialLoadRef = useRef(false);
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;

      // Load translations if not already loaded for current locale
      if (!translations[locale]) {
        dispatch(loadTranslations(locale));
      }
    }
  }, [dispatch, locale, translations]);

  // Also load translations when locale changes
  useEffect(() => {
    if (initialLoadRef.current && !translations[locale]) {
      dispatch(loadTranslations(locale));
    }
  }, [dispatch, locale, translations]);

  const changeLocale = useCallback(
    async (newLocale: LocaleCode) => {
      // Don't do anything if it's the same locale
      if (newLocale === locale) return;

      // Load translations if needed
      if (!translationsRef.current[newLocale]) {
        await dispatch(loadTranslations(newLocale)).unwrap();
        dispatch(setLocale(newLocale));
      } else {
        // If we already have translations, we can manually set them
        dispatch(setLocale(newLocale));
      }

      // Update UI state locale directly
    },
    [dispatch, locale]
  );

  const tx = useCallback(
    (key: string, defaultValue?: string): string => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      return getTranslation(translations, locale, fullKey, defaultValue);
    },
    [translations, locale, namespace]
  );

  return {
    tx,
    locale,
    setLocale: changeLocale,
    isLoading,
  };
}
