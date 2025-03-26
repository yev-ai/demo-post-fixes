"use server";

import { auth } from "@/lib/auth";
import { AuthButton } from "@ui/auth-button";
import { LanguageSelector } from "@ui/language-selector";
import { MainApp } from "@ui/main-app";
import { ThemeSwitcher } from "@ui/theme-switcher";

export default async function Index() {
  const session = await auth();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-8">
      <div className="flex flex-row gap-2 items-center">
        <LanguageSelector />
        <ThemeSwitcher />
        <AuthButton email={session?.user?.email ?? undefined} />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <MainApp email={session?.user?.email ?? undefined} />
      </div>
    </main>
  );
}
