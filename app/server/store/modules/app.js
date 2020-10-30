const create = require("../create");

const defaults = {
  lang: "en",
  openOnStartup: false
};

module.exports = create({ name: "app", defaults });
