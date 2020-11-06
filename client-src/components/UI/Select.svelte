<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let label = null;
  export let padding = "p-2";
  export let textColor = "text-light";
  export let bgColor = "bg-dark-lighter";

  let flex = "flex flex-auto";

  $: color = `${bgColor} ${textColor}`;

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<div class="flex flex-wrap items-center {color}">
  {#if label}
    <div class="{padding} {flex} uppercase">{label}</div>
  {/if}
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    {...$$restProps}
    class="{padding} {flex} text-dark"
    on:change="{change}"
    bind:value
  >
    {#each items as item}
      <option value="{item}" disabled="{item === value}">{item}</option>
    {/each}
  </select>
</div>
