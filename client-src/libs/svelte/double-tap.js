export default function doubletap(node) {
  let lastTap = 0;

  function onTouchEnd() {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;

    lastTap = currentTime;

    if (tapLength <= 300) {
      node.dispatchEvent(new CustomEvent("dbltap"));
    }
  }

  node.addEventListener("touchend", onTouchEnd);

  return {
    destroy() {
      node.removeEventListener("touchend", onTouchEnd);
    },
  };
}
