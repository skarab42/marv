import * as TwitchCommands from "./Twitch/Commands";
import * as AnimeTimeline from "./Anime/Timeline";

import * as SceneList from "./OBS/SceneList";
import * as GoToScene from "./OBS/GoToScene";
import * as ToggleScene from "./OBS/ToggleScene";
import * as ToggleAudio from "./OBS/ToggleAudio";

import * as TwitchChat from "./Twitch/Chat";
import * as TwitchStream from "./Twitch/Stream";
import * as TwitchRewards from "./Twitch/Rewards";
import * as TwitchFollowers from "./Twitch/Followers";

const widgets = {
  AnimeTimeline,
  TwitchCommands,
  SceneList,
  GoToScene,
  ToggleScene,
  ToggleAudio,
  TwitchChat,
  TwitchStream,
  TwitchRewards,
  TwitchFollowers,
};

export default widgets;
