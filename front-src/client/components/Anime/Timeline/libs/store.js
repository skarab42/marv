import { writable } from "svelte/store";

export default function create() {
  return {
    items: writable([]),
    selectedItem: writable(null),
    selectedKeyframe: writable(null),
    anime: writable(null),
    timeline: {
      left: writable(0),
      scale: writable(1),
    },
    paused: writable(false),
    seek: writable(0),
    pixelPerMs: 10,
    fakeEvent: writable(null),
  };
}
