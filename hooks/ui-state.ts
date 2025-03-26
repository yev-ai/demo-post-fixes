"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

import {
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
} from "@slices/ui-state";
import type { LocaleCode, UiPreferencesState } from "@types";
import { useAppDispatch, useAppSelector } from "./redux";

export function useUiState() {
  const dispatch = useAppDispatch();
  const persistedTheme = useAppSelector(selectTheme);
  const persistedLanguage = useAppSelector(selectLanguage);
  const { theme, setTheme: setNextTheme } = useTheme();

  const isValidTheme = (
    theme: string | undefined
  ): theme is UiPreferencesState["theme"] => {
    return !!theme && ["light", "dark", "system"].includes(theme);
  };

  // On first mount, initialize next-themes from Redux if available
  useEffect(() => {
    // Only set theme from persisted state on initial mount
    if (persistedTheme && persistedTheme !== theme) {
      setNextTheme(persistedTheme);
    }
  }, []); // Empty dependency array for initial mount only

  // When theme changes in next-themes, update Redux
  useEffect(() => {
    // Only update Redux if the theme is defined and different
    if (isValidTheme(theme) && theme !== persistedTheme) {
      dispatch(setTheme(theme));
    }
  }, [theme, persistedTheme, dispatch]);

  // Function to update language in Redux
  const updateLanguage = (newLanguage: LocaleCode) => {
    dispatch(setLanguage(newLanguage));
  };

  return {
    // Return the persisted language and update function
    language: persistedLanguage,
    setLanguage: updateLanguage,
  };
}
