export const defaultAttrs = {
  audio: ["volume"],
  video: ["volume"],
};

export const defaultStyles = {
  text: [
    "top",
    "left",
    "width",
    "font-size",
    "font-family",
    "font-weight",
    "text-align",
    "color",
    "opacity",
    "z-index",
    "text-shadow",
    "-webkit-text-stroke-width",
    "-webkit-text-stroke-color",
  ],
  image: ["top", "left", "width", "height", "opacity", "z-index"],
  video: ["top", "left", "width", "height", "opacity", "z-index"],
};

export const defaultTrans = {
  text: ["rotate", "scale"],
  image: ["rotate", "scale"],
  video: ["rotate", "scale"],
};

export const attrsDefs = {
  volume: {
    default: 0.8,
    input: { type: "number", min: 0, max: 1, step: 0.1 },
  },
};

export const styleDefs = {
  top: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  left: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  width: {
    default: 800,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  height: {
    default: 600,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  opacity: {
    default: 1,
    input: { type: "number", min: 0, max: 1, step: 0.1 },
  },
  "z-index": {
    default: 1,
    input: { type: "number", min: 1, step: 1 },
  },
  "font-size": {
    default: 72,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  "font-weight": {
    default: 700,
    input: { type: "number", min: 100, max: 900, step: 100 },
  },
  "font-family": {
    type: "string",
    default: "",
    input: { type: "fontpicker" },
  },
  "text-align": {
    default: "center",
    input: { type: "select", items: ["left", "center", "right"] },
  },
  "-webkit-text-stroke-width": {
    default: 1,
    unit: "px",
    input: { type: "number", min: 0, step: 1 },
  },
  "-webkit-text-stroke-color": {
    default: "#111111",
    input: { type: "colorpicker" },
  },
  "text-shadow": {
    default: "2px 2px 0 #111111",
    input: { type: "textshadow" },
  },
  color: {
    default: "#eeeeee",
    input: { type: "colorpicker" },
  },
};

export const transDefs = {
  translateX: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  translateY: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  translateZ: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 },
  },
  rotate: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 },
  },
  rotateX: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 },
  },
  rotateY: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 },
  },
  rotateZ: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 },
  },
  scale: {
    default: 1,
    input: { type: "number", step: 0.1 },
  },
  scaleX: {
    default: 1,
    input: { type: "number", step: 0.1 },
  },
  scaleY: {
    default: 1,
    input: { type: "number", step: 0.1 },
  },
  scaleZ: {
    default: 1,
    input: { type: "number", step: 0.1 },
  },
  skew: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 },
  },
  skewX: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 },
  },
  skewY: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 },
  },
  perspective: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 1 },
  },
};

export const easings = [
  "linear",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeOutInQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeOutInCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeOutInQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
  "easeOutInQuint",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeOutInSine",
  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",
  "easeOutInExpo",
  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",
  "easeOutInCirc",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeOutInBack",
  "easeInBounce",
  "easeOutBounce",
  "easeInOutBounce",
  "easeOutInBounce",
];
