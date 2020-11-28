<script>
  import Icon from "@/components/UI/Icon.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Fontpicker from "@/components/UI/Fontpicker.svelte";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label;
  export let type;
  export let value;
  export let items = [];
  export let removable = false;

  function remove() {
    dispatch("remove", label);
  }

  function onChange(event) {
    dispatch("change", event.detail);
  }
</script>

<div class="p-2 flex items-center">
  <div class="flex items-center w-1/2">
    <div class="flex-1 truncate">{label}</div>
    {#if removable}
      <Icon
        on:click="{remove}"
        icon="{MdDeleteForever}"
        class="mr-1 hover:bg-red-600 cursor-pointer"
      />
    {/if}
  </div>
  {#if type === 'colorpicker'}
    <ColorPicker
      label="{false}"
      color="{value}"
      position="right"
      on:color="{onChange}"
      previewClass="w-10"
    />
  {:else if type === 'fontpicker'}
    <Fontpicker font="{value}" on:font="{onChange}" />
  {:else if type === 'select'}
    <Select
      pad="px-2"
      value="{value}"
      items="{items}"
      class="flex-auto"
      on:change="{onChange}"
    />
  {:else}
    <input
      type="{type}"
      on:blur
      on:input
      on:change
      value="{value}"
      {...$$restProps}
      class="px-2 w-1/2 flex-1 text-dark rounded"
    />
  {/if}
</div>
