const path = require("path");
const mime = require("mime");
const fs = require("fs-extra");
const { _ } = require("./i18next");
const stores = require("../../stores");

const uploadDir = stores.server.get("uploadDir");
const allowedMimeTypes = ["text", "image", "audio", "video"];

fs.ensureDirSync(uploadDir);

function cleanFileName(name) {
  return name.replace(/[^a-z0-9_.]+/gi, "_");
}

function getFileType(filename) {
  const ext = path.extname(filename).slice(1);
  const mimeType = mime.getType(filename);

  if (!ext || !mimeType) {
    return false;
  }

  const type = mimeType.split("/")[0];

  return { ext, type, mimeType };
}

async function upload({ name, buffer }) {
  const filename = cleanFileName(name);
  const fileType = getFileType(filename);

  if (!allowedMimeTypes.includes(fileType.type)) {
    return Promise.reject(_("sentences.disallowed-file-type"));
  }

  const filePath = path.join(uploadDir, filename);

  if (fs.existsSync(filePath)) {
    return Promise.reject(_("sentences.file-already-exists"));
  }

  try {
    fs.writeFileSync(filePath, buffer);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(filename);
}

function getFileList() {
  return Promise.resolve(fs.readdirSync(uploadDir));
}

module.exports = {
  upload,
  getFileList,
};
