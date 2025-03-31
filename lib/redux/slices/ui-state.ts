import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState, UIState } from "@types";

const initialState: UIState = {} as UIState;

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UIState["theme"]>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<UIState["language"]>) => {
      state.language = action.payload;
    },
  },
});

// Export actions
export const { setTheme, setLocale } = uiStateSlice.actions;

// Export selectors
export const getTheme = (state: RootState) => state.uiState.theme;
export const getLocale = (state: RootState) => state.uiState.language;

// Export reducer
export default uiStateSlice.reducer;
