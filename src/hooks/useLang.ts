import { useAppSelector } from "../hooks/dispatchHooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLanguage = (arabicLang: any, hebrewLang: any) => {
  const langState = useAppSelector((state) => state.lang.value);
  const lang = langState === "arabic" ? arabicLang : hebrewLang;
  return lang;
};
