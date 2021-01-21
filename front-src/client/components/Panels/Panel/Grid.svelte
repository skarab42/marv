<script>
  import Grid from "svelte-grid";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import { gridOptions } from "@/stores/panels";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import ContextMenu from "@/components/app/ContextMenu.svelte";

  export let panel;

  function onChange() {
    update(panel);
  }
</script>

<style>
  :global(.svlt-grid-shadow) {
    background: black;
    opacity: 0.2;
  }
</style>

<Grid
  let:item
  {...$gridOptions}
  on:adjust="{onChange}"
  bind:items="{panel.grid}"
>
  <ContextMenu>
    <Widget item="{item}" panel="{panel}" />
    <div slot="items">
      <MenuItem>{item.id}</MenuItem>
      <MenuItem>kapoué 2</MenuItem>
      <MenuItem>kapoué 3</MenuItem>
      <MenuItem>kapoué 4</MenuItem>
    </div>
  </ContextMenu>
</Grid>
