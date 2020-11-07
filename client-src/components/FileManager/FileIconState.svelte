<script>
  import FileIcon from "@/components/UI/FileIcon.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let type;
  export let state;
  export let visible = true;

  function onClick() {
    dispatch("click", type);
  }

  $: color = !state[type] && "opacity-25";
</script>

{#if visible}
  <FileIcon on:click="{onClick}" size="lg" type="{type}" class="{color}" />
{/if}
