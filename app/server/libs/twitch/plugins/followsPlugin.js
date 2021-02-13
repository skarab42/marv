const getLastFollows = require("../api/getLastFollows");
const pushActions = require("../pushActions");

module.exports = async function streamStatePlugin({ delay = 2 } = {}) {
  const follows = await getLastFollows();

  follows.forEach((viewer) => {
    pushActions("onFollow", { user: viewer.name });
  });

  setTimeout(streamStatePlugin, delay * 1000);
};
