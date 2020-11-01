import i18next from "i18next";
import HttpApi from "i18next-http-backend";

export default i18next;

export let _ = null;

export async function init(options) {
  if (_) return _;

  _ = await i18next.use(HttpApi).init({
    ...options,
    preload: options.supportedLngs,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}"
    }
  });

  return _;
}
