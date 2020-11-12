import { transDefs } from "./settings";

function getUnit(key) {
  const defs = transDefs[key];
  return defs ? defs.unit || "" : "";
}

export default function getTrans(input) {
  const trans = [];

  Object.entries(input).forEach(([key, value]) => {
    const unit = getUnit(key);
    trans.push(`${key}(${value}${unit})`);
  });

  return `transform:${trans.length ? trans.join(" ") : "none"}`;
}
