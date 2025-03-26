"use client";

import { Provider } from "react-redux";

import { useStore } from "@hooks";
import { RootState } from "@types";

export const ReduxProvider = function ReduxProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<RootState>;
}) {
  const store = useStore(initialState as RootState);

  return <Provider store={store}>{children}</Provider>;
};
