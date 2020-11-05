<script>
  export let item;
  export let panel;

  $: widget = panel.widgets.find((i) => i.id === item.id);
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: classList = widget.classList;
</script>

<div class="h-full {classList}" style="{bgColor}">
  <div class="p-2 truncate">{widget.id}</div>
  <div class="p-2 truncate">x: {item.x} y: {item.y}</div>
</div>
