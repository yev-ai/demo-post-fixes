import { useMemo } from "react";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { initializeStore } from "@/lib/redux/store";
import { AppDispatch, RootState } from "@types";

export const useStore = (initialState: RootState) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
