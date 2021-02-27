const jsonLogic = require("json-logic-js");

const lower = (a) => (a + "").toLowerCase();
const has = (a, b) => lower(a).includes(lower(b));

jsonLogic.add_operation("has", has);
jsonLogic.add_operation("hasNot", (a, b) => !has(a, b));
jsonLogic.add_operation("==", (a, b) => lower(a) == lower(b));
jsonLogic.add_operation("!=", (a, b) => lower(a) != lower(b));
jsonLogic.add_operation("^", (a, b) => lower(a).startsWith(lower(b)));
jsonLogic.add_operation("$", (a, b) => lower(a).endsWith(lower(b)));

module.exports = jsonLogic;
