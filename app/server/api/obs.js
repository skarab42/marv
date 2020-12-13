const settings = require("../libs/settings");
const obs = require("../libs/obs");

function getSettings() {
  return settings.getAll("obs.");
}

module.exports = {
  connect: async () => obs.connect(await getSettings()),
  disconnect: () => obs.disconnect(),
  getState: () => obs.getState(),
  emit: (type, ...args) => obs.send(type, ...args),
  getSettings,
  setSetting: (key, value) => {
    return settings.set(`obs.${key}`, value);
  },
};
