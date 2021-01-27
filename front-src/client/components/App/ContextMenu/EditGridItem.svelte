<script>
  import { currentPanel, editMode, toggleEditMode } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import capitalize from "capitalize";
  import { _ } from "@/libs/i18next";

  import MdGridOff from "svelte-icons/md/MdGridOff.svelte";
  import MdGridOn from "svelte-icons/md/MdGridOn.svelte";

  $: editModeLabel = $editMode ? _("words.done") : _("sentences.edit-grid");
  $: editModeIcon = $editMode ? MdGridOff : MdGridOn;
</script>

{#if $currentPanel && $currentPanel.widgets.length}
  <MenuItem icon="{editModeIcon}" on:click="{toggleEditMode}">
    {capitalize(editModeLabel)}
  </MenuItem>
{/if}
