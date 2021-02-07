const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Command = sequelize.define("Command", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  usage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cooldown: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Command;
