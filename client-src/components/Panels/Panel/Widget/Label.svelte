<script>
  export let widget;

  $: component = widget.component;
  $: label = (widget.label || (component && component.label) || "").trim();
  $: labelSize = `font-size:${widget.labelSize || 16}px;`;
  $: labelAlign = `text-align:${widget.labelAlign || "center"};`;
  $: labelPosition = `${widget.labelPosition}:0px;`;
  $: padding = widget.labelPadding || 8;
  $: labelPadding = `padding-left:${padding}px;padding-right:${padding}px;`;
</script>

{#if label.length}
  <div
    class="absolute left-0 right-0 py-2 break-words overflow-hidden bg-black bg-opacity-25"
    style="{labelSize} {labelAlign} {labelPosition} {labelPadding}"
  >
    {label}
  </div>
{/if}
