import {
  LocaleData,
  RootState,
  UIState,
  validLocaleCodes,
  validThemes,
} from "@types";
import { cookies } from "next/headers";

export const getInitialState = async () => {
  const cookieStore = await cookies();
  const uiValuesPersisted = cookieStore.get(
    encodeURIComponent("persist:uiState")
  )?.value;

  let uiState = {
    theme: validThemes[0],
    language: validLocaleCodes[0],
  } as UIState;

  if (uiValuesPersisted) {
    const uiValuesRaw = JSON.parse(uiValuesPersisted);
    delete uiValuesRaw._persist;
    const uiValues = uiValuesRaw as UIState;
    uiState = {
      theme: uiValues.theme,
      language: uiValues.language,
    };
  }

  return {
    uiState,
    localization: {
      translations: {
        [uiState.language]: (
          await import(`@/lib/localization/locales/${uiState.language}`)
        )[uiState.language] as LocaleData,
      },
      isLoading: false,
    },
  } as RootState;
};
