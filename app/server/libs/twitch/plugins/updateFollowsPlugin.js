const Viewer = require("../../../db/Models/Viewer");
const getFollows = require("../api/getFollows");

module.exports = async function updateFollowsPlugin() {
  const all = await Viewer.findAll();
  if (all.length) return;
  await getFollows();
};
