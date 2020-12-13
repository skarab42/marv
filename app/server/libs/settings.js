const Setting = require("../db/Models/Setting");

async function get(key, defaultValue = null) {
  const result = await Setting.findOne({ where: { key } });
  return result ? result.value : defaultValue;
}

function set(key, value, type = null) {
  const setting = get(key, undefined);

  if (setting === undefined) {
    return Setting.create({ key, value, type: type || "string" });
  } else {
    return Setting.update(
      { value, type: type || setting.type },
      { where: { key } }
    );
  }
}

module.exports = { get, set };
