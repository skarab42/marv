import { writable } from "svelte/store";

export let drawer = writable({
  visible: false,
});

export function update(props) {
  drawer.update((store) => {
    return { ...store, ...props };
  });
}

export function show() {
  update({ visible: true });
}

export function hide() {
  update({ visible: false });
}

export function toggle() {
  drawer.update((store) => {
    return { ...store, visible: !store.visible };
  });
}
