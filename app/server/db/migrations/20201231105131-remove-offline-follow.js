"use strict";

module.exports = {
  up: async ({ context }) => {
    await context.removeColumn("Viewers", "offlineFollow");
  },
};
