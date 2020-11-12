<script>
  import { _ } from "@/libs/i18next";

  export let widget;

  $: component = widget.component;
  $: componentLabel = component && _(component.label);
  $: label = (widget.label || componentLabel || "").trim();
  $: labelSize = `font-size:${widget.labelSize || 16}px;`;
  $: labelAlign = `text-align:${widget.labelAlign || "center"};`;
  $: padding = widget.labelPadding || 8;
  $: labelPadding = `padding-left:${padding}px;padding-right:${padding}px;`;
  $: order = widget.labelPosition === "bottom" ? "order-last" : "";
</script>

{#if label.length}
  <div
    class="{order} flex-shrink-0 py-2 break-words overflow-hidden bg-black opacity-25"
    style="{labelSize} {labelAlign} {labelPadding}"
  >
    <span class="select-none">{label}</span>
  </div>
{/if}
