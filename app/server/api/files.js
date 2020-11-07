const files = require("../libs/files");

module.exports = {
  upload: (file) => files.upload(file),
  getFileList: () => files.getFileList(),
};
