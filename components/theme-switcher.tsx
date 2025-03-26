"use client";

import { useUiState } from "@hooks";
import { Button } from "@ui-base/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useUiState();
  const [mounted, setMounted] = useState(false);

  // Critical for SSR hydration matching
  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonStyles = "w-10 h-10 flex items-center justify-center";
  const iconStyles = "h-[1.2rem] w-[1.2rem]";

  // During SSR and initial client render, return a placeholder
  // This prevents hydration mismatch
  if (!mounted) {
    return (
      <div className={className}>
        <Button className={buttonStyles} aria-label="Toggle theme">
          <svg className={iconStyles} viewBox="0 0 24 24" />
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <Button
        className={buttonStyles}
        onClick={() => setTheme(theme.isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme.isDark ? (
          <Moon className={iconStyles} />
        ) : (
          <Sun className={iconStyles} />
        )}
      </Button>
    </div>
  );
}
