"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@ui-base/button";

export function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme("system");
    }
  };

  const showSystemIcon = theme === "system";
  const showLightIcon = !showSystemIcon && resolvedTheme === "light";
  const showDarkIcon = !showSystemIcon && resolvedTheme === "dark";

  const icon = "h-[1.2rem] w-[1.2rem]";

  return (
    <div className={className}>
      <Button size="lg" onClick={toggleTheme}>
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
