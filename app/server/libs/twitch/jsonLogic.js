const jsonLogic = require("json-logic-js");

jsonLogic.add_operation("^", (a, b) => a.startsWith(b));
jsonLogic.add_operation("$", (a, b) => a.endsWith(b));

module.exports = jsonLogic;
