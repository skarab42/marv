<script>
  import Grid from "svelte-grid";
  import api from "@/api/panels";
  import Widget from "./Widget.svelte";
  import { gridOptions } from "@/stores/panels";

  export let panel;

  function setCurrentWidget(widget) {
    console.log("setEditWidget:", widget);
  }

  function openRemoveModal(widget) {
    console.log("openRemoveModal:", widget);
  }

  function onChange() {
    api.update(panel);
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
  <Widget
    item="{item}"
    panel="{panel}"
    on:edit="{setCurrentWidget.bind(null, item)}"
    on:remove="{openRemoveModal.bind(null, item)}"
  />
</Grid>
