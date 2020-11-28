import { v4 as uuid } from "uuid";

export function createKeyframe(props = {}) {
  return {
    id: uuid(),
    delay: 0,
    duration: 1000,
    easing: "linear",
    ...props,
    attrs: {},
    style: {},
    trans: {},
  };
}
