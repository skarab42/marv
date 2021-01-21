<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import gridHelper from "svelte-grid/src/utils/helper";
  import { currentPanel, gridOptions, itemOptions } from "@/stores/panels";

  function addWidget() {
    const cols = $gridOptions.cols;
    const grid = $currentPanel.grid;
    const item = gridHelper.item($itemOptions);
    const pos = gridHelper.findSpaceForItem(item, grid, cols);
    api.addWidget($currentPanel, { w: item.w, h: item.h, ...pos });
  }
</script>

{#if $currentPanel}
  <MenuItem icon="{MdAdd}" on:click="{addWidget}">
    {_('sentences.add-grid-widget')}
  </MenuItem>
{/if}
