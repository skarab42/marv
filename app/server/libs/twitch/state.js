let state = {
  user: null,
};

function get() {
  return { ...state };
}

function update(newState) {
  state = { ...state, ...newState };
}

module.exports = { get, update };
