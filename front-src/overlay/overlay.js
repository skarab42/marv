import createElementFromTarget from "@/components/Anime/Timeline/libs/createElementFromTarget";
import getStyle from "@/components/Anime/Timeline/libs/getStyle";
import getTrans from "@/components/Anime/Timeline/libs/getTrans";
import { loadUsedFonts, loadFont } from "../libs/fonts";
import { on } from "./libs/socket.io";
import animejs from "animejs";
import ejs from "../libs/ejs";
import api from "../libs/api";

(async () => await loadUsedFonts(false))();

const playables = ["audio", "video"];
const $main = document.querySelector("main");

function runAnime(action, cb) {
  const $anime = document.createElement("div");

  const timeline = animejs.timeline({
    autoplay: false,
    complete() {
      $anime.remove();
      cb({ success: true, action });
    },
  });

  const promises = [];

  action.data.forEach((item) => {
    promises.push(
      createElementFromTarget(item.target).then(async (element) => {
        const style = getStyle(item.target.style);
        const trans = getTrans(item.target.trans);

        element.setAttribute("id", `item-${item.id}`);
        element.setAttribute("style", `${style};${trans}`);

        Object.entries(item.target.attrs).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });

        element.style.position = "absolute";

        const targets = element;
        const isPlayable = playables.includes(item.target.type);

        const play = () => {
          element.volume = item.target.attrs.volume;
          element.currentTime = 0;
          element.play();
        };

        const stop = () => {
          element.pause();
          element.currentTime = 0;
        };

        const begin = () => isPlayable && play();
        const complete = () => isPlayable && stop();

        item.keyframes.forEach(
          ({ delay, duration, easing, attrs, style, trans }) => {
            const props = { ...attrs, ...style, ...trans, easing };
            const kf = { targets, duration, ...props, begin, complete };
            timeline.add(kf, delay);
          }
        );

        if (element.innerText !== "") {
          Object.entries(action.eventProps).forEach(([key, val]) => {
            const regexp = new RegExp(`\\$${key}`, "g");
            element.innerText = element.innerText.replace(regexp, val);
          });
          element.innerHTML = await ejs.render(
            element.innerText,
            { ...action.eventProps, api },
            {
              async: true,
            }
          );
        }

        return element;
      })
    );
  });

  Promise.all(promises)
    .then((elements) => {
      elements.forEach((element) => {
        $anime.appendChild(element);
      });
      $main.appendChild($anime);
      timeline.play();
    })
    .catch((error) => {
      cb({ error: error.stack, action });
      $anime.remove();
    });
}

on("actions.start", (action, cb) => {
  if (action.type === "anime") {
    runAnime(action, cb);
  }
});

on("loadFont", (url) => loadFont(url, false));
