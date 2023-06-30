import en from "./en";
import i18n from "i18n-js";

i18n.fallbacks = true;
i18n.translations = { en };
i18n.locale = "en"; // we can change language

const translate = i18n;
export default translate;
