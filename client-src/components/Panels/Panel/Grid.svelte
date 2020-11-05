<script>
  import Grid from "svelte-grid";
  // import api from "@/api/panels";
  import Widget from "./Widget.svelte";
  import { gridOptions } from "@/stores/panels";

  export let grid;

  function setCurrentWidget(widget) {
    console.log("setEditWidget:", widget);
  }

  function openRemoveModal(widget) {
    console.log("openRemoveModal:", widget);
  }
</script>

<Grid bind:items="{grid}" let:item {...$gridOptions}>
  <Widget
    widget="{item}"
    on:edit="{setCurrentWidget.bind(null, item)}"
    on:remove="{openRemoveModal.bind(null, item)}"
  />
</Grid>
