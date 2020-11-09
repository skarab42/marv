<script>
  import EditMode from "./Widget/EditMode.svelte";
  import widgets from "@/components/Widgets";
  import { editMode } from "@/stores/panels";
  import Label from "./Widget/Label.svelte";

  export let item;
  export let panel;

  $: component = widget.component;
  $: widget = panel.widgets.find((i) => i.id === item.id);
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: bgImage =
    widget.backgroundImage &&
    `background-image: url(files/${widget.backgroundImage});`;
  $: borders = widget.borders;
</script>

<div
  class="h-full {borders} bg-center bg-no-repeat bg-cover"
  style="{bgColor} {bgImage}"
>
  <div class="h-full {borders} flex flex-col overflow-hidden">
    <Label widget="{widget}" />
    <div class="flex-auto">
      {#if component}
        <svelte:component
          this="{widgets[component.name].Widget}"
          widget="{widget}"
        />
      {/if}
    </div>
  </div>
  {#if $editMode}
    <EditMode panel="{panel}" widget="{widget}" />
  {/if}
</div>
