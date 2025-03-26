import {
  decrement as decrementAction,
  increment as incrementAction,
} from "@slices/counter";
import { useAppDispatch, useAppSelector } from "./redux";

export function useCounterSlice() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const increment = () => dispatch(incrementAction());
  const decrement = () => dispatch(decrementAction());

  return { count, increment, decrement };
}
