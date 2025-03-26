import { configureStore } from "@reduxjs/toolkit";

import localization from "@slices/localization";

export const makeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      localization,
    },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// For client-side store initialization (to avoid hydration errors)
let store: AppStore;

export const initializeStore = (preloadedState?: RootState) => {
  let _store = store ?? makeStore(preloadedState);

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined as unknown as AppStore;
  }

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};
