import { styleDefs } from "./settings";

function getUnit(key) {
  const defs = styleDefs[key];
  return defs ? defs.unit || "" : "";
}

function parseType(key, value) {
  const defs = styleDefs[key];
  return defs && defs.type === "string" ? `'${value}'` : value;
}

export default function getStyle(input) {
  const style = ["max-width:none"];

  Object.entries(input).forEach(([key, value]) => {
    const unit = getUnit(key);
    value = parseType(key, value);
    style.push(`${key}:${value}${unit}`);
  });

  return style.join(";");
}
