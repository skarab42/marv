<script>
  import pannable from "@/libs/svelte/pannable.js";

  export let splitter;

  $: gridTemplate = `grid-template-columns: ${splitter.x}px auto`;
  $: splitterStyle = `
      cursor:ew-resize;
      width:${splitter.width}px;
      left:calc(${splitter.x}px - ${splitter.width}px);
    `;

  function onSplitterPan({ detail }) {
    splitter.x = Math.max(splitter.min, Math.min(splitter.max, detail.x));
  }
</script>

<style>
.timeline-grid {
  display: grid;
}

.timeline-grid > :global(div) {
  border-right: 1px rgba(0,200,242,0.2) solid;
  border-bottom: 1px rgba(0,200,242,0.2) solid;
}

.timeline-grid :global(.bg-0) {
  background-color: rgba(0,0,0,0.1);
}

.timeline-grid :global(.bg-1) {
  background-color: rgba(0,0,0,0.2);
}
</style>

<div class="relative flex flex-col h-full overflow-hidden">
  <div class="timeline-grid whitespace-no-wrap bg-primary-dark grid" style={gridTemplate}>
    <slot name="header"></slot>
  </div>
  <div class="flex-auto overflow-x-hidden overflow-y-auto">
    <div class="timeline-grid whitespace-no-wrap" style={gridTemplate}>
      <slot />
    </div>
  </div>
  <div
    use:pannable
    on:panmove={onSplitterPan}
    on:mousedown|stopPropagation
    style={splitterStyle}
    class="absolute top-0 bottom-0 select-none"
  >
  </div>
</div>
