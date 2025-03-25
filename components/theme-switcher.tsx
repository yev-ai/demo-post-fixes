"use client";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
/**
 * Theme switcher component that cycles between system, light, and dark themes
 * with proper hydration handling to prevent mismatches
 *
 * @param props - Component properties
 * @param props.className - Optional CSS classes to apply to container element
 * @returns Theme toggle button with proper hydration behavior
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  // Track component mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Handle mounting state after hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return placeholder with same dimensions during SSR to prevent layout shift
  if (!mounted) {
    return (
      <div className={className}>
        <Button size="lg" aria-hidden={true}>
          <div />
        </Button>
      </div>
    );
  }

  const toggleTheme = () => {
    if (theme === "system") {
      // If current theme is system, switch to the opposite of what system is
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      // If current theme is light or dark, switch to system
      setTheme("system");
    }
  };

  // Determine which icon to show based on current theme setting and resolved theme
  const showSystemIcon = theme === "system";
  const showLightIcon = !showSystemIcon && resolvedTheme === "light";
  const showDarkIcon = !showSystemIcon && resolvedTheme === "dark";

  const icon = "h-[1.2rem] w-[1.2rem]";

  return (
    <div className={className}>
      <Button
        size="lg"
        onClick={toggleTheme}
        aria-label={`Switch to ${
          theme === "system"
            ? resolvedTheme === "dark"
              ? "light"
              : "dark"
            : "system"
        } theme`}
      >
        {showSystemIcon ? (
          <MonitorIcon className={icon} />
        ) : showLightIcon ? (
          <SunIcon className={icon} />
        ) : showDarkIcon ? (
          <MoonIcon className={icon} />
        ) : null}
      </Button>
    </div>
  );
}
