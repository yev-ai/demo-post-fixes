import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { LocaleCode, LocaleData, LocaleValue } from "@types";
import type { RootState } from "../store";

interface LocalizationState {
  translations: Record<LocaleCode, LocaleData>;
  isLoading: boolean;
}

const initialState: LocalizationState = {
  translations: {} as Record<LocaleCode, LocaleData>,
  isLoading: false,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLocale: (
      state,
      action: PayloadAction<{
        locale: LocaleCode;
        translations: LocaleData;
      }>
    ) => {
      state.translations![action.payload.locale] = action.payload.translations;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLocale, setLoading } = localizationSlice.actions;

export const loadTranslations = createAsyncThunk(
  "localization/loadTranslations",
  async (locale: LocaleCode, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const localeData = await import(`@/lib/localization/locales/${locale}`);

      const localeObject = localeData[locale] as LocaleData;

      dispatch(setLocale({ locale, translations: localeObject }));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }
);

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
  translations: Partial<Record<LocaleCode, LocaleData>>,
  locale: LocaleCode,
  key: string,
  defaultValue?: string
): string => {
  if (!translations[locale]) return defaultValue || key;

  const keys = key.split(".");
  const result = getNestedProperty(translations[locale], keys);

  return result || defaultValue || key;
};

export const localizationApi = createApi({
  reducerPath: "localizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    fetchTranslations: builder.query<LocaleData, LocaleCode>({
      query: (locale) => `localization/${locale}`,
    }),
  }),
});

export const { useFetchTranslationsQuery } = localizationApi;

export default localizationSlice.reducer;
