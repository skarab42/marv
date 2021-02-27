<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let label = null;
  export let object = false;
  export let rootClass = "";
  export let inputClass = "p-2";
  export let labelMinWidth = "50%";
  export let textColor = "text-light";
  export let bgColor = "bg-dark-lighter";
  export let labelClass = "p-2 font-medium uppercase";

  $: color = `${bgColor} ${textColor}`;
  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="{rootClass} flex flex-auto items-center {color}">
  {#if label}
    <div style="{labelStyle}" class="{labelClass}">{label}</div>
  {/if}
  <div class="flex-auto">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      {...$$restProps}
      class="{inputClass} w-full text-dark"
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
