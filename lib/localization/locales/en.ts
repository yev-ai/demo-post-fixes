import { createLocale } from "..";

export const en = createLocale("en", {
  general: {
    languageSwitchPending: "Loading",
  },
  auth: {
    login: "Login",
    logout: "Logout",
    loading: "Loading",
  },
});
