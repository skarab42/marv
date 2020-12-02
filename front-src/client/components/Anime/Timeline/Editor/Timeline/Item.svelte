<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { createKeyframe } from "../../libs/createKeyframe";

  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import TextEditor from "./TextEditor.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;
  export let pos;

  const { items, selectedItem, selectedKeyframe, pixelPerMs } = getContext(
    "Editor"
  );

  const dispatch = createEventDispatcher();

  let isDragOver = false;
  let showTextEditor = false;

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

  function onDragStart({ dataTransfer }) {
    dataTransfer.setData("from", pos);
  }

  function onDragOver() {
    isDragOver = true;
  }

  function onDragLeave() {
    isDragOver = false;
  }

  function moveItem({ from, to }) {
    if (from === to) return;
    $items.splice(to, 0, $items.splice(from, 1)[0]);
    $items = $items;
  }

  function onDrop({ dataTransfer }) {
    moveItem({ from: parseInt(dataTransfer.getData("from")), to: pos });
    isDragOver = false;
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

  function openTextEditor(item) {
    selectItem(item);
    showTextEditor = true;
  }

  function closeTextEditor() {
    showTextEditor = false;
  }
</script>

<div
  draggable="{true}"
  on:click="{onSelect}"
  on:dragstart="{onDragStart}"
  on:dragover="{onDragOver}"
  on:dragleave="{onDragLeave}"
  on:drop="{onDrop}"
  class="relative flex pl-2 items-center space-x-2 {selected}"
>
  <AnimeIcon type="{item.target.type}" />
  <div class="p-2 pl-0 truncate flex-1">{item.target.filename}</div>
  {#if item.target.type === 'text'}
    <div
      class="p-2 cursor-pointer hover:bg-red-600"
      on:click="{openTextEditor.bind(null, item)}"
    >
      <Icon icon="{MdEdit}" />
    </div>
  {/if}
  <div class="p-2 cursor-pointer hover:bg-red-600" on:click="{onRemove}">
    <Icon icon="{MdDeleteForever}" />
  </div>
  {#if isDragOver}
    <div class="absolute bg-red-600 inset-0" style="height:2px;top:auto;"></div>
  {/if}
</div>

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

{#if showTextEditor}
  <TextEditor
    item="{$selectedItem}"
    on:close="{closeTextEditor}"
    on:textFileChange
  />
{/if}
