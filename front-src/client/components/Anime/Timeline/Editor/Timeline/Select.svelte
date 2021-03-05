<script>
  export let value;
  export let values;
  export let isObject = false;
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select class="p-2 text-dark" value="{value}" on:change>
  {#each values as val}
    <option value="{isObject ? val.value : val}">
      {isObject ? val.label : val}
    </option>
  {/each}
</select>
