const twitch = require("../index");
const Viewer = require("../../../db/Models/Viewer");

module.exports = async function getFollows({ delay = 2 } = {}) {
  const user = await twitch.api.helix.users.getMe(true);
  const followsPaginated = await twitch.api.helix.users.getFollowsPaginated({
    followedUser: user,
  });

  const oldFollows = [];
  const newFollows = [];

  return new Promise((resolve) => {
    const getNext = async () => {
      let follows = await followsPaginated.getNext();

      if (!follows.length) {
        return resolve({ oldFollows, newFollows });
      }

      for (let i = 0, l = follows.length; i < l; i++) {
        const { _data } = follows[i];

        const oldFollow = await Viewer.findByPk(_data.from_id);

        if (oldFollow) {
          oldFollows.push(oldFollow);
        } else {
          const newFollow = await Viewer.create({
            id: _data.from_id,
            name: _data.from_name,
            followedAt: _data.followed_at,
            isFollowing: true,
          });

          newFollows.push(newFollow);
        }
      }

      setTimeout(getNext, delay * 1000);
    };

    getNext();
  });
};
