import { LocaleCode } from "./localization";

export interface UiPreferencesState {
  theme: "light" | "dark" | "system";
  language: LocaleCode;
}
