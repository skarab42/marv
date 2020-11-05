<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import Icon from "./Icon.svelte";

  const dispatch = createEventDispatcher();

  export let closable = false;

  let element = null;

  let colors = "bg-black bg-opacity-75";
  let content = "flex h-screen overflow-auto";
  let position = "absolute left-0 right-0 bottom-0 z-50";

  let cls = "";
  export { cls as class };

  function close() {
    dispatch("close");
  }

  onMount(() => {
    document.body.append(element);
  });
</script>

<div
  bind:this="{element}"
  on:click|stopPropagation
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
