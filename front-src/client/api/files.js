import { emit, on } from "@/libs/socket.io";

export default {
  purge: () => emit("files.purge"),
  getFileList: () => emit("files.getFileList"),
  upload: (file) => emit("files.upload", file),
  remove: (file) => emit("files.remove", file),
  update: (file, data) => emit("files.update", file, data),
  on: (eventName, callback) => on(`files.${eventName}`, callback),
};
