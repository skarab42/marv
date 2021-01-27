<script>
  import { _ } from "@/libs/i18next";
  import { createEventDispatcher } from "svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MdDone from "svelte-icons/md/MdDone.svelte";
  import Button from "@/components/UI/Button.svelte";

  import { editMode, toggleEditMode } from "@/stores/panels";

  const dispatch = createEventDispatcher();

  function onClick() {
    toggleEditMode();
    dispatch("click");
  }
</script>

<Button
  padding="p-2"
  on:click="{onClick}"
  icon="{$editMode ? MdDone : MdEdit}"
  class="{$editMode ? 'bg-green-600 hover:bg-green-500' : 'bg-yellow-600 hover:bg-yellow-500'}"
>
  <span class="truncate">
    {$editMode ? _('words.done') : _('sentences.edit-mode')}
  </span>
</Button>
