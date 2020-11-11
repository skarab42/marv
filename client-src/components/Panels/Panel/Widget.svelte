<script>
  import EditMode from "./Widget/EditMode.svelte";
  import widgets from "@/components/Widgets";
  import { editMode } from "@/stores/panels";

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
    <EditMode panel="{panel}" widget="{widget}" />
  {/if}
</div>
