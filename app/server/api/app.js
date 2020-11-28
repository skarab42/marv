const { filesPath } = require("../../utils");
const fs = require("fs");

const allowedExts = ["ttf", "otf"];

function getFonts() {
  return fs.readdirSync(filesPath).filter((filename) => {
    const ext = filename.split(".").pop();
    return allowedExts.includes(ext);
  });
}

module.exports = {
  getOS: () => {
    return process.platform;
  },
  getFonts: () => {
    return getFonts();
  },
};
