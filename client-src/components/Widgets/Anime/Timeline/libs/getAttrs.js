import { attrsDefs } from "./settings";

function getUnit(key) {
  const defs = attrsDefs[key];
  return defs ? defs.unit || "" : "";
}

export default function getAttrs(input) {
  const attrs = {};

  Object.entries(input).forEach(([key, value]) => {
    const unit = getUnit(key);
    attrs[key] = `${value}${unit}`;
  });

  return attrs;
}
