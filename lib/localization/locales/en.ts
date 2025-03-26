import { createLocale } from "..";

export const en = createLocale("en", {
  general: {
    languageSwitchPending: "Loading",
  },
  auth: {
    login: "Login",
    logout: "Logout",
  },
  mainApp: {
    welcome: "Welcome",
    pleaseLogin: "Log in to use the app",
  },
});
