const path = require("path");
const mime = require("mime");
const fs = require("fs-extra");
const { _ } = require("./i18next");
const { filesPath } = require("../../utils");
const { panels, actions } = require("../../stores");
const getUsedFonts = require("./files/getUsedFonts");
const getSystemFonts = require("./files/getSystemFonts");
const getWidgetFiles = require("./files/getWidgetFiles");

let allFiles = [];

const allowedMimeTypes = ["text", "image", "audio", "video", "font"];

fs.ensureDirSync(filesPath);

function cleanFileName(name) {
  return name.replace(/[^a-z0-9_.]+/gi, "_");
}

function getFileInfo(filename, buffer) {
  const ext = path.extname(filename).slice(1);
  const mimeType = mime.getType(filename);

  if (!ext || !mimeType) {
    throw new Error("No extension and/or mime type");
  }

  const type = mimeType.split("/")[0];
  const size = Buffer.byteLength(buffer);

  const useCount = allFiles.filter((file) => file === filename).length;

  return { filename, useCount, size, ext, type, mimeType };
}

function getFileInfoFromFilename(filename) {
  return getFileInfo(filename, fs.readFileSync(path.join(filesPath, filename)));
}

function isAllowedMimeType(type) {
  return allowedMimeTypes.includes(type);
}

async function update(filename, data) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path.join(filesPath, filename), data);
    } catch (error) {
      return reject(error);
    }

    return true;
  });
}

async function upload({ name, buffer }) {
  return new Promise((resolve, reject) => {
    const filename = cleanFileName(name);
    const fileInfo = getFileInfo(filename, buffer);
    const filePath = path.join(filesPath, filename);

    if (!fileInfo.size && fileInfo.type !== "text") {
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

function remove(file) {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(path.join(filesPath, file.filename));
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
}

function localeSort(a, b) {
  return a.localeCompare(b, {
    numeric: true,
    ignorePunctuation: true,
  });
}

function getAllFiles() {
  let files = [];

  const actionsStore = actions.store.actions;

  panels.store.panels.forEach((panel) => {
    panel.widgets.forEach((widget) => {
      const action = actionsStore[widget.id];
      files = [...files, ...getWidgetFiles({ widget, action })];
    });
  });

  return files;
}

function getFileList() {
  return new Promise((resolve, reject) => {
    try {
      allFiles = getAllFiles();
      const files = fs.readdirSync(filesPath);
      const fileList = files
        .sort(localeSort)
        .map(getFileInfoFromFilename)
        .filter(({ type }) => isAllowedMimeType(type));
      resolve(fileList);
    } catch (error) {
      reject(error);
    }
  });
}

async function purge() {
  let files = await getFileList();
  return Promise.all(
    files.filter((file) => !file.useCount).map((file) => remove(file))
  );
}

module.exports = {
  purge,
  upload,
  remove,
  update,
  getFileList,
  getUsedFonts,
  getSystemFonts,
};
