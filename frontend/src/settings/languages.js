import i18next from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
       
      "Todo List": "Todo List",
       Projects: "Projects",
       
    }
  },
  es: {
    translation: {
      
      "Todo List": "Yapılacaklar Listesi",
       Projects: "Projeler",
       
    }
  }
};
i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});