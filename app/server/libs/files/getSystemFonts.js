const _getSystemFonts = require("get-system-fonts");
const { filesPath } = require("../../../utils");
const path = require("path");

const fontPaths = [];
const fontNames = [];

module.exports = async function getSystemFonts() {
  const paths = await _getSystemFonts({ additionalFolders: [filesPath] });

  paths.forEach((fontPath) => {
    const dirname = path.dirname(fontPath);
    const basename = path.basename(fontPath);

    if (!fontNames.includes(basename)) {
      fontNames.push(basename);
    }

    if (!fontPaths.includes(dirname)) {
      fontPaths.push(dirname);
    }
  });

  return { fontPaths, fontNames };
};
