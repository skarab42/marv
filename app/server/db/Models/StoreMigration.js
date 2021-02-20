const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const StoreMigration = sequelize.define("StoreMigration", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = StoreMigration;
