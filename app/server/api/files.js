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
  update: (file, data) => files.update(file, data),
  getFileList: () => files.getFileList(),
  async purge() {
    return files.purge().then(async (removedFiles) => {
      const newFiles = await files.getFileList();
      this.notify("files.update", { files: newFiles, removedFiles });
      return Promise.resolve({ files: newFiles, removedFiles });
    });
  },
};
