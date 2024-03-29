<script>
  import {
    panels,
    currentPanel,
    selectedWidget,
    duplicateWidget,
    moveWidgetToPanel,
  } from "@/stores/panels";
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { saveAs } from "file-saver";
  import Widget from "./Widget/Button.svelte";
  import { exportWidget } from "@/libs/panels";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MdBrush from "svelte-icons/md/MdBrush.svelte";
  import RemoveModal from "./Widget/RemoveModal.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import Separator from "@/components/UI/Separator.svelte";
  import EditActionModal from "./Widget/EditActionModal.svelte";
  import EditStylesModal from "./Widget/EditStylesModal.svelte";
  import ContextMenu from "@/components/App/ContextMenu.svelte";
  import FaFileExport from "svelte-icons/fa/FaFileExport.svelte";
  import PanelSelectModal from "./Widget/PanelSelectModal.svelte";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";
  import MdArrowForward from "svelte-icons/md/MdArrowForward.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  export let panel;
  export let item;

  let editActionModal = false;
  let editStylesModal = false;
  let panelSelectModal = false;
  let removeWidgetModal = false;

  $: widget = panel.widgets.find((i) => i.id === item.id);

  async function duplicate() {
    const { widget } = await duplicateWidget({ panel, item });
    selectedWidget.set(widget);
  }

  function moveTo() {
    panelSelectModal = true;
  }

  function remove() {
    removeWidgetModal = true;
  }

  async function onPanelSelect({ detail: targetPanel }) {
    await moveWidgetToPanel({ panel, targetPanel, item });
    currentPanel.set(targetPanel);
    selectedWidget.set(widget);
  }

  function editStyles() {
    editStylesModal = true;
  }

  function editAction() {
    editActionModal = true;
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  async function exportTo() {
    const { filename, buffer } = await exportWidget(panel, widget);
    const blob = new Blob([buffer], { type: "application/zip" });
    saveAs(blob, filename);
  }
</script>

<ContextMenu>
  <Widget widget="{widget}" />
  <div slot="items" on:mousedown|stopPropagation>
    <MenuItem icon="{MdEdit}" on:click="{editAction}">
      {capitalize(_('sentences.edit-action'))}
    </MenuItem>
    <MenuItem icon="{MdBrush}" on:click="{editStyles}">
      {capitalize(_('sentences.edit-styles'))}
    </MenuItem>
    <MenuItem icon="{MdContentCopy}" on:click="{duplicate}">
      {capitalize(_('words.duplicate'))}
    </MenuItem>
    {#if $panels.length > 1}
      <MenuItem icon="{MdArrowForward}" on:click="{moveTo}">
        {capitalize(_('sentences.move-to'))}
      </MenuItem>
    {/if}
    <MenuItem icon="{FaFileExport}" on:click="{exportTo}">
      {capitalize(_('words.export'))}
    </MenuItem>
    <MenuItem icon="{MdDeleteForever}" on:click="{remove}">
      {capitalize(_('words.remove'))}
    </MenuItem>
    <Separator />
  </div>
</ContextMenu>

<EditStylesModal
  panel="{panel}"
  widget="{widget}"
  bind:opened="{editStylesModal}"
  on:mousedown="{stopPropagation}"
/>

<EditActionModal
  panel="{panel}"
  widget="{widget}"
  bind:opened="{editActionModal}"
  on:mousedown="{stopPropagation}"
/>

<PanelSelectModal
  on:select="{onPanelSelect}"
  bind:opened="{panelSelectModal}"
  on:mousedown="{stopPropagation}"
/>

<RemoveModal
  panel="{panel}"
  widget="{widget}"
  on:mousedown="{stopPropagation}"
  bind:opened="{removeWidgetModal}"
/>
