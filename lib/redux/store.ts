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
import storage from "redux-persist/lib/storage";

import localization from "@slices/localization";
import uiState from "@slices/ui-state";

// Define the root reducer type explicitly
type RootReducer = {
  localization: typeof localization;
  uiState: typeof uiState;
};

// Create a client-side only version of the persist config
const uiStatePersistConfig = {
  key: "uiState",
  storage,
  // Skip persisting during SSR
  skipHydration: true,
};

export const makeStore = (preloadedState = {}) => {
  const isServer = typeof window === "undefined";

  // Create different reducers for server and client
  let reducers: RootReducer;

  if (isServer) {
    // On server, use regular reducers
    reducers = {
      localization,
      uiState,
    };
  } else {
    // On client, use persisted uiState
    reducers = {
      localization,
      uiState: persistReducer(uiStatePersistConfig, uiState) as typeof uiState,
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

export type AppStore = ReturnType<typeof makeStore>["store"];
export type AppPersistor = Persistor;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// For client-side store initialization
let storeInstance: { store: AppStore; persistor: AppPersistor | null } | null =
  null;

export const initializeStore = (preloadedState?: Partial<RootState>) => {
  // Always create a new store on the server
  if (typeof window === "undefined") {
    return makeStore(preloadedState).store;
  }

  // Create the store if not available on the client
  if (!storeInstance) {
    storeInstance = makeStore(preloadedState);
  }

  // If preloadedState is provided, merge with existing state
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
