import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
            //Landing
          "Download the game from here!":
            "Download the game from here!",
          "Kindly choose one of the options": "Kindly choose one of the options",
          "Download":"Download ",
          "Play Now!":"Play Now!"
        }
      },
      hi: {
        translations: {
          "Download the game from here!":
            "आप कॉलेज के लिए खेल डाउनलोड करें!",
          "Kindly choose one of the options": "यहाँ खेल के बारे में कुछ लिखें!",
          "Download":"डाउनलोड ",
          "Play Now!":"खेलें!"
        }
      },
      ml: {

        translations: {
          "Download the game from here!":
            "നിങ്ങളുടെ കോളേജിനു വേണ്ടി ഗെയിം ഡൌൺലോഡ് ചെയ്യുക",
          "Kindly choose one of the options": "കളിയെ കുറിച്ച് എന്തെങ്കിലു ഇവിടെ എഴുതുക",
          "Download":"ഡൌൺലോഡ് ",
          "Play Now!":"ഇപ്പോൾ പ്ലേ ചെയ്യുക!"
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, 

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;