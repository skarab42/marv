"use strict";

const { Sequelize } = require("sequelize");

const commandsTable = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  usage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cooldown: {
    type: Sequelize.INTEGER,
    defaultValue: 60,
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

const settingsTable = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

const viewersTable = {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  followedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isFollowing: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  offlineFollow: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

module.exports = {
  up: async ({ context }) => {
    await context.createTable("Commands", commandsTable);
    await context.createTable("Settings", settingsTable);
    await context.createTable("Viewers", viewersTable);
  },
  down: async () => {},
};
