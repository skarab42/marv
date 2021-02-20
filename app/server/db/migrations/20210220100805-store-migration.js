"use strict";

const { Sequelize } = require("sequelize");

const storeMigrations = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

module.exports = {
  up: async ({ context }) => {
    await context.createTable("StoreMigrations", storeMigrations);
  },
  down: async () => {},
};
