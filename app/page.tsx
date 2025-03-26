import { AuthButton } from "@ui/auth-button";
import { LanguageSelector } from "@ui/language-selector";
import { ThemeSwitcher } from "@ui/theme-switcher";

export default function Index() {
  return (
    <main className="flex min-h-screen gap-2 items-center justify-center">
      <LanguageSelector />
      <ThemeSwitcher />
      <AuthButton />
    </main>
  );
}
