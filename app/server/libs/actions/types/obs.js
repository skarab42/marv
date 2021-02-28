const createAction = require("../create");
const obs = require("../../obs");

function create(action) {
  return createAction(action);
}

const actions = {
  ToggleAudio(action) {
    const { source } = action.widget.component.props;

    return obs.send("ToggleMute", { source });
  },
  ToggleScene(action) {
    const { currentScene } = obs.getState();
    const { scene1, scene2 } = action.widget.component.props;
    const scene = currentScene === scene1 ? scene2 : scene1;

    return obs.send("SetCurrentScene", { "scene-name": scene });
  },
  GoToScene(action) {
    const { scene } = action.widget.component.props;
    return obs.send("SetCurrentScene", { "scene-name": scene });
  },
  SceneList(action) {
    const { scene } = action.data || action.eventProps || "undefined";
    return obs.send("SetCurrentScene", { "scene-name": scene });
  },
  Send(action) {
    return obs.send(action.data.eventName, action.data.args);
  },
};

function send(action) {
  const func = actions[action.widget.component.name] || actions.Send;
  return func(action);
}

module.exports = { create, send };
