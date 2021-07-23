import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export const notices = writable([]);

const defaults = {
  duration: 5000,
  dismissable: true,
  onClose: () => {},
};

export function pauseNotice({ id, clearTimeout }) {
  notices.update((state) => {
    return state.map((notice) => {
      if (notice.id === id) {
        clearTimeout();
        notice.options.duration = 0;
      }
      return notice;
    });
  });
}

export function closeNotice(notice) {
  notices.update((state) =>
    state.filter((entry) => {
      if (entry.id === notice.id) {
        if (notice.options && typeof notice.options.onClose === "function") {
          notice.options.onClose(notice);
        }
        return false;
      }
      return true;
    })
  );
}

export function notify(type, message, options = {}) {
  options = { ...defaults, ...options };

  const id = uuid();
  const notice = { id, type, message, options, clearTimeout: () => {} };
  const close = () => closeNotice(notice);

  notices.update((state) => [...state, notice]);

  if (options.duration) {
    const tid = setTimeout(close, options.duration);
    notice.clearTimeout = () => clearTimeout(tid);
  }

  return { id, close };
}
