const Viewer = require("../../../db/Models/Viewer");

module.exports = async function getLastFollowers({ limit = 42 } = {}) {
  return Viewer.findAll({
    where: { isFollowing: 1 },
    order: [["followedAt", "DESC"]],
    limit,
  });
};
