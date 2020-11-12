<script>
  import Panel from "../Panel.svelte";

  export let info;
</script>

<Panel title="Info" {...$$restProps}>
  {#each info as [key, value] (key)}
  <div class="p-2 flex space-x-2 items-center">
    <div class="flex-auto">{key}</div>
    <div>{value}</div>
  </div>
  {/each}
</Panel>
