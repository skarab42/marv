<script>
  import Grid from "svelte-grid";
  import { _ } from "@/libs/i18next";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import { gridOptions } from "@/stores/panels";
  import { contextKey, selectedWidget } from "./store";
  import { onMount, onDestroy, setContext } from "svelte";

  export let panel;

  function onChange() {
    update(panel);
  }

  function hide() {
    $selectedWidget = null;
  }

  setContext(contextKey, { selectedWidget });

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
