<script>
  import { onMount } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";

  import { getContext } from "svelte";
  const { anime, seek, pixelPerMs } = getContext("Editor");

  export let size = 2;
  export let min = 0;
  export let margin = 10;

  let max = Infinity;

  let cursorElement;

  $: console.log($seek);

  $: left = min + margin + $seek;
  $: cursorElement && min && getMax();

  onMount(() => {
    window.addEventListener("resize", getMax);
  });

  function _seek(time) {
    let pos = Math.max(0, Math.min(max, time));
    pos = $seek / pixelPerMs;
    $anime && $anime.seek(pos);
  }

  function getMax() {
    const { width } = cursorElement.parentElement.getBoundingClientRect();
    max = width - min - margin - size;
    setTimeout(() => _seek($seek), 42);
  }

  function onCursorPan({ detail }) {
    _seek($seek + detail.dx);
  }
</script>

<div
  bind:this="{cursorElement}"
  use:pannable
  on:panmove="{onCursorPan}"
  on:mousedown|stopPropagation
  class="absolute z-50 top-0 bottom-0 bg-red-500"
  style="width:{size}px;left:{left}px;cursor:ew-resize;"
></div>
