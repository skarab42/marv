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

<div use:clickoutside on:clickoutside="{hide}">
  <div class="flex cursor-pointer" on:click="{toggle}">
    <div class="p-2 uppercase font-medium bg-dark-lighter">{label}</div>
    <div class="p-2 text-dark flex-auto" style="{style}"></div>
  </div>
  <div class="absolute z-10 text-dark {hidden}">
    <ChromePicker
      on:input="{onColor}"
      startColor="{color}"
      disableAlpha="{!alpha}"
    />
  </div>
</div>
