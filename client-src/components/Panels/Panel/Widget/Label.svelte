<script>
  export let widget;

  $: component = widget.component;
  $: label = (widget.label || (component && component.label) || "").trim();
  $: labelSize = `font-size:${widget.labelSize || 16}px;`;
  $: labelAlign = `text-align:${widget.labelAlign || "center"};`;
  $: padding = widget.labelPadding || 8;
  $: labelPadding = `padding-left:${padding}px;padding-right:${padding}px;`;
  $: order = widget.labelPosition === "bottom" ? "order-last" : "";
</script>

{#if label.length}
  <div
    class="{order} py-2 break-words overflow-hidden bg-black opacity-25"
    style="{labelSize} {labelAlign} {labelPadding}"
  >
    {label}
  </div>
{/if}
