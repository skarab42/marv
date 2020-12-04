module.exports = {
  connectOnStartup: false,
  chatWindow: {
    channel: null,
  },
  AccessToken: {
    access_token: null,
    scope: [
      "user:read:email",
      "chat:read",
      "chat:edit",
      "channel:read:redemptions",
      "channel:manage:redemptions",
    ],
  },
};
