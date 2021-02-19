<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  export let message;
  export let delay = 5000;
  export let type = "info";
  export let closable = true;

  const dispatch = createEventDispatcher();

  const colors = {
    info: "bg-blue-600",
    warn: "bg-orange-600",
    error: "bg-red-600",
  };

  function close() {
    message = null;
    dispatch("close");
  }

  let timeoutId = null;

  $: if (message) {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(close, delay);
  }
</script>

{#if message}
  <div in:fade out:fade class="flex {colors[type]} text-light">
    <div class="p-2 flex-auto">{message}</div>
    {#if closable}
      <div class="p-2 cursor-pointer" on:click="{close}">
        <Icon icon="{MdClose}" />
      </div>
    {/if}
  </div>
{/if}
