<script>
  import { _ } from "@/libs/i18next";
  import { currentPanel } from "@/stores/panels";

  $: widgets = $currentPanel && $currentPanel.widgets;
</script>

{#if $currentPanel && !widgets.length}
  <div class="p-4">{_('sentences.no-widgets-found')}</div>
{/if}
