<script>
  import { editMode, currentPanel } from "@/stores/panels";

  import AddButton from "./Settings/AddButton.svelte";
  import RenameInput from "./Settings/RenameInput.svelte";
  import RemoveButton from "./Settings/RemoveButton.svelte";
</script>

{#if $editMode && $currentPanel}
  <div class="p-2 flex items-center bg-secondary-darker text-light space-x-2">
    <AddButton />
    <RenameInput />
    <RemoveButton />
  </div>
{/if}
