<script>
  import { createEventDispatcher } from "svelte";

  export let value;

  const dispatch = createEventDispatcher();

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }
</script>

<input
  class="w-20"
  type="number"
  max="{value[1]}"
  value="{value[0]}"
  on:change="{onChange.bind(null, 'minValue')}"
/>

<input
  class="w-20"
  type="number"
  min="{value[0]}"
  value="{value[1]}"
  on:change="{onChange.bind(null, 'maxValue')}"
/>
