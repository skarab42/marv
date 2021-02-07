<script>
  import Grid from "./Panel/Grid.svelte";
  import EditMessage from "./EditMessage.svelte";
  import { panels, editMode, addWidget, currentPanel } from "@/stores/panels";

  function invisible(p1, p2) {
    return p1.id === p2.id ? "" : "invisible";
  }

  function onDoubleClick() {
    $currentPanel && $editMode && addWidget();
  }
</script>

<div class="relative flex flex-auto" on:dblclick="{onDoubleClick}">
  <EditMessage />
  {#each $panels as panel}
    <div class="absolute inset-0 p-1 {invisible($currentPanel, panel)}">
      {#if panel.grid.length}
        <div class="h-full overflow-x-hidden">
          <Grid panel="{panel}" />
        </div>
      {/if}
    </div>
  {/each}
</div>
