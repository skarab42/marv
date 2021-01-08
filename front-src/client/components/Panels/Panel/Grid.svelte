<script>
  import Grid from "svelte-grid";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import { gridOptions } from "@/stores/panels";

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
  <Widget item="{item}" panel="{panel}" />
</Grid>
