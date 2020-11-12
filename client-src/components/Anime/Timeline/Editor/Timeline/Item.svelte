<script>
  import { v4 as uuid } from "uuid";
  import { getContext } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let item;
  export let pos;

  const {
    items,
    selectedItem,
    selectedKeyframe,
    pixelPerMs
  } = getContext("Editor");

  let isDragOver = false;

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

  function onDelete(event) {
    event.stopPropagation();
    if ($selectedItem === item) {
      $selectedItem = null;
    }
    $items = $items.filter(({ id }) => id !== item.id);
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

  function getScaledDelay(delay) {
    return Math.round(delay * pixelPerMs);
  }

  function addKeyframe(props) {
    const keyframe = {
      id: uuid(),
      delay: 0,
      duration: 1000,
      ...props,
      attrs: {},
      style: {},
      trans: {}
    };
    item.keyframes = [ ...item.keyframes, keyframe ];
    selectItem(item);
    selectKeyframe(keyframe);
    $items = $items;
  }

  function onAddKeyframe({ detail }) {
    addKeyframe({ delay: getScaledDelay(detail.offset) });
  }

  function onSelectKeyframe({ detail: keyframe }) {
    selectItem(item);
    selectKeyframe(keyframe);
  }

  function onMoveKeyframe({ detail }) {
    const { keyframe, offset } = detail;
    const delay = keyframe.delay + getScaledDelay(offset);
    keyframe.delay = Math.max(0, delay);
    $selectedKeyframe = keyframe;
    $items = $items;
  }

  function onRemoveKeyframe({ detail: keyframe }) {
    item.keyframes = item.keyframes.filter(kf => kf.id !== keyframe.id);
    $selectedKeyframe = null;
    $items = $items;
  }
</script>

<div
  draggable={true}
  on:click={onSelect}
  on:dragstart={onDragStart}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
  on:drop={onDrop}
  class="relative flex pl-2 items-center space-x-2 {selected}"
>
  <AnimeIcon type={item.target.type} />
  <div class="p-2 pl-0 truncate flex-1">{item.target.filename}</div>
  <div class="p-2 cursor-pointer hover:bg-red-600" on:click={onDelete}>
    <Icon icon={MdDeleteForever} />
  </div>
  {#if isDragOver}
  <div class="absolute bg-red-600 inset-0" style="height:2px;top:auto;"></div>
  {/if}
</div>

<Keyframes on:add={onAddKeyframe} selected={isSelected}>
  {#each item.keyframes as keyframe (keyframe.id)}
  <Keyframe
    {keyframe}
    on:move={onMoveKeyframe}
    on:select={onSelectKeyframe}
    on:remove={onRemoveKeyframe} />
  {/each}
</Keyframes>
