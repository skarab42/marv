const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Setting = sequelize.define("Setting", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("value");
    },
    set(value) {
      this.setDataValue("value", value);
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Setting;
