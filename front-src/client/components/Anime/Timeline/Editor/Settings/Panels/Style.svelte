<script>
  import { _ } from "@/libs/i18next";
  import { createEventDispatcher } from "svelte";
  import { styleDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdAddBox from "svelte-icons/md/MdAddBox.svelte";

  export let style;

  const dispatch = createEventDispatcher();

  let itemStyleNames = [];

  $: itemStyleNames = style.map(([key]) => key);
  $: styleNames = Object.keys(styleDefs)
    .filter((key) => !itemStyleNames.includes(key))
    .map((val) => ({ val, key: humanLabel(val) }));
  $: selectedStyle = (styleNames[0] && styleNames[0].val) || "";

  function onChange(key, { target, detail }) {
    const value = detail ? detail.hex || detail : target.value;
    dispatch("change", { key, value });
  }

  function onRemove(key) {
    dispatch("remove", { key });
  }

  function onSelectStyle({ detail }) {
    selectedStyle = detail;
  }

  function onAdd() {
    if (!selectedStyle) return;
    const key = selectedStyle;
    dispatch("change", { key, value: styleDefs[key].default });
  }

  // TODO === a faire !!!!
  function isRemovable(/*key*/) {
    return true;
  }

  function inputProps(key) {
    return styleDefs[key].input;
  }

  function humanLabel(label) {
    return _(`labels.${label}`);
  }
</script>

<Panel title="{_('words.styles')}" {...$$restProps}>
  {#if styleNames.length}
    <div class="p-2 space-x-2 flex items-center">
      <Select
        object="{true}"
        rootClass="w-full"
        inputClass="flex-auto rounded"
        items="{styleNames}"
        value="{selectedStyle}"
        on:change="{onSelectStyle}"
      />
      <div on:click="{onAdd}" class="cursor-pointer hover:text-blue-600">
        <Icon icon="{MdAddBox}" />
      </div>
    </div>
  {/if}
  {#each style as [key, value] (key)}
    <Input
      label="{humanLabel(key)}"
      value="{value}"
      {...inputProps(key)}
      removable="{isRemovable(key)}"
      on:change="{onChange.bind(null, key)}"
      on:remove="{onRemove.bind(null, key)}"
    />
  {/each}
</Panel>
