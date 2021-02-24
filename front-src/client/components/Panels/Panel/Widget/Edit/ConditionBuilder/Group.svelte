<script>
  import Rule from "./Rule.svelte";

  export let items;
</script>

<div class="p-2 flex flex-col gap-2">
  {#each items as item}
    {#each Object.entries(item) as [rule, values]}
      {#if ['or', 'and'].includes(rule)}
        <div class="border border-secondary rounded">
          <div class="inline-block px-2 bg-blue-600 rounded-br">{rule}</div>
          <svelte:self items="{values}" />
        </div>
      {:else}
        <Rule rule="{rule}" values="{values}" />
      {/if}
    {/each}
  {/each}
</div>
