import store from "./store";
import config from "./config";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";

async function init() {
  const lng = await store.get("app.lang");
  const options = await config.get("i18next");

  return i18next.use(HttpApi).init({
    ...options,
    lng,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}"
    }
  });
}

export default init;
export { i18next };
