<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let enabled = false;

  $: color = enabled ? "bg-green-500" : "bg-red-500";
  $: position = enabled ? "right-0" : "left-0";

  function onClick() {
    enabled = !enabled;
    dispatch("change", enabled);
  }
</script>

<div
  on:click="{onClick}"
  class="relative h-4 flex items-center rounded cursor-pointer"
>
  <div class="w-6 h-2 bg-gray-500 bg-opacity-75 rounded-full"></div>
  <div
    class="absolute top-0 {position} w-4 h-4 {color} rounded-full shadow"
  ></div>
</div>
