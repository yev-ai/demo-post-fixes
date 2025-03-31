import Cookies from "js-cookie";
// @ts-expect-error types unavailable
import { CookieStorage } from "redux-persist-cookie-storage";

const createCustomStorage = (cookieStorage: typeof CookieStorage) => {
  return {
    getItem: (key: string) => {
      return cookieStorage.getItem(key).then((serializedData: string) => {
        if (!serializedData) return serializedData;
        try {
          return JSON.parse(serializedData);
        } catch {
          return serializedData;
        }
      });
    },
    setItem: (key: string, value: string) => {
      const valueToStore =
        typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : value;
      return cookieStorage.setItem(key, valueToStore);
    },
    removeItem: (key: string) => {
      return cookieStorage.removeItem(key);
    },
  };
};

export const createCookieStorage = createCustomStorage(
  new CookieStorage(Cookies, {
    expiration: { default: 365 * 86400 },
  })
);
