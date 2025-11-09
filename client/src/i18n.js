// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import ICU from "i18next-icu";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//   .use(ICU)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: {
//           DashboardTitle: "🌾 AgriSense Smart Dashboard",
//           DashboardDesc:
//             "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.",
//           "AI Crop Suggestion": "AI Crop Suggestion",
//           "Chatbot Assistant": "Chatbot Assistant",
//           "Irrigation Planner": "Irrigation Planner",
//           "Fertilizer Advisor": "Fertilizer Advisor",
//           "Sustainability Report": "Sustainability Report",
//           "Weather Updates": "Weather Updates",
//           Complaints: "Complaints",
//           Login: "Login",
//           Signup: "Signup",
//           Logout: "Logout",
//           Farmer: "Farmer",
//           NumberExample: "Total Yield: {count, number}",
//         },
//       },
//       hi: {
//         translation: {
//           DashboardTitle: "🌾 एग्रीसेंस स्मार्ट डैशबोर्ड",
//           DashboardDesc:
//             "किसानों और पेशेवरों को एआई-संचालित जानकारी से सक्षम बनाना ताकि वे समझदारी से खेती करें, संसाधन बचाएं और टिकाऊ रूप से बढ़ें।",
//           "AI Crop Suggestion": "एआई फसल सुझाव",
//           "Chatbot Assistant": "चैटबॉट सहायक",
//           "Irrigation Planner": "सिंचाई योजनाकार",
//           "Fertilizer Advisor": "उर्वरक सलाहकार",
//           "Sustainability Report": "सस्टेनेबिलिटी रिपोर्ट",
//           "Weather Updates": "मौसम अपडेट",
//           Complaints: "शिकायतें",
//           Login: "लॉगिन",
//           Signup: "साइनअप",
//           Logout: "लॉगआउट",
//           Farmer: "किसान",
//           NumberExample: "कुल उपज: {count, number}",
//         },
//       },
//       or: {
//         translation: {
//           DashboardTitle: "🌾 ଏଗ୍ରିସେନ୍ସ ସ୍ମାର୍ଟ ଡ୍ୟାସ୍‌ବୋର୍ଡ",
//           DashboardDesc:
//             "କୃଷକ ଓ ପେଶାଦାରଙ୍କୁ ଏଆଇ ଆଧାରିତ ତଥ୍ୟ ଦ୍ୱାରା ସକ୍ଷମ କରିବା ଯାହା ସୁଦ୍ଧିଶୀଳ ଭାବରେ ଚାଷ କରିବା ଓ ସମ୍ପଦ ସଞ୍ଚୟ କରିବାରେ ସାହାଯ୍ୟ କରେ।",
//           "AI Crop Suggestion": "ଏଆଇ ଫସଲ ପରାମର୍ଶ",
//           "Chatbot Assistant": "ଚାଟବଟ ସହାୟକ",
//           "Irrigation Planner": "ସିଚାଇ ପ୍ରୟୋଜନାକାରୀ",
//           "Fertilizer Advisor": "ଉର୍ବରକ ପରାମର୍ଶକ",
//           "Sustainability Report": "ସସ୍ଥିରତା ରିପୋର୍ଟ",
//           "Weather Updates": "ଆବହାଅବସ୍ଥା ସୂଚନା",
//           Complaints: "ଅଭିଯୋଗ",
//           Login: "ଲଗଇନ୍",
//           Signup: "ସାଇନଅପ୍",
//           Logout: "ଲଗଆଉଟ୍",
//           Farmer: "କୃଷକ",
//           NumberExample: "ମୋଟ ଉତ୍ପାଦନ: {count, number}",
//         },
//       },
//     },

//     lng: localStorage.getItem("lang") || "en",
//     fallbackLng: "en",
//     interpolation: {
//       escapeValue: false,
//     },
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18n;



// src/i18n.js
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import ICU from "i18next-icu";
// import LanguageDetector from "i18next-browser-languagedetector";
// import "intl-messageformat";

// const resources = {
//   en: {
//     translation: {
//       // Navbar
//       Complaints: "Complaints",
//       Login: "Login",
//       Signup: "Signup",
//       Logout: "Logout",
//       Language: "Language",
//       Farmer: "Farmer",

//       // Dashboard
//       "AgriSense Smart Dashboard": "AgriSense Smart Dashboard",
//       "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//         "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.",
//       "AI Crop Suggestion": "AI Crop Suggestion",
//       "Get the best crop for your soil & weather": "Get the best crop for your soil & weather",
//       "Chatbot Assistant": "Chatbot Assistant",
//       "Ask AgriSense anything about farming": "Ask AgriSense anything about farming",
//       "Irrigation Planner": "Irrigation Planner",
//       "Plan watering schedules smartly": "Plan watering schedules smartly",
//       "Fertilizer Advisor": "Fertilizer Advisor",
//       "Get balanced fertilizer usage info": "Get balanced fertilizer usage info",
//       "Sustainability Report": "Sustainability Report",
//       "View eco impact & carbon footprint": "View eco impact & carbon footprint",
//       "Weather Updates": "Weather Updates",
//       "Check current weather and forecast": "Check current weather and forecast",
//     },
//   },
//   hi: {
//     translation: {
//       // Navbar
//       Complaints: "शिकायतें",
//       Login: "लॉगिन",
//       Signup: "साइनअप",
//       Logout: "लॉगआउट",
//       Language: "भाषा",
//       Farmer: "किसान",

//       // Dashboard
//       "AgriSense Smart Dashboard": "एग्रीसेंस स्मार्ट डैशबोर्ड",
//       "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//         "किसानों और पेशेवरों को एआई-संचालित अंतर्दृष्टि के साथ सशक्त बनाना, स्मार्ट खेती करना, संसाधनों को बचाना और सतत रूप से बढ़ना।",
//       "AI Crop Suggestion": "एआई फसल सुझाव",
//       "Get the best crop for your soil & weather": "अपने मिट्टी और मौसम के लिए सर्वोत्तम फसल प्राप्त करें",
//       "Chatbot Assistant": "चैटबोट सहायक",
//       "Ask AgriSense anything about farming": "एग्रीसेंस से खेती के बारे में कुछ भी पूछें",
//       "Irrigation Planner": "सिंचाई योजनाकार",
//       "Plan watering schedules smartly": "स्मार्ट तरीके से पानी देने का समय तय करें",
//       "Fertilizer Advisor": "उर्वरक सलाहकार",
//       "Get balanced fertilizer usage info": "संतुलित उर्वरक उपयोग की जानकारी प्राप्त करें",
//       "Sustainability Report": "सततता रिपोर्ट",
//       "View eco impact & carbon footprint": "पारिस्थितिक प्रभाव और कार्बन पदचिह्न देखें",
//       "Weather Updates": "मौसम अपडेट",
//       "Check current weather and forecast": "वर्तमान मौसम और पूर्वानुमान देखें",
//     },
//   },
//   or: {
//     translation: {
//       // Navbar
//       Complaints: "ଅଭିଯୋଗଗୁଡିକ",
//       Login: "ଲଗିନ୍",
//       Signup: "ସାଇନଅପ୍",
//       Logout: "ଲଗଅଉଟ୍",
//       Language: "ଭାଷା",
//       Farmer: "କୃଷକ",

//       // Dashboard
//       "AgriSense Smart Dashboard": "ଏଗ୍ରିସେନ୍ସ ସ୍ମାର୍ଟ ଡ୍ୟାସ୍ବୋର୍ଡ",
//       "Empowering farmers and professionals with AI-driven insights to cultivate smarter, conserve resources, and grow sustainably.":
//         "କୃଷକମାନେ ଏବଂ ପ୍ରଫେସନାଲ୍‌ମାନେ ଏଆଇ ଆଧାରିତ ତଥ୍ୟ ସହିତ ସୁଦୃଢ଼ ଚାଷ କରିବା, ସଂସାଧନ ସଂରକ୍ଷଣ କରିବା ଏବଂ ସସ୍ତାୟୀ ଭାବରେ ବୃଦ୍ଧି କରିବା ପାଇଁ ସଶକ୍ତ ହେବେ।",
//       "AI Crop Suggestion": "ଏଆଇ ଫସଲ ସୁପାରିସ୍",
//       "Get the best crop for your soil & weather": "ଆପଣଙ୍କ ମାଟି ଏବଂ ମାଉସମ ପାଇଁ ସର୍ବୋତ୍ତମ ଫସଲ ପାଆନ୍ତୁ",
//       "Chatbot Assistant": "ଚାଟବଟ୍ ସହାୟକ",
//       "Ask AgriSense anything about farming": "ଏଗ୍ରିସେନ୍ସକୁ କୃଷି ବିଷୟରେ କିଛି ପଚାରନ୍ତୁ",
//       "Irrigation Planner": "ସିଚାଇ ପରିକଳ୍ପକ",
//       "Plan watering schedules smartly": "ସାବଧାନ ସହିତ ସିଚାଇ ସମୟ ଯୋଜନା କରନ୍ତୁ",
//       "Fertilizer Advisor": "ଉର୍ବରକ ଉପଦେଶକ",
//       "Get balanced fertilizer usage info": "ସମତୁଳିତ ଉର୍ବରକ ବ୍ୟବହାର ସୂଚନା ପାଆନ୍ତୁ",
//       "Sustainability Report": "ସସ୍ତାୟୀତା ରିପୋର୍ଟ",
//       "View eco impact & carbon footprint": "ପରିବେଶ ପ୍ରଭାବ ଏବଂ କାର୍ବନ୍ ପଦଚିହ୍ନ ଦେଖନ୍ତୁ",
//       "Weather Updates": "ମାଉସମ ଅଦ୍ୟତନ",
//       "Check current weather and forecast": "ବର୍ତ୍ତମାନ ମାଉସମ ଏବଂ ପୂର୍ବାନୁମାନ ଦେଖନ୍ତୁ",
//     },
//   },
// };

// i18n
//   .use(ICU)
//   .use(LanguageDetector) // detects browser language
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: "en",
//     debug: false,
//     interpolation: {
//       escapeValue: false, // react already escapes
//     },
//     detection: {
//       order: ["localStorage", "navigator"],
//       caches: ["localStorage"],
//     },
//   });

// export default i18n;




import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import en from "./i18n/en.json";
import hi from "./i18n/hi.json";
import or from "./i18n/or.json";

i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      or: { translation: or }
    },
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false, // react already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
