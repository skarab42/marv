<script>
  import pannable from "@/libs/svelte/pannable.js";

  import { onMount, getContext } from "svelte";
  const { anime, timeline, pixelPerMs } = getContext("Editor");

  let { left, scale } = timeline;

  export let min = 0;
  export let size = 2;
  export let margin = 10;

  let time = 0;
  let position = 0;
  let cursorElement;
  let max = Infinity;

  $: offset = min + margin;
  $: x = offset + position;
  $: cursorElement && min && getMaxWidth();

  onMount(() => {
    window.addEventListener("resize", getMaxWidth);
  });

  function setPosition(pos) {
    position = Math.max(0, Math.min(max, pos));
  }

  function getMaxWidth() {
    const { width } = cursorElement.parentElement.getBoundingClientRect();
    max = width - offset - size - margin;
    seekPosition(position);
  }

  function setTimeFromPosition(pos) {
    setPosition(pos);
    time = ((position - $left) * pixelPerMs) / $scale;
  }

  function seekPosition(pos) {
    setTimeFromPosition(pos);
    $anime && $anime.seek(time);
  }

  function onCursorPan({ detail }) {
    seekPosition(position + detail.dx);
  }
</script>

<div
  bind:this="{cursorElement}"
  use:pannable
  on:panmove="{onCursorPan}"
  on:mousedown|stopPropagation
  class="absolute z-50 top-0 bottom-0 bg-red-500"
  style="width:{size}px;left:{x}px;cursor:ew-resize;"
></div>
