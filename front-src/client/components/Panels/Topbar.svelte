<script>
  import { editMode, currentPanel } from "@/stores/panels";

  import Selector from "./Topbar/Selector.svelte";
  import AddPanel from "./Topbar/AddPanel.svelte";
  import AddButton from "./Topbar/Settings/AddButton.svelte";
  import RenameInput from "./Topbar/Settings/RenameInput.svelte";
  import RemoveButton from "./Topbar/Settings/RemoveButton.svelte";
  import OpenEditMode from "@/components/Panels/OpenEditMode.svelte";
</script>

<Selector />

{#if $editMode && $currentPanel}
  <div
    class="py-2 divide-x divide-gray-800 flex items-center bg-secondary-darker text-light"
  >
    <div class="flex px-2 space-x-2">
      <AddPanel />
      <RenameInput />
      <RemoveButton />
    </div>
    <div class="px-2">
      <AddButton />
    </div>
    <div class="px-2">
      <OpenEditMode />
    </div>
  </div>
{/if}
