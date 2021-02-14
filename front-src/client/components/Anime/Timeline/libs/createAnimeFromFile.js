import { v4 as uuid } from "uuid";
import getTargetInfo from "./getTargetInfo";
import { createKeyframe } from "./createKeyframe";

import {
  defaultStyles,
  defaultAttrs,
  defaultTrans,
  styleDefs,
  attrsDefs,
  transDefs,
} from "./settings";

function getTargetProps(defaults, defs, { type, info }) {
  const names = defaults[type] || [];
  const style = {};

  names.forEach((key) => {
    const { default: value } = defs[key];
    style[key] = info[key] || value;
  });

  return style;
}

function getTargetStyle(data) {
  return getTargetProps(defaultStyles, styleDefs, data);
}

function getTargetAttrs(data) {
  return getTargetProps(defaultAttrs, attrsDefs, data);
}

function getTargetTrans(data) {
  return getTargetProps(defaultTrans, transDefs, data);
}

async function createTargetFromFile(file) {
  const type = file.type;
  const info = await getTargetInfo(file);
  const style = getTargetStyle({ type, info });
  const attrs = getTargetAttrs({ type, info });
  const trans = getTargetTrans({ type, info });

  return { ...file, info, style, attrs, trans };
}

export default async function createAnimeFromFile(file) {
  const target = await createTargetFromFile(file);
  const { duration } = target.info;
  const props = duration === undefined ? {} : { duration };
  return {
    id: uuid(),
    type: "file",
    target,
    keyframes: [createKeyframe(props)],
  };
}
