"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo } from "react";

import { AVAILABLE_LOCALES } from "@/lib/localization";
import { useDispatch, useSelector } from "@hooks";
import {
  getLocale as getReduxLocale,
  getTheme as getReduxTheme,
  setLocale as setReduxLocale,
  setTheme as setReduxTheme,
} from "@slices/ui-state";
import { type LocaleCode, type UIState, isUITheme } from "@types";

export function useUiState() {
  const dispatch = useDispatch();
  const reduxTheme = useSelector(getReduxTheme);
  const reduxLocale = useSelector(getReduxLocale);
  const { theme, setTheme: setPackageTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (reduxTheme && reduxTheme !== theme) {
      setPackageTheme(reduxTheme);
    }
  }, []); // Initial mount

  useEffect(() => {
    if (isUITheme(theme) && theme !== reduxTheme) {
      dispatch(setReduxTheme(theme));
    }
  }, [theme, reduxTheme, dispatch]);

  const setLocale = useCallback(
    (newLocale: LocaleCode) => {
      dispatch(setReduxLocale(newLocale));
    },
    [dispatch]
  );

  const setTheme = useCallback(
    (newTheme: UIState["theme"]) => {
      if (isUITheme(newTheme)) {
        // Update redux and next-themes to sync them.
        dispatch(setReduxTheme(newTheme));
        setPackageTheme(newTheme);
      }
    },
    [dispatch, setPackageTheme]
  );

  // Everything below this is critical for maintaining stable references.
  // For example: we can't destructure - that creates new refs, etc.
  // Create an enhanced theme object that includes both theme and resolvedTheme
  const enhancedTheme = useMemo(() => {
    // Use Redux theme as the source of truth for preference
    const preference = reduxTheme || theme;

    // For current theme, prioritize Redux for immediate availability
    const current = reduxTheme;

    return {
      preference,
      current,
    };
  }, [reduxTheme, theme, resolvedTheme]);

  // Everything below this is critical for maintaining stable references.
  const localeState = useMemo(
    () => ({
      locale: reduxLocale,
      setLocale,
    }),
    [reduxLocale, setLocale]
  );

  const themeState = useMemo(
    () => ({
      theme: enhancedTheme,
      setTheme,
    }),
    [enhancedTheme, setTheme]
  );

  const output = useMemo(
    () => ({
      locale: localeState.locale,
      setLocale: localeState.setLocale,
      availableLocales: AVAILABLE_LOCALES,
      theme: themeState.theme,
      setTheme: themeState.setTheme,
    }),
    [localeState, themeState]
  );

  return output;
}
