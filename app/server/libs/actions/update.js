const { actions } = require("../../../stores");

module.exports = function update({ widget, anime }) {
  actions.set(`actions.${widget.id}`, anime);
};
