<script>
  import { store } from "@/stores/actions";
  import Label from "./WidgetLabel.svelte";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";

  export let widget;

  export let cls = "";
  export { cls as class };

  $: action = $store[widget.id] || {};
  $: inQueue = action.inQueue || 0;
  $: running = !!action.running;
</script>

<div
  on:click
  class="relative h-full {widget.borders} flex flex-col overflow-hidden {cls}"
>
  <Label widget="{widget}" />
  <div class="relative flex-auto">
    <slot />
  </div>
  <slot name="overlay" />
</div>

{#if inQueue}
  <div class="absolute inset-0 pointer-events-none">
    {#if running}
      <div class="flex w-full h-full opacity-50 animate-spin">
        <MdAutorenew />
      </div>
    {/if}
    <div class="absolute inset-0 flex items-center h-full opacity-50 text-4xl">
      <div class="flex-auto text-center">
        <span
          class="{running ? '' : 'px-3 text-dark bg-gray-500 rounded-full'}"
        >{inQueue}</span>
      </div>
    </div>
  </div>
{/if}
