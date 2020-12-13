"use strict";

const scope = [
  "user:read:email",
  "chat:read",
  "chat:edit",
  "channel:read:redemptions",
  "channel:manage:redemptions",
];

function setting(key, value, type) {
  const now = new Date();
  return { key, value, type, createdAt: now, updatedAt: now };
}

module.exports = {
  up: async ({ context }) => {
    await context.bulkInsert("Settings", [
      setting("app.language", "en", "string"),
      setting("app.openOnStartup", "true", "boolean"),
      setting("app.showFirstStartInfo", "true", "boolean"),
      setting("app.checkUpdateAtStartup", "true", "boolean"),

      setting("server.host", "localhost", "string"),
      setting("server.port", "4242", "integer"),

      setting("obs.host", "localhost", "string"),
      setting("obs.port", "4444", "integer"),
      setting("obs.password", "", "string"),
      setting("obs.connectOnStartup", "false", "boolean"),

      setting("twitch.connectOnStartup", "false", "boolean"),
      setting("twitch.currentChannel", "", "string"),
      setting("twitch.accessToken", "", "string"),
      setting("twitch.scope", JSON.stringify(scope), "json"),
    ]);
  },

  down: async () => {},
};
