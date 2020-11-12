import { v4 as uuid } from "uuid";
import { elementFactories } from "./utils";

import {
  extTypes,
  defaultStyles,
  defaultAttrs,
  defaultTrans,
  styleDefs,
  attrsDefs,
  transDefs,
} from "./settings";

function getTypeFromExt(ext) {
  const type = extTypes[ext];

  if (!type) {
    throw new Error(`Undefined ext. "${ext}"`);
  }

  return type;
}

function uploadFile(type, file) {
  return app.remote.call(`upload.${type}`, file.path);
}

async function createElementFromTarget(target) {
  const factory = elementFactories[target.type];

  if (!factory) {
    throw new Error(`Undefined type "${target.type}"`);
  }

  return await factory(target.name);
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

  names.forEach(key => {
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
  const ext = file.name.split(".").pop();
  const type = getTypeFromExt(ext);
  const name = await uploadFile(type, file);
  const info = await getTargetInfo({ type, name });
  const style = getTargetStyle({ type, info });
  const attrs = getTargetAttrs({ type, info });
  const trans = getTargetTrans({ type, info });

  return { type, name, info, style, attrs, trans };
}

export default async function createItemFromFile(file) {
  if (!file.size) {
    throw new Error(`Empty file "${file.name}"`);
  }

  return {
    id: uuid(),
    type: "file",
    target: await createTargetFromFile(file),
    keyframes: [],
  };
}
