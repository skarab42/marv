<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MdDone from "svelte-icons/md/MdDone.svelte";
  import Button from "@/components/UI/Button.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  import {
    panels,
    currentPanel,
    setCurrentPanel,
    editMode,
    toggleEditMode,
  } from "@/stores/panels";

  let scroller = null;

  const noPanelFound = _("sentences.no-panel-found");
  const noWidgetFound = _("sentences.no-widget-found");
  const openEditMode = _("sentences.open-edit-mode");
  const clickAddPanel = _("sentences.click-to-add-panel");

  const tippy = { placement: "bottom", showOnCreate: true };

  $: widgetsCount = $currentPanel ? $currentPanel.widgets.length : 0;
  $: notFound = $panels.length ? noWidgetFound : noPanelFound;
  $: editTippy = { ...tippy, content: `${notFound} ${openEditMode}` };
  $: addTippy = { ...tippy, content: clickAddPanel };
  $: disabledEditTippy = $editMode || widgetsCount;

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function isActiveClass(p1, p2) {
    return p1.id === p2.id ? "bg-secondary" : "bg-black bg-opacity-25";
  }
</script>

<div class="p-2 flex space-x-2 items-center bg-dark text-light">
  <Tippy options="{editTippy}" disabled="{disabledEditTippy}">
    <Button
      padding="p-2"
      on:click="{toggleEditMode}"
      icon="{$editMode ? MdDone : MdEdit}"
      class="{$editMode ? 'bg-green-600' : 'bg-primary'}"
    >
      <span
        class="hidden md:inline md:ml-2 truncate"
      >{$editMode ? _('words.done') : _('sentences.edit-mode')}</span>
    </Button>
  </Tippy>
  {#if $editMode}
    <Tippy options="{addTippy}" disabled="{$panels.length}">
      <Button
        padding="p-2"
        icon="{MdAdd}"
        on:click="{api.add}"
        class="bg-primary"
      >
        <span
          class="hidden md:inline md:ml-2 truncate"
        >{_('sentences.add-panel')}</span>
      </Button>
    </Tippy>
  {/if}
  {#if $panels.length}
    <HorizontalScroller bind:this="{scroller}" gap="2" arrowClass="bg-dark">
      {#each $panels as panel}
        <Button
          padding="p-2"
          on:click="{setCurrentPanel.bind(null, panel)}"
          class="flex-shrink-0 {isActiveClass($currentPanel, panel)} truncate"
        >
          {panel.name}
        </Button>
      {/each}
    </HorizontalScroller>
  {/if}
</div>
