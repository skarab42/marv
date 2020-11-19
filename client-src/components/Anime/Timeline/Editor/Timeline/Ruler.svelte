<script>
  import { getContext } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";

  export let zoom = { min: 0.1, max: 10, sensitivity: 50 };

  const { anime, pixelPerMs, timeline } = getContext("Editor");
  const { left, scale } = timeline;

  let unit = 1000 / pixelPerMs;
  let wrapperElement;

  $: duration = $anime ? $anime.duration : 0;
  $: units = duration ? Array(Math.ceil(duration / 1000)) : [];

  function onPanMove({ detail }) {
    $left = Math.min(0, $left + detail.dx);
  }

  function onWheel(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    const delta = event.deltaY / 100;
    const tx = (event.clientX - x - $left) / $scale;
    const newScale = $scale + delta / (zoom.sensitivity / $scale);
    $scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    $left = Math.min(0, -tx * $scale + event.clientX - x);
  }
</script>

<div
  use:pannable
  class="h-full"
  on:panmove="{onPanMove}"
  style="padding-left:10px"
  bind:this="{wrapperElement}"
  on:wheel|preventDefault="{onWheel}"
>
  <div class="relative flex h-full overflow-hidden">
    <div class="absolute flex h-full" style="left:{$left}px;">
      {#each units as _, i}
        <div
          class="relative flex border-right border-blue-500 h-full"
          style="width:{unit * $scale}px; border-right:1px solid rgba(0,0,0,0.3);"
        >
          {#each Array(10) as _, y}
            <div
              class="flex-auto border-right border-blue-500"
              style="height:10px;border-right:{y < 9 ? 1 : 0}px solid rgba(0,0,0,0.1);"
            ></div>
          {/each}
          <span class="absolute bottom-0 right-0 px-2 opacity-50">{i + 1}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
