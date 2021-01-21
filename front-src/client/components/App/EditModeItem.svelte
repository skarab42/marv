<script>
  import { editMode, toggleEditMode } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import { _ } from "@/libs/i18next";

  import MdCheck from "svelte-icons/md/MdCheck.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";

  $: editModeLabel = $editMode ? _("words.done") : _("sentences.edit-mode");
  $: editModeIcon = $editMode ? MdCheck : MdEdit;
</script>

<MenuItem icon="{editModeIcon}" on:click="{toggleEditMode}">
  {editModeLabel}
</MenuItem>
