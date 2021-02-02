<script>
  import {
    panels,
    currentPanel,
    duplicateWidget,
    moveWidgetToPanel,
  } from "@/stores/panels";
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import { contextKey } from "./store";
  import Widget from "./Widget/Button.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MdBrush from "svelte-icons/md/MdBrush.svelte";
  import RemoveModal from "./Widget/RemoveModal.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import Separator from "@/components/UI/Separator.svelte";
  import EditActionModal from "./Widget/EditActionModal.svelte";
  import EditStylesModal from "./Widget/EditStylesModal.svelte";
  import ContextMenu from "@/components/App/ContextMenu.svelte";
  import PanelSelectModal from "./Widget/PanelSelectModal.svelte";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";
  import MdArrowForward from "svelte-icons/md/MdArrowForward.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  const { selectedWidget } = getContext(contextKey);

  export let panel;
  export let item;

  let editActionModal = false;
  let editStylesModal = false;
  let panelSelectModal = false;
  let removeWidgetModal = false;

  $: widget = panel.widgets.find((i) => i.id === item.id);

  async function duplicate() {
    const { widget } = await duplicateWidget({ panel, item });
    $selectedWidget = widget;
  }

  function moveTo() {
    panelSelectModal = true;
  }

  function remove() {
    removeWidgetModal = true;
  }

  async function onPanelSelect({ detail: targetPanel }) {
    await moveWidgetToPanel({ panel, targetPanel, item });
    $currentPanel = targetPanel;
    $selectedWidget = widget;
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
</script>

<ContextMenu>
  <Widget widget="{widget}" />
  <div slot="items" on:mousedown|stopPropagation>
    <MenuItem class="capitalize" icon="{MdEdit}" on:click="{editAction}">
      {_('sentences.edit-action')}
    </MenuItem>
    <MenuItem class="capitalize" icon="{MdBrush}" on:click="{editStyles}">
      {_('sentences.edit-styles')}
    </MenuItem>
    <MenuItem class="capitalize" icon="{MdContentCopy}" on:click="{duplicate}">
      {_('words.duplicate')}
    </MenuItem>
    {#if $panels.length > 1}
      <MenuItem icon="{MdArrowForward}" on:click="{moveTo}">
        {_('sentences.move-to')}
      </MenuItem>
    {/if}
    <MenuItem class="capitalize" icon="{MdDeleteForever}" on:click="{remove}">
      {_('words.remove')}
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
