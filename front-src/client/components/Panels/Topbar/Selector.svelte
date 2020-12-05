<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  import {
    panels,
    currentPanel,
    setCurrentPanel,
    editMode,
    toggleEditMode,
  } from "@/stores/panels";

  let scroller = null;

  let tippy = {
    content: _("sentences.no-panels-found"),
    placement: "bottom",
    showOnCreate: true,
  };

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function isActiveClass(p1, p2) {
    return p1.id === p2.id ? "bg-secondary" : "bg-black bg-opacity-25";
  }
</script>

<div class="p-2 flex space-x-2 items-center bg-dark text-light">
  <Tippy options="{tippy}" disabled="{$panels.length}">
    <Button
      padding="p-2"
      icon="{MdSettings}"
      on:click="{toggleEditMode}"
      class="{$editMode ? 'bg-red-600' : 'bg-primary'}"
    />
  </Tippy>
  {#if $editMode}
    <Button
      padding="p-2"
      icon="{MdAdd}"
      on:click="{api.add}"
      class="bg-primary"
    />
  {/if}
  {#if $panels.length}
    <HorizontalScroller bind:this="{scroller}" gap="2" arrowClass="bg-dark">
      {#each $panels as panel}
        <Button
          padding="p-2"
          on:click="{setCurrentPanel.bind(null, panel)}"
          class="flex-shrink-0 {isActiveClass($currentPanel, panel)}"
        >
          {panel.name}
        </Button>
      {/each}
    </HorizontalScroller>
  {/if}
</div>
