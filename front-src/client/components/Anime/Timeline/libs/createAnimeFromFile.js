import { v4 as uuid } from "uuid";
import { elementFactories } from "./utils";
import { createKeyframe } from "./createKeyframe";

import {
  defaultStyles,
  defaultAttrs,
  defaultTrans,
  styleDefs,
  attrsDefs,
  transDefs,
} from "./settings";

export async function createElementFromTarget(target) {
  const factory = elementFactories[target.type];

  if (!factory) {
    throw new Error(`Undefined type "${target.type}"`);
  }

  return await factory(target.filename);
}

async function getTargetInfo(target) {
  const element = await createElementFromTarget(target);
  const info = {};

  if (target.type === "image") {
    info.width = element.width;
    info.height = element.height;
  } else if (target.type === "video") {
    info.width = element.videoWidth;
    info.height = element.videoHeight;
  } else if (target.type === "text") {
    info.length = element.innerText.length;
  }

  if (target.type === "audio" || target.type === "video") {
    info.duration = Math.round(element.duration * 1000);
  }

  return info;
}

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
