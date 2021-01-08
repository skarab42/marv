<script context="module">
  let element = null;

  export function scrollTop() {
    element && element.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import { electron } from "@/stores/app";
  import { createEventDispatcher } from "svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  const dispatch = createEventDispatcher();

  export let closable = false;

  let top = electron ? 29 : 0;
  let content = "flex overflow-auto";
  let colors = "bg-black bg-opacity-75";
  let position = "absolute left-0 right-0 bottom-0 z-50";

  let cls = "";
  export { cls as class };

  let modalWrapper = document.querySelector("#modal");

  function close() {
    dispatch("close");
  }

  onMount(() => {
    modalWrapper.appendChild(element);
  });
</script>

<div
  bind:this="{element}"
  style="margin-top:{top}px;height: calc(100% - {top}px)"
  class="{colors} {content} {position}"
>
  <div class="m-auto">
    <div class="m-5 relative flex flex-col items-center {cls}">
      {#if closable}
        <div on:click="{close}" class="absolute right-0 mt-2 mr-2">
          <Icon icon="{MdClose}" class="cursor-pointer" />
        </div>
      {/if}
      <slot />
    </div>
  </div>
</div>
