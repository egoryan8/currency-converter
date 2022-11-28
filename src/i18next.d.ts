import "i18next";
import en from "locales/en.json";
import ru from "locales/ru.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultLng: "ru";
    resources: {
      en: typeof en;
      ru: typeof ru;
    };
  }
}