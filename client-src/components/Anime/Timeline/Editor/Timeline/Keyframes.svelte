<script>
  import pannable from "@/libs/svelte/pannable.js";
  import { createEventDispatcher, getContext } from "svelte";

  const dispatch = createEventDispatcher();
  const { timeline } = getContext("Editor");
  const { left, scale } = timeline;

  export let selected = false;
  export let zoom = { min: 0.1, max: 10, sensitivity: 50 };

  let wrapperElement;

  function onPanMove({ detail }) {
    $left = Math.min(0, $left + detail.dx);
  }

  function onDoubleClick(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    dispatch("add", { offset: (event.clientX - x - $left) / $scale });
  }

  function onWheel(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    const delta = event.deltaY / 100;
    const tx = (event.clientX - x - $left) / $scale;
    const newScale = $scale + delta / (zoom.sensitivity / $scale);
    $scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    $left = Math.min(0, -tx * $scale + event.clientX - x);
  }

  function onContextmenu(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  $: selectedCLass = selected ? "bg-primary" : "bg-primary-darker";
</script>

<div
  style="padding-left:10px"
  class="w-full h-full {selectedCLass}"
  on:contextmenu="{onContextmenu}"
>
  <div
    bind:this="{wrapperElement}"
    use:pannable
    on:panmove="{onPanMove}"
    on:dblclick="{onDoubleClick}"
    on:wheel|preventDefault="{onWheel}"
    class="relative w-full h-full overflow-hidden"
  >
    <div
      class="absolute top-0 bottom-0 flex items-center"
      style="left:{$left}px"
    >
      <slot />
    </div>
  </div>
</div>
