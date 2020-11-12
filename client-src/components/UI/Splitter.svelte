<script>
  import pannable from "@/libs/svelte/pannable";

  export let flex = "row";
  export let min = 10;
  export let max = 90;
  export let sizes = [25, 75];
  export let splitterSize = 4;
  export let save = false;

  export let cls = "";
  export { cls as class };

  let panning = false;
  let container = null;

  let [aSize, bSize] = sizes;

  if (save) {
    const store = localStorage.getItem(`splitter.${save}`);
    if (store) {
      [aSize, bSize] = JSON.parse(store);
    }
  }

  let dimension = flex === "row" ? "width" : "height";
  let position = flex === "row" ? "left" : "top";

  let splitterPos = flex === "row" ? "top-0 bottom-0" : "left-0 right-0";
  let splitterCursor = flex === "row" ? "ew-resize" : "ns-resize";
  let splitterClass = `absolute z-10 ${splitterPos}`;

  $: splitterStyle = `${position}:calc(${aSize}% - ${
    splitterSize / 2
  }px); ${dimension}:${splitterSize}px; cursor:${splitterCursor};opacity:0;`;

  function onPanStart() {
    panning = true;
  }

  function onPanMove({ detail }) {
    const { top, bottom, left, right } = container.getBoundingClientRect();
    const w = right - left;
    const h = bottom - top;
    const x = detail.x - left;
    const y = detail.y - top;
    const pos = flex === "row" ? x : y;
    const len = flex === "row" ? w : h;
    aSize = Math.max(min, Math.min(max, (pos / len) * 100));
    bSize = 100 - aSize;
    if (save) {
      localStorage.setItem(`splitter.${save}`, JSON.stringify([aSize, bSize]));
    }
  }

  function onPanEnd() {
    panning = false;
  }
</script>

<div
  on:drop
  on:dragover
  bind:this="{container}"
  class="relative flex flex-{flex} w-full h-full overflow-auto {cls}"
>
  <div style="{dimension}:{aSize}%">
    <slot name="a" />
  </div>
  <div
    use:pannable
    on:panstart="{onPanStart}"
    on:panmove="{onPanMove}"
    on:panend="{onPanEnd}"
    style="{splitterStyle}"
    class="{splitterClass}"
  ></div>
  <div style="{dimension}:{bSize}%">
    <slot name="b" />
  </div>
  <slot />
</div>
