<script>
  import { _ } from "@/libs/i18next";
  import { panels, currentPanel } from "@/stores/panels";

  function invisible(p1, p2) {
    return p1.id === p2.id ? "" : "invisible";
  }
</script>

<div class="relative">
  {#each $panels as panel}
    <div class="absolute p-1 inset-0 {invisible($currentPanel, panel)}">
      {#each panel.widgets as widget}
        <div class="m-2 p-2 rounded bg-gray-500">{widget.id}</div>
      {:else}
        <div class="p-4">{_('sentences.no-widgets-found')}</div>
      {/each}
    </div>
  {/each}
</div>
