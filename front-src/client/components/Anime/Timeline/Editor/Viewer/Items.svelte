<script>
  import { getContext } from "svelte";
  import components from "./items";

  const { items } = getContext("Editor");
</script>

{#each [...$items].reverse() as item (item.id)}
  <svelte:component this="{components[item.target.type]}" item="{item}" />
{/each}
