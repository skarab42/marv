const login = require("../login");
const twitch = require("../index");
const Viewer = require("../../../db/Models/Viewer");

module.exports = async function getLastFollows() {
  const user = await login();
  const followsPaginated = await twitch.api.helix.users.getFollowsPaginated({
    followedUser: user,
  });

  const newFollows = [];

  let follows = await followsPaginated.getNext();

  for (let i = 0, l = follows.length; i < l; i++) {
    const { _data } = follows[i];

    const oldFollow = await Viewer.findByPk(_data.from_id);

    if (oldFollow) break;

    const newFollow = await Viewer.create({
      id: _data.from_id,
      name: _data.from_name,
      followedAt: _data.followed_at,
      isFollowing: true,
    });

    newFollows.push(newFollow);
  }

  return newFollows;
};
