<script>
  import {
    panels,
    add,
    select,
    editMode,
    toggleEditMode,
  } from "@/stores/panels";
  import { _ } from "@/libs/i18next";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";

  function addPanel() {
    select(add());
  }

  $: console.log($panels);
  $: console.log($editMode);
</script>

<div class="p-2 flex space-x-2 items-center bg-dark text-light">
  <Button
    icon="{MdAdd}"
    padding="{null}"
    class="bg-primary"
    on:click="{addPanel}"
  />

  {#if $panels.length}
    <Button
      padding="{null}"
      icon="{MdSettings}"
      on:click="{toggleEditMode}"
      class="{$editMode ? 'bg-red-600' : 'bg-primary'}"
    />
  {:else}
    <div class="p-2">{_('sentences.no-panels-found')}</div>
  {/if}
</div>
