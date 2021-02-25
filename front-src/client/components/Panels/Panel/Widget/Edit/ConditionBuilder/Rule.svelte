<script>
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import Select from "./Select.svelte";
  import { createEventDispatcher } from "svelte";
  import RemoveCross from "./RemoveCross.svelte";

  const { tags, rules } = getContext("condition-builder");

  export let rule;
  export let values;

  let tag = "";
  let value = "";
  let removeButtonVisible = false;

  $: _rules = rules.map((value) => ({
    label: _(`condition-builder.rules.${value}`),
    value,
  }));

  const dispatch = createEventDispatcher();

  $: isRange = values.length === 3;
  $: if (!isRange) {
    tag = values[0].var;
    value = values[1];
  } else {
    tag = values[1].var;
    value = [values[0], values[2]];
    rule = `range${rule.replace("range", "")}`;
  }

  function onRemove() {
    dispatch("remove");
  }

  function showRemoveButton() {
    removeButtonVisible = true;
  }

  function hideRemoveButton() {
    removeButtonVisible = false;
  }

  const change = {
    rule(newValue) {
      if (newValue.startsWith("range")) {
        newValue = newValue.slice(5);
        if (!isRange) {
          values = [0, ...values];
        }
      } else if (isRange) {
        values = values.slice(1);
      }
      rule = newValue;
    },
    tag(newValue) {
      values[isRange ? 1 : 0] = { var: newValue };
    },
    value(newValue) {
      values[1] = newValue;
    },
    minValue(newValue) {
      values[0] = newValue;
    },
    maxValue(newValue) {
      values[2] = newValue;
    },
  };

  function onChange(key, { target }) {
    change[key](target.value);
    const cleanRule = rule.replace("range", "");
    dispatch("update", { [cleanRule]: values });
  }
</script>

<div
  on:mouseenter="{showRemoveButton}"
  on:mouseleave="{hideRemoveButton}"
  class="text-dark p-2 flex gap-2 bg-gray-600 bg-opacity-25 rounded"
>
  <Select
    value="{tag}"
    values="{$tags}"
    on:change="{onChange.bind(null, 'tag')}"
  />
  <Select
    value="{rule}"
    values="{_rules}"
    isObject="{true}"
    on:change="{onChange.bind(null, 'rule')}"
  />
  {#if values.length === 2}
    <input
      type="text"
      value="{value}"
      on:change="{onChange.bind(null, 'value')}"
    />
  {:else}
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
  {/if}
  <div class="flex-auto"></div>
  <RemoveCross visible="{removeButtonVisible}" on:click="{onRemove}" />
</div>
