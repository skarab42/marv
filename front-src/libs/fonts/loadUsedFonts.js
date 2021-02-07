import getUsedFonts from "./getUsedFonts";
import loadFont from "./loadFont";
import getFonts from "./getFonts";

export default async function loadUsedFonts(notify = true) {
  const usedFonts = await getUsedFonts();
  const fonts = await getFonts();

  usedFonts.forEach((url) => loadFont(url, notify));

  return fonts;
}
