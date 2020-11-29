<script>
  import { createEventDispatcher } from "svelte";
  import { attrsDefs } from "../../../libs/settings";

  import Panel from "../Panel.svelte";
  import Input from "../Input.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Select from "@/components/UI/Select.svelte";
  import MdAddBox from "svelte-icons/md/MdAddBox.svelte";

  export let attrs;

  const dispatch = createEventDispatcher();

  let itemAttrsNames = [];

  $: itemAttrsNames = attrs.map(([key]) => key);
  $: attrsNames = Object.keys(attrsDefs).filter(
    (key) => !itemAttrsNames.includes(key)
  );
  $: selectedAttrs = attrsNames[0] || "";

  function onChange(key, { target }) {
    dispatch("change", { key, value: target.value });
  }

  function onRemove(key) {
    dispatch("remove", { key });
  }

  function onSelectAttrs({ detail }) {
    selectedAttrs = detail;
  }

  function onAdd() {
    if (!selectedAttrs) return;
    const key = selectedAttrs;
    dispatch("change", { key, value: attrsDefs[key].default });
  }

  // TODO === a faire !!!!
  function isRemovable(/*key*/) {
    return true;
  }
</script>

<Panel title="Attributes" {...$$restProps}>
  {#if attrsNames.length}
    <div class="p-2 space-x-2 flex items-center">
      <Select
        rootClass="w-full"
        inputClass="flex-auto rounded"
        items="{attrsNames}"
        value="{selectedAttrs}"
        on:change="{onSelectAttrs}"
      />
      <div on:click="{onAdd}" class="cursor-pointer hover:text-blue-600">
        <Icon icon="{MdAddBox}" />
      </div>
    </div>
  {/if}
  {#each attrs as [key, value] (key)}
    <Input
      label="{key}"
      value="{value}"
      {...attrsDefs[key].input}
      removable="{isRemovable(key)}"
      on:change="{onChange.bind(null, key)}"
      on:remove="{onRemove.bind(null, key)}"
    />
  {/each}
</Panel>
