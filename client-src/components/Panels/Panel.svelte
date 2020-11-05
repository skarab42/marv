<script>
  import { _ } from "@/libs/i18next";
  import Grid from "./Panel/Grid.svelte";
  import { panels, currentPanel } from "@/stores/panels";

  function invisible(p1, p2) {
    return p1.id === p2.id ? "" : "invisible";
  }
</script>

<div class="relative flex flex-auto">
  {#each $panels as panel}
    <div class="absolute inset-0 p-1 {invisible($currentPanel, panel)}">
      {#if panel.grid.length}
        <div data-simplebar class="h-full overflow-x-hidden">
          <Grid panel="{panel}" />
        </div>
      {:else}
        <div class="p-4">{_('sentences.no-widgets-found')}</div>
      {/if}
    </div>
  {/each}
</div>
