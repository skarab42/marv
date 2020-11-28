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
    default: 42,
    unit: "px",
    input: { type: "number", min: 0, step: 10 },
  },
  "font-weight": {
    default: 700,
    input: { type: "number", min: 100, max: 900, step: 100 },
  },
  "font-family": {
    default: "monospace",
    input: { type: "fontpicker" },
  },
  "text-align": {
    default: "center",
    input: { type: "select", items: ["left", "center", "right"] },
  },
  color: {
    default: "#420042",
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
