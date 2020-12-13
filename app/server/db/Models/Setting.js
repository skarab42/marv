const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const getters = {
  string: (value) => `${value}`,
  integer: (value) => parseInt(value),
  float: (value) => parseFloat(value),
  json: (value) => (value ? JSON.parse(value) : null),
  boolean: (value) => (value === "true" ? true : false),
};

const setters = {
  string: (value) => `${value}`,
  integer: (value) => `${value}`,
  float: (value) => `${value}`,
  json: (value) => (value ? JSON.stringify(value) : null),
  boolean: (value) => (value ? "true" : "false"),
};

const Setting = sequelize.define("Setting", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const getter = getters[this.type] || getters.string;
      return getter(this.getDataValue("value"));
    },
    set(value) {
      const setter = setters[this.type] || setters.string;
      this.setDataValue("value", setter(value));
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Setting;
