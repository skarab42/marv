<script>
  import { push } from "@/libs/actions";
  import { store } from "@/stores/actions";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  $: action = $store[widget.id] || {};
  $: inQueue = action.inQueue || 0;
  $: running = !!action.running;

  function triggerAction() {
    push({ type: "anime", widget }).catch((error) => {
      console.log(">>>Error:", error);
    });
  }
</script>

<WidgetWrapper
  widget="{widget}"
  on:click="{triggerAction}"
  class="cursor-pointer bg-opacity-25 bg-black hover:bg-transparent"
/>

{#if inQueue}
  {#if running}
    <div class="absolute inset-0 pointer-events-none">
      <div class="h-full animate-spin opacity-50">
        <MdAutorenew />
      </div>
    </div>
  {/if}
  <div class="absolute inset-0 pointer-events-none">
    <div class="flex items-center h-full opacity-50 text-2xl">
      <div class="flex-auto text-center">
        <span
          class="{running ? '' : 'px-3 text-dark bg-gray-500 rounded-full'}"
        >{inQueue}</span>
      </div>
    </div>
  </div>
{/if}
