<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select {...$$restProps} on:change="{change}" bind:value>
  {#each items as item}
    <option value="{item}" disabled="{item === value}">{item}</option>
  {/each}
</select>
