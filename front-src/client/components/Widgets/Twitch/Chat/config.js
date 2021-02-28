export default {
  name: "TwitchChat",
  label: "twitch.chat",
  hasTrigger: false,
  hasEvent: false,
  minSize: {
    w: 3,
    h: 8,
  },
  props: {
    channel: null,
    theme: "dark",
    themes: ["dark", "light"],
  },
};
