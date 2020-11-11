<script>
  import Label from "./Widget/Label.svelte";

  export let widget;

  export let cls = "";
  export { cls as class };
</script>

<div
  on:click
  class="relative h-full {widget.borders} flex flex-col overflow-hidden {cls}"
>
  <Label widget="{widget}" />
  <div class="flex-auto">
    <slot />
  </div>
  <slot name="overlay" />
</div>
