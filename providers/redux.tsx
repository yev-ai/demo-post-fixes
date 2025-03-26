"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { getPersistor } from "@/lib/redux/store";
import { useStore } from "@hooks";
import type { RootState } from "@types";

export const ReduxProvider = function ReduxProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<RootState>;
}) {
  const store = useStore(initialState as RootState);
  const persistor = getPersistor();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !persistor) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
