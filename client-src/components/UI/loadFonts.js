import api from "@/api/app";

async function loadFont(name, url) {
  const fontFace = new FontFace(name, `url(${url})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  return fontFace;
}

export default async function loadFonts() {
  const fonts = await api.getFonts();
  const fontNames = [];

  for (let i = 0, l = fonts.length; i < l; i++) {
    const filename = fonts[i];
    const [name] = filename.split(".");
    const fontFace = await loadFont(name, `files/${filename}`);
    fontNames.push(fontFace.family);
  }

  return fontNames;
}
