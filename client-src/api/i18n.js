import store from "./store";
import config from "./config";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { emit } from "@/libs/socket.io";

let _ = null;

async function init() {
  if (_) return _;

  const options = {
    ...(await config.get("i18next")),
    lng: await store.get("app.lang"),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}"
    }
  };

  options.preload = options.supportedLngs;

  return (_ = await i18next.use(HttpApi).init(options));
}

async function changeLanguage(language) {
  await i18next.changeLanguage(language);
  await emit("i18n.changeLanguage", language);
}

export default init;
export { i18next, _, changeLanguage };
