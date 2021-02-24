<script>
  import Select from "./Select.svelte";
  import { getContext } from "svelte";

  const { tags, rules } = getContext("condition-builder");

  export let rule;
  export let values;

  let tag = "";
  let value = "";

  $: if (values.length === 2) {
    tag = values[0].var;
    value = values[1];
  } else if (values.length === 3) {
    tag = values[1].var;
    value = [values[0], values[2]];
  }
</script>

<div class="text-dark p-2 flex gap-2 bg-gray-600 bg-opacity-25 rounded">
  <Select value="{tag}" values="{$tags}" />
  <Select value="{rule}" values="{rules}" />
  {#if values.length === 2}
    <input type="text" value="{value}" />
  {:else}
    <input class="w-20" type="number" max="{value[1]}" value="{value[0]}" />
    <input class="w-20" type="number" min="{value[0]}" value="{value[1]}" />
  {/if}
</div>
