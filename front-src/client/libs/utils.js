import { i18next } from "@/libs/i18next";

export function localeSort(a, b) {
  return a.localeCompare(b, i18next.language, {
    numeric: true,
    ignorePunctuation: true,
  });
}
