import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import {
  initializeStore,
  type AppDispatch,
  type RootState,
} from "@/lib/redux/store";
import { useMemo } from "react";

export const useStore = (initialState: RootState) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
