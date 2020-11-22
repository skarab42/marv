const create = require("../../stores/create");

const defaults = {
  bounds: {
    width: 800,
    height: 600,
  },
};

module.exports = function storeBounds({ win, name, delay = 500 } = {}) {
  const store = create(`windows/${name}`, { defaults });

  let timeout = null;

  const loadBounds = () => win.setBounds(store.get("bounds"));
  const updateBounds = () => store.set("bounds", win.getBounds());

  const updateBoundsDelay = () => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(updateBounds, delay);
  };

  win.on("show", loadBounds);
  win.on("hide", updateBounds);
  win.on("close", updateBounds);
  win.on("move", updateBoundsDelay);
  win.on("resize", updateBoundsDelay);
};
