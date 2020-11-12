import { styleDefs } from "./settings";

function getUnit(key) {
  const defs = styleDefs[key];
  return defs ? defs.unit || "" : "";
}

export default function getStyle(input) {
  const style = ["max-width:none"];

  Object.entries(input).forEach(([key, value]) => {
    const unit = getUnit(key);
    style.push(`${key}:${value}${unit}`);
  });

  return style.join(";");
}
