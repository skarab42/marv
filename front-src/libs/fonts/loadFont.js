import api from "@/api/app";

const loadedFonts = new Map();

export default async function loadFont(url, notify = true) {
  if (loadedFonts.has(url)) {
    return loadedFonts.get(url);
  }

  const fontFace = new FontFace(url, `url(${encodeURI(url)})`);
  loadedFonts.set(url, fontFace);

  await fontFace.load();
  notify && api.loadFont(url);
  document.fonts.add(fontFace);

  return fontFace;
}
