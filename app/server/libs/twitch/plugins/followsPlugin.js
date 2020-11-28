const getLastFollows = require("../api/getLastFollows");
const pushActions = require("../pushActions");

module.exports = async function streamStatePlugin({ delay = 2 } = {}) {
  const follows = await getLastFollows();

  follows.forEach((viewer) => {
    pushActions("follow", { user: viewer.name });
  });

  if (follows.length) {
    console.log("New follows:", follows.length);
  }

  setTimeout(streamStatePlugin, delay * 1000);
};
