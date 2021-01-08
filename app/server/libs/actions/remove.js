const { actions } = require("../../../stores");

module.exports = function remove(id) {
  return actions.delete(`actions.${id}`);
};
