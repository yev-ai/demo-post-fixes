import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  type Persistor,
} from "redux-persist";
import { createCookieStorage } from "./storage/cookie";

import localization from "@slices/localization";
import uiState from "@slices/ui-state";

type RootReducer = {
  localization: typeof localization;
  uiState: typeof uiState;
};

export const makeStore = (preloadedState = {}) => {
  const isServer = typeof window === "undefined";

  let reducers: RootReducer;

  if (isServer) {
    reducers = {
      localization,
      uiState,
    };
  } else {
    const uiStatePersistConfig = {
      key: "uiState",
      storage: createCookieStorage,
      serialize: false,
      whitelist: ["theme", "language"],
    };
    reducers = {
      localization,
      uiState: persistReducer(
        uiStatePersistConfig,
        uiState
      ) as unknown as typeof uiState,
    };
  }

  // Create the store
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });

  // Only create persistor on the client
  const persistor = isServer ? null : persistStore(store);

  return { store, persistor };
};

type AppStore = ReturnType<typeof makeStore>["store"];
type AppPersistor = Persistor;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

let storeInstance: { store: AppStore; persistor: AppPersistor | null } | null =
  null;

export const initializeStore = (preloadedState?: Partial<RootState>) => {
  // Always create a new store on the server
  if (typeof window === "undefined") {
    return makeStore(preloadedState).store;
  }

  if (!storeInstance) {
    storeInstance = makeStore(preloadedState);
  }

  if (preloadedState) {
    const newStore = makeStore({
      ...storeInstance.store.getState(),
      ...preloadedState,
    });
    storeInstance = newStore;
  }

  return storeInstance.store;
};

// Export persistor getter with proper typing
export const getPersistor = (): AppPersistor | null => {
  if (typeof window === "undefined") return null;
  return storeInstance?.persistor || null;
};
