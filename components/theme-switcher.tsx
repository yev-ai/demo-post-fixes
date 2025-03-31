"use client";

import { useUiState } from "@hooks";
import { Button } from "@ui-base/button";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useUiState();

  const buttonStyles = "w-10 h-10 flex items-center justify-center";
  const iconStyles = "h-[1.2rem] w-[1.2rem]";

  return (
    <div className={className}>
      <Button
        className={buttonStyles}
        onClick={() => setTheme(theme.current === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme.current === "dark" ? (
          <Moon className={iconStyles} />
        ) : (
          <Sun className={iconStyles} />
        )}
      </Button>
    </div>
  );
}
