<script>
  import { editMode } from "@/stores/panels";
  import RenameInput from "./Settings/RenameInput.svelte";
  import RemoveButton from "./Settings/RemoveButton.svelte";
</script>

{#if $editMode}
  <div class="p-2 flex items-center bg-secondary-darker text-light space-x-2">
    <RenameInput />
    <RemoveButton />
  </div>
{/if}
