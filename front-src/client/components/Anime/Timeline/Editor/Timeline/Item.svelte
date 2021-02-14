<script>
  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import SortableItem from "./SortableItem.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import TextEditorModal from "./TextEditorModal.svelte";
  import { getContext, createEventDispatcher } from "svelte";
  import { createKeyframe } from "../../libs/createKeyframe";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;
  export let index;
  export let widget;

  const { items, selectedItem, selectedKeyframe, pixelPerMs } = getContext(
    "Editor"
  );

  const dispatch = createEventDispatcher();

  let showTextEditorModal = false;

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

  function onRemove(event) {
    event.stopPropagation();
    if ($selectedItem === item) {
      $selectedItem = null;
    }
    $items = $items.filter(({ id }) => id !== item.id);
    dispatch("remove", item);
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

  function openTextEditorModal(item) {
    selectItem(item);
    showTextEditorModal = true;
  }

  function closeTextEditorModal() {
    showTextEditorModal = false;
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
  {#if item.target.type === 'text'}
    <div
      class="p-2 cursor-pointer hover:bg-secondary"
      on:click="{openTextEditorModal.bind(null, item)}"
    >
      <Icon icon="{MdEdit}" />
    </div>
  {/if}
  <div class="p-2 cursor-pointer hover:bg-red-600" on:click="{onRemove}">
    <Icon icon="{MdDeleteForever}" />
  </div>
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

<TextEditorModal
  widget="{widget}"
  item="{$selectedItem}"
  bind:opened="{showTextEditorModal}"
  on:close="{closeTextEditorModal}"
  on:textFileChange
/>
