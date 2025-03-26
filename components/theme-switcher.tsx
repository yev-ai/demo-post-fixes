"use client";

import { useUiState } from "@hooks";
import { Button } from "@ui-base/button";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ className }: { className?: string }) {
  useUiState();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [icons, setIcons] = useState<{
    MonitorIcon: LucideIcon | null;
    SunIcon: LucideIcon | null;
    MoonIcon: LucideIcon | null;
  }>({
    MonitorIcon: null,
    SunIcon: null,
    MoonIcon: null,
  });

  useEffect(() => {
    async function loadIcons() {
      const { MonitorIcon, SunIcon, MoonIcon } = await import("lucide-react");
      setIcons({ MonitorIcon, SunIcon, MoonIcon });
    }

    loadIcons();
    setMounted(true);
  }, []);

  const buttonStyles = "w-10 h-10 flex items-center justify-center";
  const iconStyles = "h-[1.2rem] w-[1.2rem]";

  const IconPlaceholder = () => (
    <svg className={iconStyles} viewBox="0 0 24 24" />
  );

  const getIcon = () => {
    if (!mounted || (!icons.MonitorIcon && !icons.SunIcon && !icons.MoonIcon)) {
      return <IconPlaceholder />;
    }

    if (theme === "system" && icons.MonitorIcon) {
      return <icons.MonitorIcon className={iconStyles} />;
    } else if (resolvedTheme === "light" && icons.SunIcon) {
      return <icons.SunIcon className={iconStyles} />;
    } else if (icons.MoonIcon) {
      return <icons.MoonIcon className={iconStyles} />;
    }

    return <IconPlaceholder />;
  };

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <div className={className}>
      <Button
        className={buttonStyles}
        onClick={mounted ? toggleTheme : undefined}
        aria-label="Toggle theme"
      >
        {getIcon()}
      </Button>
    </div>
  );
}
