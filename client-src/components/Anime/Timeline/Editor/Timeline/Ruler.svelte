<script>
  import { getContext } from "svelte";

  const { anime, pixelPerMs, timeline } = getContext("Editor");
  const { left, scale } = timeline;

  let unit = 1000 / pixelPerMs;

  $: duration = $anime ? $anime.duration : 0;
  $: units = duration ? Array(Math.ceil(duration / 1000)) : [];
</script>

<div class="h-full" style="padding-left:10px">
  <div class="relative flex h-full overflow-hidden">
    <div class="absolute flex h-full" style="left:{$left}px;">
      {#each units as _, i}
        <div
          class="relative border-right border-blue-500 h-full"
          style="width:{unit * $scale}px; border-right:1px solid rgba(0,0,0,0.3);"
        >
          <span class="absolute bottom-0 right-0 px-2 opacity-50">{i + 1}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
