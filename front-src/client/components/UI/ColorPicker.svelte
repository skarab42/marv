<script>
  import { _ } from "@/libs/i18next";
  import clickoutside from "@/libs/svelte/click-outside";
  import ChromePicker from "svelte-color/Chrome.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let label = _("words.color");
  export let color = "#fff";
  export let alpha = false;
  export let colapsed = true;
  export let previewClass = "";
  export let position = "left";

  let cls = "flex-auto";
  export { cls as class };

  let pos = position === "left" ? "left-0" : "right-0";

  function onColor(event) {
    color = event.detail.hex;
    dispatch("color", event.detail);
  }

  $: hidden = colapsed && "hidden";
  $: style = `background-color: ${color}`;

  function toggle() {
    colapsed = !colapsed;
  }

  function hide() {
    colapsed = true;
  }
</script>

<div use:clickoutside on:clickoutside="{hide}" class="relative {cls}">
  <div class="flex cursor-pointer" on:click="{toggle}">
    {#if label}
      <div class="p-2 uppercase font-medium bg-dark-lighter">{label}</div>
    {/if}
    <div class="p-2 text-dark flex-auto {previewClass}" style="{style}"></div>
  </div>
  <div class="absolute z-10 text-dark {hidden} {pos}">
    <ChromePicker
      on:input="{onColor}"
      startColor="{color}"
      disableAlpha="{!alpha}"
    />
  </div>
</div>
