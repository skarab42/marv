<script>
  export let value;
  export let values;
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select class="text-dark" value="{value}" on:change>
  {#each values as value}
    <option>{value}</option>
  {/each}
</select>
