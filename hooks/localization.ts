"use client";

import { useCallback, useEffect, useRef } from "react";

import { useUiState } from "@hooks";
import {
  AVAILABLE_LOCALES,
  getTranslation,
  loadTranslations,
  selectIsLoading,
  selectLocale,
  selectTranslations,
  setLocale as setLocaleAction,
} from "@slices/localization";
import type { LocaleCode } from "@types";
import { useAppDispatch, useAppSelector } from "./redux";

export function useLocalization(namespace?: string) {
  const dispatch = useAppDispatch();
  const locale = useAppSelector(selectLocale);
  const translations = useAppSelector(selectTranslations);
  const isLoading = useAppSelector(selectIsLoading);

  // Get persisted language preference
  const { language: persistedLanguage, setLanguage: updatePersistedLanguage } =
    useUiState();

  const translationsRef = useRef(translations);
  useEffect(() => {
    translationsRef.current = translations;
  }, [translations]);

  const initialLoadRef = useRef(false);
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;

      if (persistedLanguage && persistedLanguage !== locale) {
        dispatch(setLocaleAction(persistedLanguage));
      }

      if (!translations[locale]) {
        dispatch(loadTranslations(locale));
      }
    }
  }, []);

  const setLocale = useCallback(
    async (newLocale: LocaleCode) => {
      if (!translationsRef.current[newLocale]) {
        await dispatch(loadTranslations(newLocale)).unwrap();
      }

      dispatch(setLocaleAction(newLocale));

      // Update persisted language preference
      updatePersistedLanguage(newLocale);
    },
    [dispatch, updatePersistedLanguage]
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
    setLocale,
    availableLocales: AVAILABLE_LOCALES,
    isLoading,
  };
}
