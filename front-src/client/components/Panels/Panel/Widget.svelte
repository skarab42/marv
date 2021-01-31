<script>
  import { _ } from "@/libs/i18next";
  import { editMode } from "@/stores/panels";
  import widgets from "@/components/Widgets";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";

  export let item;
  export let panel;

  $: component = widget.component;
  $: widget = panel.widgets.find((i) => i.id === item.id);
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: bgImage = widget.backgroundImage
    ? `background-image: url(files/${widget.backgroundImage});`
    : "";
  $: borders = widget.borders;
</script>

<div
  class="h-full {borders} bg-center bg-no-repeat bg-cover"
  style="{bgColor} {bgImage}"
>
  {#if component}
    <svelte:component
      this="{widgets[component.name].Widget}"
      widget="{widget}"
    />
  {/if}

  {#if $editMode}
    {#if !component}
      <div class="absolute inset-0 pointer-events-none">
        <div class="flex w-full h-full opacity-50 pb-2">
          <MdAdd />
        </div>
        <div class="absolute bottom-0 w-full text-center">
          <span
            class="text-xs opacity-50"
          >{_('sentences.double-click-to-edit')}</span>
        </div>
      </div>
    {/if}
    <div class="absolute inset-0 cursor-move shadow-xl"></div>
  {/if}
</div>
