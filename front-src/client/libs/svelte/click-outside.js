export default function clickoutside(node) {
  function onClick({ target }) {
    do {
      if (target == node) return;
      target = target.parentNode;
    } while (target);

    node.dispatchEvent(new CustomEvent("clickoutside"));
  }

  document.addEventListener("click", onClick);
  document.addEventListener("contextmenu", onClick);

  return {
    destroy() {
      document.removeEventListener("click", onClick);
      document.removeEventListener("contextmenu", onClick);
    },
  };
}
