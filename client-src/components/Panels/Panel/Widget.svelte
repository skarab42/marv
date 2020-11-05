<script>
  import EditMode from "./Widget/EditMode.svelte";
  import Label from "./Widget/Label.svelte";

  export let item;
  export let panel;

  $: widget = panel.widgets.find((i) => i.id === item.id);
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: borders = widget.borders;
</script>

<div class="h-full {borders}" style="{bgColor}">
  <div class="h-full flex flex-col overflow-hidden">
    <Label widget="{widget}" />
    <div class="flex-auto">contents...</div>
  </div>
  <EditMode panel="{panel}" widget="{widget}" />
</div>
