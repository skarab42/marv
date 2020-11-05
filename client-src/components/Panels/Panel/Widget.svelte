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
  <Label widget="{widget}" />
  <EditMode panel="{panel}" widget="{widget}" />
</div>
