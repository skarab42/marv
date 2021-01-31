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
  import RemoveWidgetModal from "./Widget/RemoveModal.svelte";
  import ContextMenu from "@/components/App/ContextMenu.svelte";
  import PanelSelectModal from "./Widget/PanelSelectModal.svelte";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";
  import MdArrowForward from "svelte-icons/md/MdArrowForward.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let panel;

  let removeWidgetModal = false;
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

  function remove(item) {
    selectedItem = item;
    removeWidgetModal = true;
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
      <MenuItem
        class="capitalize"
        icon="{MdContentCopy}"
        on:click="{duplicate.bind(null, item)}"
      >
        {_('words.duplicate')}
      </MenuItem>
      <MenuItem icon="{MdArrowForward}" on:click="{moveTo.bind(null, item)}">
        {_('sentences.move-to')}
      </MenuItem>
      <MenuItem
        class="capitalize"
        icon="{MdDeleteForever}"
        on:click="{remove.bind(null, item)}"
      >
        {_('words.remove')}
      </MenuItem>
      <Separator />
    </div>
  </ContextMenu>
</Grid>

<PanelSelectModal
  bind:opened="{panelSelectModal}"
  on:select="{onPanelSelect}"
/>

<RemoveWidgetModal
  panel="{$currentPanel}"
  widget="{selectedItem}"
  bind:opened="{removeWidgetModal}"
/>
