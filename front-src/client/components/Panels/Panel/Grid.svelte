<script>
  import Grid from "svelte-grid";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import { onMount, onDestroy } from "svelte";
  import { gridOptions, selectedWidget } from "@/stores/panels";

  export let panel;

  function onChange() {
    update(panel);
  }

  function hide() {
    selectedWidget.set(null);
  }

  onMount(() => document.addEventListener("mousedown", hide));
  onDestroy(() => document.removeEventListener("mousedown", hide));
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
  <Widget panel="{panel}" item="{item}" />
</Grid>
