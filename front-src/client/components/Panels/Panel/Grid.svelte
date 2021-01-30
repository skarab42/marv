<script>
  import {
    gridOptions,
    currentPanel,
    duplicateWidget,
    moveWidgetToPanel,
  } from "@/stores/panels";
  import Grid from "svelte-grid";
  import { _ } from "@/libs/i18next";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import Separator from "@/components/UI/Separator.svelte";
  import ContextMenu from "@/components/App/ContextMenu.svelte";
  import PanelSelectModal from "./Widget/PanelSelectModal.svelte";

  export let panel;

  let panelSelectModal = false;
  let selectedItem = null;

  function onChange() {
    update(panel);
  }

  async function duplicate(item) {
    await duplicateWidget({ panel, item });
  }

  async function moveTo(item) {
    panelSelectModal = true;
    selectedItem = item;
  }

  async function onPanelSelect({ detail: targetPanel }) {
    await moveWidgetToPanel({ panel, targetPanel, item: selectedItem });
    $currentPanel = targetPanel;
  }
</script>

<style>
  :global(.svlt-grid-shadow) {
    background: black;
    opacity: 0.2;
  }
</style>

<Grid
  let:item
  {...$gridOptions}
  on:adjust="{onChange}"
  bind:items="{panel.grid}"
>
  <ContextMenu>
    <Widget item="{item}" panel="{panel}" />
    <div slot="items">
      <MenuItem on:click="{duplicate.bind(null, item)}" class="capitalize">
        {_('words.duplicate')}
      </MenuItem>
      <MenuItem on:click="{moveTo.bind(null, item)}">
        {_('sentences.move-to')}
      </MenuItem>
      <Separator />
    </div>
  </ContextMenu>
</Grid>

<PanelSelectModal
  bind:opened="{panelSelectModal}"
  on:select="{onPanelSelect}"
/>
