<script>
  import { v4 as uuid } from "uuid";
  import cloneDeep from "clone-deep";
  import { _ } from "@/libs/i18next";
  import createStore from "./libs/store";
  import { setContext, createEventDispatcher } from "svelte";

  import Layout from "./Editor/Layout.svelte";
  import Viewer from "./Editor/Viewer.svelte";
  import Settings from "./Editor/Settings.svelte";
  import Timeline from "./Editor/Timeline.svelte";
  import Button from "@/components/UI/Button.svelte";
  import ViewerItems from "./Editor/Viewer/Items.svelte";

  import createAnimeFromFile from "./libs/createAnimeFromFile";
  import getTargetInfo from "./libs/getTargetInfo";

  import animejs from "animejs/lib/anime.es.js";
  import { debounce } from "throttle-debounce";
  import getStyle from "./libs/getStyle";
  import getTrans from "./libs/getTrans";

  export let initialItems = [];
  export let widget;

  const dispatch = createEventDispatcher();

  const store = createStore();
  setContext("Editor", store);

  const { anime, items, selectedItem, seek, paused } = store;

  const playables = ["audio", "video"];

  $: $items = initialItems;
  $: duration = $anime ? $anime.duration : 0;

  function updateAnime() {
    if ($anime && !$anime.paused) return;

    dispatch("update-start");

    paused.set(true);

    $anime = animejs.timeline({
      autoplay: false,
      begin() {
        paused.set(false);
      },
      update() {
        paused.set(false);
        $seek = (this.duration / 100) * this.progress;
      },
      complete() {
        paused.set(true);
      },
    });

    $items.forEach((item) => {
      const targets = `#item-${item.id}`;
      const trans = getTrans(item.target.trans);
      const style = getStyle(item.target.style);
      const $target = document.querySelector(targets);
      const isPlayable = playables.includes(item.target.type);

      if (!$target) return;

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
      item.keyframes.forEach(
        ({ delay, duration, easing, attrs, style, trans }) => {
          const props = { ...attrs, ...style, ...trans };
          const kf = { targets, duration, easing, ...props, begin, complete };
          $anime.add(kf, delay);
        }
      );
    });

    $anime.seek($seek);
    dispatch("update", { duration, items: $items });
  }

  function resetAnime() {
    dispatch("reset");
    $anime = null;
  }

  const updateAnimeDebounce = debounce(100, updateAnime);
  $: $items.length ? updateAnimeDebounce() : resetAnime();

  function addItem(item) {
    $items = [...$items, item];
    if (!$selectedItem) {
      $selectedItem = item;
    }
  }

  function onDuplicate({ detail: item }) {
    const clone = cloneDeep(item);
    clone.id = uuid();
    clone.keyframes = clone.keyframes.map((keyframe) => {
      return { ...keyframe, id: uuid() };
    });
    addItem(clone);
  }

  function addFile({ detail: file }) {
    createAnimeFromFile(file)
      .then(addItem)
      .catch((error) => {
        console.warn("addFile:", error.message || error, file);
      });
  }

  function onDropFiles({ detail: files }) {
    files.forEach(addFile);
  }

  function onRemove() {
    dispatch("update", { duration, items: $items });
  }

  function onClose() {
    dispatch("update", { duration, items: $items });
    dispatch("close");
  }

  async function onFileUpdate({ detail }) {
    const target = { ...detail.item.target, ...detail.file };
    target.info = await getTargetInfo(target);
    detail.item.target = target;
    $selectedItem = detail.item;
    dispatch("update", { duration, items: $items });
    $items = $items;
  }
</script>

<Layout on:dropFiles="{onDropFiles}">
  <div slot="leftPane" class="relative h-full overflow-hidden shadow">
    <Viewer widget="{widget}">
      <div slot="header" class="bg-primary">
        <Button on:click="{onClose}">{_('words.back')}</Button>
      </div>
      <ViewerItems />
    </Viewer>
  </div>
  <div slot="rightPane" class="bg-primary-darker h-full shadow overflow-auto">
    <Settings />
  </div>
  <div slot="bottomPane" class="bg-primary-dark h-full shadow">
    <Timeline
      widget="{widget}"
      on:textFileChange
      on:file="{addFile}"
      on:remove="{onRemove}"
      on:duplicate="{onDuplicate}"
      on:fileUpdate="{onFileUpdate}"
    />
  </div>
</Layout>
