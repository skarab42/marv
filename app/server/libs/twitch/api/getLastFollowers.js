const Viewer = require("../../../db/Models/Viewer");
const { Op } = require("sequelize");
const twitch = require("../index");
const login = require("../login");

module.exports = async function getLastFollowers() {
  const user = await login();
  const stream = await twitch.api.helix.streams.getStreamByUserName(user);
  const startDate = stream ? new Date(stream._data["started_at"]) : new Date();

  return Viewer.findAll({
    where: {
      [Op.or]: {
        offlineFollow: true,
        followedAt: {
          [Op.gte]: startDate,
        },
      },
    },
  });
};
