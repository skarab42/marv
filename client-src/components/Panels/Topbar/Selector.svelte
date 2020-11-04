<script>
  import api from "@/libs/panels";
  import { _ } from "@/libs/i18next";

  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  import {
    panels,
    currentPanel,
    setCurrentPanel,
    editMode,
    setEditMode,
    toggleEditMode,
  } from "@/stores/panels";

  let scroller = null;

  api.on("add", (panel, { owner }) => {
    if (owner || !$currentPanel) {
      setCurrentPanel(panel);
      scroller && scroller.scrollRight();
    }
  });

  api.on("remove", (panel, pos) => {
    if (!$panels.length) {
      setEditMode(false);
      setCurrentPanel(null);
    } else if ($currentPanel.id === panel.id) {
      setCurrentPanel($panels[pos] || $panels[pos - 1]);
    }
  });

  function isActiveClass(p1, p2) {
    return p1.id === p2.id ? "bg-secondary" : "bg-primary";
  }
</script>

<div class="p-2 flex space-x-2 items-center bg-dark text-light">
  <Button
    padding="p-2"
    icon="{MdAdd}"
    on:click="{api.add}"
    class="bg-primary"
  />
  {#if $panels.length}
    <Button
      padding="p-2"
      icon="{MdSettings}"
      on:click="{toggleEditMode}"
      class="{$editMode ? 'bg-red-600' : 'bg-primary'}"
    />
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
  {:else}
    <div class="p-2">{_('sentences.no-panels-found')}</div>
  {/if}
</div>
