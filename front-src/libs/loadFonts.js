// import getUsedFonts from "./getUsedFonts";
import api from "@/api/app";

const loadedFonts = new Map();

// getUsedFonts().then((usedFonts) => {
//   console.log({ usedFonts });
// });

async function loadFont(name, url) {
  if (loadedFonts.has(name)) {
    return loadedFonts.get(name);
  }

  const fontFace = new FontFace(name, `url(${encodeURI(url)})`);

  loadedFonts.set(name, fontFace);

  await fontFace.load();
  document.fonts.add(fontFace);

  return fontFace;
}

export default async function loadFonts() {
  const fonts = await api.getFonts();
  const fontNames = [];

  for (let i = 0, l = fonts.length; i < l; i++) {
    try {
      const filename = fonts[i];
      const [name] = filename.split(".");
      const fontFace = await loadFont(name, filename);
      fontFace.family && fontNames.push(fontFace.family);
    } catch (error) {
      // console.log("Oups:", error);
    }
  }

  return fontNames;
}
