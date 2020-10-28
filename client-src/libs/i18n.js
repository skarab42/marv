import i18next from "i18next";
import HttpApi from "i18next-http-backend";

const dev = true;

function init() {
  return i18next.use(HttpApi).init({
    ns: "app",
    defaultNS: "app",
    lng: "en",
    fallbackLng: "en",
    debug: dev,
    saveMissing: dev,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}"
    }
  });
}

export default init;
export { i18next };
