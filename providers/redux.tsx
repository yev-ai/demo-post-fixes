"use client";

import { type RootState } from "@/lib/redux/store";
import { useStore } from "@hooks";
import { Provider } from "react-redux";

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
