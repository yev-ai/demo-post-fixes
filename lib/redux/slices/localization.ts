import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  LocaleCode,
  LocaleDetails,
  LocaleType,
  LocaleValue,
} from "@types";
import type { RootState } from "../store";

import { en } from "@/lib/localization/locales/en";

export const AVAILABLE_LOCALES: LocaleDetails[] = [
  { languageCode: "en", englishName: "English", nativeName: "English" },
  { languageCode: "es", englishName: "English", nativeName: "Español" },
];

interface LocalizationState {
  locale: LocaleCode;
  translations: Partial<Record<LocaleCode, LocaleType>>;
  isLoading: boolean;
}

const initialState: LocalizationState = {
  locale: "en",
  translations: { en },
  isLoading: false,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleCode>) => {
      state.locale = action.payload;
    },
    setTranslations: (
      state,
      action: PayloadAction<{
        locale: LocaleCode;
        translations: LocaleType;
      }>
    ) => {
      state.translations[action.payload.locale] = action.payload.translations;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLocale, setTranslations, setLoading } =
  localizationSlice.actions;

export const loadTranslations = createAsyncThunk(
  "localization/loadTranslations",
  async (locale: LocaleCode, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const localeData = await import(`@/lib/localization/locales/${locale}`);

      const localeObject = localeData[locale];

      dispatch(setTranslations({ locale, translations: localeObject }));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const selectLocale = (state: RootState) => state.localization.locale;
export const selectTranslations = (state: RootState) =>
  state.localization.translations;
export const selectIsLoading = (state: RootState) =>
  state.localization.isLoading;

function getNestedProperty(
  obj: LocaleValue,
  path: string[]
): string | undefined {
  if (path.length === 0) {
    return typeof obj === "string" ? obj : undefined;
  }

  if (!obj || typeof obj !== "object") {
    return undefined;
  }

  const [current, ...rest] = path;

  return getNestedProperty(obj[current], rest);
}

export const getTranslation = (
  translations: Partial<Record<LocaleCode, LocaleType>>,
  locale: LocaleCode,
  key: string,
  defaultValue?: string
): string => {
  if (!translations[locale]) return defaultValue || key;

  const keys = key.split(".");
  const result = getNestedProperty(translations[locale], keys);

  return result || defaultValue || key;
};

export default localizationSlice.reducer;
