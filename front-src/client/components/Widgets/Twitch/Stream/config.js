export default {
  name: "TwitchStream",
  label: "twitch.stream",
  hasTrigger: false,
  hasEvent: false,
  minSize: {
    w: 3,
    h: 4,
  },
  props: {
    channel: null,
    autoplay: true,
    muted: true,
  },
};
