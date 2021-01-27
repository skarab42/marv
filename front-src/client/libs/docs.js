import { store, siteURL } from "@/stores/app";
import { get } from "svelte/store";

const languages = ["en", "fr"];

const getStartedLinks = {
  en: `/get-started/`,
  fr: `/demarrage-rapide/`,
};

export function url(uri) {
  let lang = get(store).language;
  lang = languages.includes(lang) ? lang : languages[0];
  return `${get(siteURL)}/${lang}/docs/${uri}`;
}

export function getStartURL() {
  return url(getStartedLinks[get(store).language] || getStartedLinks.en);
}
