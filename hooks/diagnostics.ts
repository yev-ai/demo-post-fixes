"use client";

import { useEffect, useRef } from "react";

export function useRenderCounter(componentName = "Component") {
  const renders = useRef(0);
  renders.current++;
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`🌀 [${componentName}] initial render.`);
    }
  }, []);
  if (process.env.NODE_ENV !== "production") {
    console.log(`🔄 [${componentName}] render count:`, renders.current);
  }
}
