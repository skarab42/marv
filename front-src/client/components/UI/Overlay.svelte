<script>
  import { electron } from "@/stores/app";
  import Portal from "svelte-portal";

  let top = electron ? 29 : 0;
  let content = "flex overflow-auto";
  export let colors = "bg-black bg-opacity-75";
  let position = "absolute left-0 right-0 bottom-0 z-50";
</script>

<Portal target="body">
  <div
    on:click
    on:mousedown
    class="{content} {colors} {position}"
    style="margin-top:{top}px;height: calc(100% - {top}px)"
  >
    <slot />
  </div>
</Portal>
