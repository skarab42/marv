<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let label = null;
  export let object = false;
  export let padding = "p-2";
  export let textColor = "text-light";
  export let bgColor = "bg-dark-lighter";

  $: color = `${bgColor} ${textColor}`;

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex flex-wrap items-center {color}">
  {#if label}
    <div class="{padding} font-medium uppercase">{label}</div>
  {/if}
  <div class="flex-auto">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      {...$$restProps}
      class="{padding} w-full text-dark"
      on:change="{change}"
      bind:value
    >
      {#each items as item}
        {#if object}
          <option value="{item.val}" disabled="{item.val === value}">
            {item.key}
          </option>
        {:else}
          <option value="{item}" disabled="{item === value}">{item}</option>
        {/if}
      {/each}
    </select>
  </div>
</label>
