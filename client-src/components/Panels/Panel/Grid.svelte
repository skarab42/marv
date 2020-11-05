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

<Grid
  bind:items="{panel.grid}"
  let:item
  {...$gridOptions}
  on:adjust="{onChange}"
>
  <Widget
    widget="{item}"
    on:edit="{setCurrentWidget.bind(null, item)}"
    on:remove="{openRemoveModal.bind(null, item)}"
  />
</Grid>
