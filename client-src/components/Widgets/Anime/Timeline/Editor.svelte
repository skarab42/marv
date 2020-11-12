<script>
  import { setContext } from "svelte";
  import createStore from "./libs/store";

  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import ViewerItems from "./Editor/Viewer/Items.svelte";

  import createItemFromFile from "./libs/createItemFromFile";

  import animejs from "animejs/lib/anime.es.js";
  import { debounce } from "throttle-debounce";
  import getStyle from "./libs/getStyle";
  import getTrans from "./libs/getTrans";

  const store = createStore();
  setContext("Editor", store);

  const { anime, items, selectedItem, seek } = store;

  const playables = ["audio", "video"];

  function updateAnime() {
    console.log("updateAnime");
    $anime = animejs.timeline({
      autoplay: false,
      update() {
        $seek = ($anime.duration / 100) * $anime.progress;
        // let seek = (seek / pixelPerMs * $scale) + $left;
        // console.log({pos, seek});
      },
    });

    $items.forEach((item) => {
      const targets = `#item-${item.id}`;
      const trans = getTrans(item.target.trans);
      const style = getStyle(item.target.style);
      const $target = document.querySelector(targets);
      const isPlayable = playables.includes(item.target.type);

      const play = () => {
        $target.volume = item.target.attrs.volume;
        $target.currentTime = 0;
        $target.play();
      };

      const stop = () => {
        $target.pause();
        $target.currentTime = 0;
      };

      const begin = () => isPlayable && play();
      const complete = () => isPlayable && stop();

      $target.style = `${trans};${style}`;
      item.keyframes.forEach(({ delay, duration, attrs, style, trans }) => {
        const props = { ...attrs, ...style, ...trans };
        $anime.add({ targets, duration, ...props, begin, complete }, delay);
      });
    });

    $anime.seek($seek);
  }

  function resetAnime() {
    console.log("resetAnime");
    $anime = null;
  }

  const updateAnimeDebounce = debounce(1000, updateAnime);
  $: $items.length ? updateAnimeDebounce() : resetAnime();

  function addItem(item) {
    $items = [...$items, item];
    if (!$selectedItem) {
      $selectedItem = item;
    }
  }

  function addFile(file) {
    console.log({ file });
    // createItemFromFile(file)
    //   .then(addItem)
    //   .catch(error => {
    //     console.warn("addFile:", error.message, file);
    //   });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }
</script>

<Layout on:dropFiles="{onDropFiles}">
  <div slot="leftPane" class="relative h-full overflow-hidden">
    <Viewer>
      <ViewerItems />
    </Viewer>
  </div>
  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings />
  </div>
  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline />
  </div>
</Layout>
