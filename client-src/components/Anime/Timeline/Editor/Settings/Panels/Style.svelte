<script>
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
  $: styleNames = Object.keys(styleDefs).filter(
    (key) => !itemStyleNames.includes(key)
  );
  $: selectedStyle = styleNames[0] || "";

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
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

  function isRemovable(key) {
    return true;
  }
</script>

<Panel title="Styles" {...$$restProps}>
  {#if styleNames.length}
    <div class="p-2 space-x-2 flex items-center">
      <Select
        pad="px-2"
        class="flex-auto"
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
      label="{key}"
      value="{value}"
      {...styleDefs[key].input}
      removable="{isRemovable(key)}"
      on:change="{onChange.bind(null, key)}"
      on:remove="{onRemove.bind(null, key)}"
    />
  {/each}
</Panel>
