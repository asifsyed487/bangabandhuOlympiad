import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from "./assets/translation/translationEN.json";
import translationBd from "./assets/translation/translationBD.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  bd: {
    translation: translationBd,
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "bd",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
