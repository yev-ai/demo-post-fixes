"use client";

import { useCounterSlice } from "@hooks";

export default function CounterClient() {
  const counter = useCounterSlice();
  return (
    <div>
      <h1>Counter: {counter.count}</h1>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
    </div>
  );
}
