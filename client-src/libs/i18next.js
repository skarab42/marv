import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { emit } from "@/libs/socket.io";

let _ = null;

async function init() {
  if (_) return _;

  const options = await emit("stores.i18next", "getAll");

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
