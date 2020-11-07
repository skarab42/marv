const files = require("../libs/files");

module.exports = {
  upload(file) {
    return files.upload(file).then((file) => {
      this.notify("files.add", file);
      return Promise.resolve(file);
    });
  },
  remove(file) {
    return files.remove(file).then((file) => {
      this.notify("files.remove", file);
      return Promise.resolve(file);
    });
  },
  getFileList: () => files.getFileList(),
};
