<script>
  import { onMount } from "svelte";
  import { electron } from "@/stores/app";

  let element = null;
  let top = electron ? 29 : 0;
  let modalWrapper = document.querySelector("#modal");

  onMount(() => {
    modalWrapper.appendChild(element);
  });
</script>

<div
  bind:this="{element}"
  class="absolute inset-0 z-50"
  style="margin-top:{top}px;height: calc(100% - {top}px)"
>
  <slot />
</div>
