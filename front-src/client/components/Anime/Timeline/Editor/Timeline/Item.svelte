<script>
  import { getContext } from "svelte";
  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import ItemButtons from "./ItemButtons.svelte";
  import SortableItem from "./SortableItem.svelte";
  import ItemMenu from "@/components/UI/ItemMenu.svelte";
  import { createKeyframe } from "../../libs/createKeyframe";

  export let item;
  export let index;
  export let widget;

  const { items, selectedItem, selectedKeyframe, pixelPerMs } = getContext(
    "Editor"
  );

  $: isSelected = $selectedItem && $selectedItem.id === item.id;
  $: selected = isSelected ? "bg-blue-600 bg-opacity-50" : "bg-primary-darker";

  function selectItem(item) {
    if (!$selectedItem || $selectedItem.id !== item.id) {
      $selectedKeyframe = null;
      $selectedItem = item;
    }
  }

  function selectKeyframe(keyframe) {
    if (!$selectedKeyframe || $selectedKeyframe.id !== keyframe.id) {
      $selectedKeyframe = keyframe;
    }
  }

  function onSelect() {
    selectItem(item);
  }

  function getScaledValue(delay) {
    return Math.round(delay * pixelPerMs);
  }

  function addKeyframe(props) {
    const keyframe = createKeyframe(props);
    item.keyframes = [...item.keyframes, keyframe];
    selectItem(item);
    selectKeyframe(keyframe);
    $items = $items;
  }

  function onAddKeyframe({ detail }) {
    addKeyframe({ delay: getScaledValue(detail.offset) });
  }

  function onSelectKeyframe({ detail: keyframe }) {
    selectItem(item);
    selectKeyframe(keyframe);
  }

  function onMoveKeyframe({ detail }) {
    const { keyframe, offset } = detail;
    const delay = keyframe.delay + getScaledValue(offset);
    keyframe.delay = Math.max(0, delay);
    $selectedKeyframe = keyframe;
    $items = $items;
  }

  function onRemoveKeyframe({ detail: keyframe }) {
    item.keyframes = item.keyframes.filter((kf) => kf.id !== keyframe.id);
    $selectedKeyframe = null;
    $items = $items;
  }

  function ondurationChange({ detail }) {
    const { keyframe, offset } = detail;
    const duration = keyframe.duration + getScaledValue(offset);
    keyframe.duration = Math.max(0, duration);
    $selectedKeyframe = keyframe;
    $items = $items;
  }
</script>

<SortableItem
  index="{index}"
  on:click="{onSelect}"
  class="relative flex pl-2 items-center space-x-2 {selected}"
>
  <AnimeIcon type="{item.target.type}" />
  <div class="p-2 pl-0 truncate flex-1">{item.target.filename}</div>

  <ItemMenu>
    <ItemButtons
      on:remove
      on:duplicate
      on:fileUpdate
      on:textFileChange
      widget="{widget}"
      item="{item}"
    />
  </ItemMenu>

  <div
    slot="dragOver"
    class="absolute bg-red-600 inset-0"
    style="height:2px;top:auto;"
  ></div>
</SortableItem>

<Keyframes on:add="{onAddKeyframe}" selected="{isSelected}">
  {#each item.keyframes as keyframe (keyframe.id)}
    <Keyframe
      keyframe="{keyframe}"
      on:move="{onMoveKeyframe}"
      on:select="{onSelectKeyframe}"
      on:remove="{onRemoveKeyframe}"
      on:duration="{ondurationChange}"
    />
  {/each}
</Keyframes>
