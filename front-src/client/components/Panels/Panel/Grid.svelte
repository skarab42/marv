<script>
  import {
    editMode,
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

  function select(item) {
    selectedItem = $editMode && item;
  }

  function unselect() {
    selectedItem = null;
  }

  async function duplicate() {
    await duplicateWidget({ panel, item: selectedItem });
  }

  async function moveTo() {
    panelSelectModal = true;
  }

  async function onPanelSelect({ detail: targetPanel }) {
    await moveWidgetToPanel({ panel, targetPanel, item: selectedItem });
    $currentPanel = targetPanel;
  }

  function remove() {
    removeWidgetModal = true;
  }

  $: if (!$editMode || (!panelSelectModal && !removeWidgetModal)) unselect();
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
  <ContextMenu on:open="{select.bind(null, item)}">
    <Widget bind:selectedItem item="{item}" panel="{panel}" />
    <div slot="items">
      <MenuItem
        class="capitalize"
        icon="{MdContentCopy}"
        on:click="{duplicate}"
      >
        {_('words.duplicate')}
      </MenuItem>
      <MenuItem icon="{MdArrowForward}" on:click="{moveTo}">
        {_('sentences.move-to')}
      </MenuItem>
      <MenuItem class="capitalize" icon="{MdDeleteForever}" on:click="{remove}">
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
