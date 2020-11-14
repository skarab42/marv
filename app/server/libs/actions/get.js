const { actions } = require("../../../stores");

module.exports = function get(id) {
  return actions.get(`actions.${id}`);
};
