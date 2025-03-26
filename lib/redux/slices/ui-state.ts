import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { LocaleCode, RootState, UiPreferencesState } from "@types";

const initialState: UiPreferencesState = {
  theme: "system",
  language: "en",
};

export const uiPreferencesSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LocaleCode>) => {
      state.language = action.payload;
    },
  },
});

// Export actions
export const { setTheme, setLanguage } = uiPreferencesSlice.actions;

// Export selectors
export const selectTheme = (state: RootState) => state.uiState.theme;
export const selectLanguage = (state: RootState) => state.uiState.language;

// Export reducer
export default uiPreferencesSlice.reducer;
