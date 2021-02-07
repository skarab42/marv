<script>
  import Menu from "@/components/UI/Menu.svelte";
  import ContextMenu from "@/components/UI/ContextMenu.svelte";
  import EditGridItem from "./ContextMenu/EditGridItem.svelte";
  import AddPanelItem from "./ContextMenu/AddPanelItem.svelte";
  import AddWidgetItem from "./ContextMenu/AddWidgetItem.svelte";
</script>

<ContextMenu
  on:open
  on:close
  let:opened
  {...$$restProps}
  class="flex flex-col h-full"
>
  <slot opened="{opened}" />
  <div slot="menu">
    <Menu>
      <slot name="items" />
      <EditGridItem />
      <AddPanelItem />
      <AddWidgetItem />
    </Menu>
  </div>
</ContextMenu>
