<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Button from "@/components/UI/Button.svelte";
  import gridHelper from "svelte-grid/src/utils/helper";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";
  import { currentPanel, gridOptions, itemOptions } from "@/stores/panels";

  function addWidget() {
    const cols = $gridOptions.cols;
    const grid = $currentPanel.grid;
    const item = gridHelper.item($itemOptions);
    const pos = gridHelper.findSpaceForItem(item, grid, cols);
    api.addWidget($currentPanel, { w: item.w, h: item.h, ...pos });
  }
</script>

<Button padding="p-2" icon="{MdAddToPhotos}" on:click="{addWidget}">
  <span class="hidden md:inline md:ml-2">{_('sentences.add-grid-widget')}</span>
</Button>
