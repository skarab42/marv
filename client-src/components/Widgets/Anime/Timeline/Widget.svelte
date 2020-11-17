<script>
  import { push, on } from "@/libs/actions";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  let running = 0;
  let clickCount = 0;

  function triggerAction() {
    push({ type: "anime", widget }).catch((error) => {
      console.log(">>>Error:", error);
      clickCount--;
      running--;
    });
  }

  on("push", (action) => {
    if (action.widget.id === widget.id) {
      clickCount++;
    }
  });

  on("start", (action) => {
    if (action.widget.id === widget.id) {
      running++;
    }
  });

  on("end", (action) => {
    if (action.widget.id === widget.id) {
      clickCount--;
      running--;
    }
  });
</script>

<WidgetWrapper
  widget="{widget}"
  on:click="{triggerAction}"
  class="cursor-pointer bg-opacity-25 bg-black hover:bg-transparent"
/>

{#if clickCount}
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
        >{clickCount}</span>
      </div>
    </div>
  </div>
{/if}
