import { createLocale } from "..";

export const es = createLocale("es", {
  general: {
    languageSwitchPending: "ES Ld",
  },
  auth: {
    login: "ES Login",
    logout: "ES Logout",
  },
  mainApp: {
    welcome: "ES Welcome",
    pleaseLogin: "ES Log in to use the app",
  },
});
