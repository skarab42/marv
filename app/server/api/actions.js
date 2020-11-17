const actions = require("../libs/actions");

module.exports = {
  push(newAction) {
    return actions.push(newAction);
  },
  update(anime) {
    return actions.update(anime);
  },
  get(id) {
    return actions.get(id);
  },
  getState() {
    return actions.getState();
  },
};
