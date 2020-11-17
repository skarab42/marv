const { v4: uuid } = require("uuid");

module.exports = function create(action, data = null) {
  return {
    id: uuid(),
    type: null,
    widget: null,
    data,
    ...action,
  };
};
