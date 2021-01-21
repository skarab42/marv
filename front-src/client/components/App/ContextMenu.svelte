<script>
  import ContextMenu from "@/components/UI/ContextMenu.svelte";
  import EditModeItem from "./EditModeItem.svelte";
  import Menu from "@/components/UI/Menu.svelte";
</script>

<ContextMenu let:opened class="flex flex-col h-full">
  <slot opened="{opened}" />
  <div slot="menu">
    <Menu>
      <slot name="items" />
      <hr class="border-b-1 border-gray-800 border-opacity-50" />
      <EditModeItem />
    </Menu>
  </div>
</ContextMenu>
