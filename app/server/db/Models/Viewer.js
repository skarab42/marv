const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Viewer = sequelize.define("Viewer", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  followedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isFollowing: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Viewer;

Viewer.sync({ alter: true }); // TODO: remove for prod
