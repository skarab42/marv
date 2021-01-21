<script>
  import { currentPanel } from "@/stores/panels";
  import { _ } from "@/libs/i18next";

  $: hasWidgets = $currentPanel && $currentPanel.widgets.length;
</script>

{#if !hasWidgets}
  <div class="absolute inset-0 flex">
    <div class="p-5 m-auto text-center text-gray-800 text-6xl">
      <div>{_('sentences.right-click-to-show-menu')}</div>
    </div>
  </div>
{/if}
