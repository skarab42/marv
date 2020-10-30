import store from "./store";
import config from "./config";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";

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

  return (_ = i18next.use(HttpApi).init(options));
}

export default init;
export { i18next, _ };
