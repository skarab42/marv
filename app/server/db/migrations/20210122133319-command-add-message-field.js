"use strict";

const { Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context }) => {
    await context.addColumn("Commands", "message", Sequelize.STRING);
  },
};
