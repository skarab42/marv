export default {
  name: "ToggleScene",
  label: "obs.toggle-scene",
  hasTrigger: true,
  hasEvent: true,
  minSize: {
    w: 2,
    h: 4,
  },
  props: {
    scene1: null,
    scene2: null,
  },
};
