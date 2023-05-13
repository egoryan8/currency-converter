import "i18next";
import ru from "locales/ru.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultLng: "ru";
    resources: {
      ru: typeof ru;
    };
  }
}