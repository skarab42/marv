<script>
  import { editMode } from "@/stores/panels";
  import RemoveButton from "./Settings/RemoveButton.svelte";
</script>

{#if $editMode}
  <div class="p-2 flex items-center bg-secondary-darker text-light space-x-2">
    <RemoveButton />
  </div>
{/if}
