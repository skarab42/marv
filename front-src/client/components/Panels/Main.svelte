<script>
  import ContextMenu from "@/components/app/ContextMenu.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import Topbar from "./Topbar.svelte";
  import Panel from "./Panel.svelte";
  import { _ } from "@/libs/i18next";
</script>

<ContextMenu>
  <Topbar />
  <Panel />
  <div slot="items">
    <MenuItem>prout 1</MenuItem>
    <MenuItem>prout 2</MenuItem>
    <MenuItem>prout 3</MenuItem>
  </div>
</ContextMenu>
