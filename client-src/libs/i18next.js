import i18next from "i18next";
import HttpApi from "i18next-http-backend";

let _ = null;

async function init(options) {
  if (_) return _;

  _ = await i18next.use(HttpApi).init({
    ...options,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}",
    },
  });

  return _;
}

export default init;
export { i18next, _ };
