<script>
  import { editMode, toggleEditMode } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import { _ } from "@/libs/i18next";

  import MdGridOff from "svelte-icons/md/MdGridOff.svelte";
  import MdGridOn from "svelte-icons/md/MdGridOn.svelte";

  $: editModeLabel = $editMode ? _("words.done") : _("sentences.edit-grid");
  $: editModeIcon = $editMode ? MdGridOff : MdGridOn;
</script>

<MenuItem icon="{editModeIcon}" on:click="{toggleEditMode}">
  {editModeLabel}
</MenuItem>
