"use strict";

const { Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context }) => {
    await context.addColumn("Commands", "rules", Sequelize.JSON);
  },
};
