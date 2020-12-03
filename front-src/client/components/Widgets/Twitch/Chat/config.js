export default {
  name: "TwitchChat",
  label: "twitch.chat",
  hasTrigger: false,
  hasEvent: false,
  props: {
    channel: null,
    theme: "dark",
    themes: ["dark", "light"],
  },
};
