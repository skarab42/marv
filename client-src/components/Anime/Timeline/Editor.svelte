<script>
  import createStore from "./libs/store";
  import { setContext, createEventDispatcher } from "svelte";

  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import Button from "@/components/UI/Button.svelte";
  import ViewerItems from "./Editor/Viewer/Items.svelte";

  import createAnimeFromFile from "./libs/createAnimeFromFile";

  import animejs from "animejs/lib/anime.es.js";
  import { debounce } from "throttle-debounce";
  import getStyle from "./libs/getStyle";
  import getTrans from "./libs/getTrans";

  export let initialItems = [];

  const dispatch = createEventDispatcher();

  const store = createStore();
  setContext("Editor", store);

  const { anime, items, selectedItem, seek } = store;

  const playables = ["audio", "video"];

  $items = initialItems;

  function updateAnime() {
    dispatch("update-start");

    $anime = animejs.timeline({
      autoplay: false,
      update() {
        $seek = (this.duration / 100) * this.progress;
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
    dispatch("update", { duration: $anime.duration, items: $items });
  }

  function resetAnime() {
    dispatch("reset");
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

  function addFile({ detail: file }) {
    createAnimeFromFile(file)
      .then(addItem)
      .catch((error) => {
        console.warn("addFile:", error.message, file);
      });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }

  function onClose() {
    dispatch("close");
  }
</script>

<Layout on:dropFiles="{onDropFiles}">
  <div slot="leftPane" class="relative h-full overflow-hidden shadow">
    <Viewer>
      <div slot="header" class="bg-primary">
        <Button on:click="{onClose}">back</Button>
      </div>
      <ViewerItems />
    </Viewer>
  </div>
  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings />
  </div>
  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline on:file="{addFile}" />
  </div>
</Layout>
