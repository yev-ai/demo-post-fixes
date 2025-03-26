import { AuthButton } from "@/components/auth-button";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeSwitcher } from "@/components/theme-switcher";

import CounterClient from "@/components/CounterClient";

export default async function Index() {
  return (
    <main className="flex min-h-screen gap-2 items-center justify-center">
      <LanguageSelector />
      <ThemeSwitcher />
      <AuthButton />
      <CounterClient />
    </main>
  );
}
