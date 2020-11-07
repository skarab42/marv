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

function getFileType(filename, buffer) {
  const ext = path.extname(filename).slice(1);
  const mimeType = mime.getType(filename);

  if (!ext || !mimeType) {
    return false;
  }

  const type = mimeType.split("/")[0];
  const size = Buffer.byteLength(buffer);

  return { filename, size, ext, type, mimeType };
}

async function upload({ name, buffer }) {
  const filename = cleanFileName(name);
  const fileInfo = getFileType(filename, buffer);
  const filePath = path.join(uploadDir, filename);

  if (!fileInfo.size) {
    return Promise.reject(_("sentences.empty-file"));
  }

  if (!allowedMimeTypes.includes(fileInfo.type)) {
    return Promise.reject(_("sentences.disallowed-file-type"));
  }

  if (fs.existsSync(filePath)) {
    return Promise.reject(_("sentences.file-already-exists"));
  }

  try {
    fs.writeFileSync(filePath, buffer);
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(fileInfo);
}

function getFileList() {
  return Promise.resolve(fs.readdirSync(uploadDir));
}

module.exports = {
  upload,
  getFileList,
};
