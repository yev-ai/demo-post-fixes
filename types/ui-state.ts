export const validThemes = ["light", "dark", "system"] as const;
export const validLocaleCodes = ["en", "es"] as const;

export type LocaleCode = (typeof validLocaleCodes)[number];
export type UITheme = (typeof validThemes)[number];

export interface UIState {
  theme: UITheme;
  language: LocaleCode;
}

// Type guards
export const isUITheme = (value: unknown): value is UITheme => {
  return typeof value === "string" && validThemes.includes(value as UITheme);
};

export const isLocale = (value: unknown): value is LocaleCode => {
  return (
    typeof value === "string" && validLocaleCodes.includes(value as LocaleCode)
  );
};

export const isUIState = (state: unknown): state is UIState => {
  if (typeof state !== "object" || state === null) return false;
  const s = state as Record<string, unknown>;
  return isUITheme(s.theme) && isLocale(s.language);
};
