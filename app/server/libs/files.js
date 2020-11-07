const path = require("path");
const fs = require("fs-extra");
const stores = require("../../stores");

const uploadDir = stores.server.get("uploadDir");

fs.ensureDirSync(uploadDir);

function cleanFileName(name) {
  return name.replace(/[^a-z0-9_.]+/gi, "_");
}

function upload({ name, buffer }) {
  const filename = cleanFileName(name);
  const filePath = path.join(uploadDir, filename);

  if (fs.existsSync(filePath)) {
    return Promise.reject("File already exists");
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
