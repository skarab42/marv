<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import WidgetLayout from "@/components/Panels/Panel/WidgetLayout.svelte";

  export let cls = "";
  export { cls as class };

  $: hidden = $state.connected ? "hidden" : "";
  $: disabled = $state.connected ? "" : "pointer-events-none";
</script>

<WidgetLayout {...$$props} on:click class="{disabled} {cls}">
  <div class="relative h-full">
    <slot />
  </div>
  <div slot="overlay" class="{hidden} absolute inset-0 bg-black bg-opacity-75">
    <div class="flex justify-center items-center h-full">
      <div
        class="p-auto transform -rotate-45 p-2 bg-red-600 opacity-75 rounded shadow"
      >
        <div class="text-center select-none">
          {_('sentences.obs-not-connected')}
        </div>
      </div>
    </div>
  </div>
</WidgetLayout>
