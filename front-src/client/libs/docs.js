import { store } from "@/stores/app";
import { get } from "svelte/store";

// TODO get from db settings
let docsURL = `https://marv-site.web.app/`;

const languages = ["en", "fr"];

const getStartedLinks = {
  en: `/get-started/`,
  fr: `/demarrage-rapide/`,
};

export function url(uri) {
  let lang = get(store).language;
  lang = languages.includes(lang) ? lang : languages[0];
  return `${docsURL}/${lang}/docs/${uri}`;
}

export function getStartURL() {
  return url(getStartedLinks[get(store).language] || getStartedLinks.en);
}
