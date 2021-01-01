const setting = require("../setting");

module.exports = {
  up: async ({ context }) => {
    await context.bulkInsert("Settings", [
      setting("command.prefix", "!", "string"),
    ]);
  },
};
