<script>
  import { _ } from "@/libs/i18next";
  import widgets from "@/components/Widgets";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";
  import { editMode, selectedWidget } from "@/stores/panels";

  export let widget;

  $: component = widget.component;
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: bgImage = widget.backgroundImage
    ? `background-image: url(files/${widget.backgroundImage});`
    : "";
  $: selected = $selectedWidget && $selectedWidget.id === widget.id;

  function select() {
    $selectedWidget = widget;
  }
</script>

<div
  on:mouseup="{select}"
  style="{bgColor} {bgImage}"
  class="h-full {widget.borders} bg-center bg-no-repeat bg-cover {selected ? 'border-2 border-pink-600' : ''}"
>
  {#if component}
    <svelte:component
      this="{widgets[component.name].Widget}"
      widget="{widget}"
    />
  {/if}

  {#if $editMode}
    {#if !component}
      <div class="absolute inset-0">
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
    <div class="absolute inset-0 cursor-move shadow-xl {widget.borders}"></div>
  {/if}
</div>
