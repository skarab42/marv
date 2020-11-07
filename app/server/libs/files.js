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

function getFileInfo(filename, buffer) {
  const ext = path.extname(filename).slice(1);
  const mimeType = mime.getType(filename);

  if (!ext || !mimeType) {
    return false;
  }

  const type = mimeType.split("/")[0];
  const size = Buffer.byteLength(buffer);

  return { filename, size, ext, type, mimeType };
}

function getFileInfoFromFilename(filename) {
  return getFileInfo(filename, fs.readFileSync(path.join(uploadDir, filename)));
}

function isAllowedMimeType(type) {
  return allowedMimeTypes.includes(type);
}

async function upload({ name, buffer }) {
  return new Promise((resolve, reject) => {
    const filename = cleanFileName(name);
    const fileInfo = getFileInfo(filename, buffer);
    const filePath = path.join(uploadDir, filename);

    if (!fileInfo.size) {
      return reject(_("sentences.file-is-empty"));
    }

    if (!isAllowedMimeType(fileInfo.type)) {
      return reject(_("sentences.disallowed-file-type"));
    }

    if (fs.existsSync(filePath)) {
      return reject(_("sentences.file-already-exists"));
    }

    try {
      fs.writeFileSync(filePath, buffer);
    } catch (error) {
      return reject(error);
    }

    return resolve(fileInfo);
  });
}

function getFileList() {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(uploadDir);
      const fileList = files
        .map(getFileInfoFromFilename)
        .filter(({ type }) => isAllowedMimeType(type));
      resolve(fileList);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  upload,
  getFileList,
};
