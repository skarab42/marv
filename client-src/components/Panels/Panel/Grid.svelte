<script>
  import Grid from "svelte-grid";
  import api from "@/api/panels";
  import Widget from "./Widget.svelte";
  import { gridOptions } from "@/stores/panels";

  export let panel;

  function onChange() {
    const grid = panel.grid.map(({ id, x, y, w, h }) => ({ id, x, y, w, h }));
    api.update({ ...panel, grid });
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
  <Widget item="{item}" panel="{panel}" />
</Grid>
