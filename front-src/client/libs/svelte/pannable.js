export default function pannable(node) {
  let x;
  let y;

  function updateCoords(event) {
    x = event.clientX;
    y = event.clientY;
  }

  function handleMousedown(event) {
    updateCoords(event);

    node.dispatchEvent(new CustomEvent("panstart", {
      detail: { x, y }
    }));

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;

    updateCoords(event);

    node.dispatchEvent(new CustomEvent("panmove", {
      detail: { x, y, dx, dy }
    }));
  }

  function handleMouseup(event) {
    updateCoords(event);

    node.dispatchEvent(new CustomEvent("panend", {
      detail: { x, y }
    }));

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    }
  };
}
