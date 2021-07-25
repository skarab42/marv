import api from "../client/api/twitch";

export default {
  async getUser(name) {
    const { _data } = await api.getUser(name);
    return _data;
  },
};
