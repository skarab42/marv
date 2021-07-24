import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export const notices = writable([]);

const defaults = {
  duration: 5000,
  dismissable: true,
  onClose: () => {},
};

export function pauseNotice({ id, clearTimeout }) {
  notices.update((state) =>
    state.map((notice) => {
      if (notice.id === id) {
        clearTimeout();
        notice.read = true;
        notice.options.duration = 0;
      }
      return notice;
    })
  );
}

export function closeNotice({ id, clearTimeout }, read = true) {
  notices.update((state) =>
    state.map((notice) => {
      if (notice.id === id) {
        clearTimeout();
        notice.read = read;
        notice.closed = true;
      }
      return notice;
    })
  );
}

export function notify(type, message, options = {}) {
  options = { ...defaults, ...options };

  const id = uuid();
  const notice = {
    id,
    type,
    message,
    options,
    read: false,
    closed: false,
    time: Date.now(),
    clearTimeout: () => {},
  };

  notices.update((state) => [notice, ...state]);

  if (options.duration) {
    const close = () => closeNotice(notice, false);
    const tid = setTimeout(close, options.duration);
    notice.clearTimeout = () => clearTimeout(tid);
  }

  return { id, close: closeNotice.bind(null, notice) };
}
