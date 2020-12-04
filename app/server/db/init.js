module.exports = async function init() {
  const sequelize = require("./index");

  require("./Models/Viewer");
  require("./Models/Command");

  await sequelize.sync({ alter: true });
};
