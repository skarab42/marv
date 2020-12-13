const Setting = require("../db/Models/Setting");
const { Op } = require("sequelize");

async function get(key, defaultValue = null) {
  const result = await Setting.findOne({ where: { key } });
  return result ? result.value : defaultValue;
}

async function set(key, value, type) {
  const setting = await Setting.findOne({ where: { key } });

  if (!setting) {
    return Setting.create({ key, value, type: type || "string" });
  } else {
    setting.value = value;
    return setting.save();
  }
}

async function getAll(key = null) {
  const settings = {};
  const attributes = ["key", "value", "type"];
  const where = key ? { key: { [Op.startsWith]: key } } : undefined;
  const results = await Setting.findAll({ attributes, where });

  results.forEach((setting) => {
    settings[key ? setting.key.slice(key.length) : setting.key] = setting.value;
  });

  return settings;
}

module.exports = { get, set, getAll };
