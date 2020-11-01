const config = require("../../main/config");

module.exports = (/* socket */) => {
  return {
    load: () => config
  };
};
