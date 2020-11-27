const getFollows = require("../api/getFollows");

module.exports = async function updateFollowPlugin() {
  const { oldFollows, newFollows } = await getFollows();
  const follows = [...oldFollows, ...newFollows];

  console.log("Total follows:", follows.length);
  console.log("New follows:", newFollows.length);
};
