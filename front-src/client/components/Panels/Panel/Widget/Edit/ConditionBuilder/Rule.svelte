<script>
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import Select from "./Select.svelte";
  import RangeInput from "./RangeInput.svelte";
  import { createEventDispatcher } from "svelte";
  import RemoveCross from "./RemoveCross.svelte";
  import Switch from "@/components/UI/Switch.svelte";

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

  $: isBool = tag.match(/^is[A-Z]/);
  $: isRange = values.length === 3;

  $: if (!isRange) {
    tag = values[0].var;
    value = values[1];
  } else {
    tag = values[1].var;
    value = [values[0] || 0, values[2] || 0];
    rule = `range${rule.replace("range", "")}`;
  }

  $: onChange("rule", isBool ? "!!" : rules[0]);
  $: if (isBool && !["0", "1"].includes(value)) {
    onChange("value", "0");
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

  function onChange(key, value) {
    change[key](value);
    const cleanRule = rule.replace("range", "");
    dispatch("update", { [cleanRule]: values });
  }

  function onInputChange(key, { target }) {
    onChange(key, target.value);
  }

  function onRangeChange({ detail }) {
    onChange(detail.key, detail.value);
  }

  function onSwitchChange({ detail }) {
    onChange("value", detail ? "1" : "0");
  }
</script>

<div
  on:mouseenter="{showRemoveButton}"
  on:mouseleave="{hideRemoveButton}"
  class="items-center text-dark p-2 flex gap-2 bg-gray-600 bg-opacity-25 rounded"
>
  <Select
    value="{tag}"
    values="{$tags}"
    on:change="{onInputChange.bind(null, 'tag')}"
  />

  {#if !isBool}
    <Select
      value="{rule}"
      values="{_rules}"
      isObject="{true}"
      on:change="{onInputChange.bind(null, 'rule')}"
    />
  {/if}

  {#if isBool}
    <Switch enabled="{parseInt(value)}" on:change="{onSwitchChange}" />
  {:else if isRange}
    <RangeInput value="{value}" on:change="{onRangeChange}" />
  {:else}
    <input
      type="text"
      value="{value}"
      on:change="{onInputChange.bind(null, 'value')}"
    />
  {/if}

  <div class="flex-auto"></div>
  <RemoveCross visible="{removeButtonVisible}" on:click="{onRemove}" />
</div>
