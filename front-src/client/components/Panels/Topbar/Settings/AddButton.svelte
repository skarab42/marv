<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Tippy from "@/components/UI/Tippy.svelte";
  import Button from "@/components/UI/Button.svelte";
  import gridHelper from "svelte-grid/src/utils/helper";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";
  import { currentPanel, gridOptions, itemOptions } from "@/stores/panels";

  const tippy = { placement: "bottom", showOnCreate: true };

  $: widgetsCount = $currentPanel ? $currentPanel.widgets.length : 0;
  $: addTippy = { ...tippy, content: _("sentences.click-to-add-widget") };

  function addWidget() {
    const cols = $gridOptions.cols;
    const grid = $currentPanel.grid;
    const item = gridHelper.item($itemOptions);
    const pos = gridHelper.findSpaceForItem(item, grid, cols);
    api.addWidget($currentPanel, { w: item.w, h: item.h, ...pos });
  }
</script>

<Tippy options="{addTippy}" disabled="{widgetsCount}">
  <Button padding="p-2" icon="{MdAddToPhotos}" on:click="{addWidget}">
    <span
      class="hidden md:inline md:ml-2"
    >{_('sentences.add-grid-widget')}</span>
  </Button>
</Tippy>
