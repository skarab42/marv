const actions = require("../libs/actions");

module.exports = {
  push(newAction) {
    return actions.push(newAction);
  },
};
