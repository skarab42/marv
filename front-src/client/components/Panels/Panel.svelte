<script>
  import api from "@/api/panels";
  import Grid from "./Panel/Grid.svelte";
  import gridHelper from "svelte-grid/src/utils/helper";
  import {
    editMode,
    panels,
    currentPanel,
    gridOptions,
    itemOptions,
  } from "@/stores/panels";

  function addWidget() {
    const cols = $gridOptions.cols;
    const grid = $currentPanel.grid;
    const item = gridHelper.item($itemOptions);
    const pos = gridHelper.findSpaceForItem(item, grid, cols);
    api.addWidget($currentPanel, { w: item.w, h: item.h, ...pos });
  }

  function invisible(p1, p2) {
    return p1.id === p2.id ? "" : "invisible";
  }

  function onDoubleClick() {
    $editMode && addWidget();
  }
</script>

<div class="relative flex flex-auto" on:dblclick="{onDoubleClick}">
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
