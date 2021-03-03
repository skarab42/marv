<script>
  import { _ } from "@/libs/i18next";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let color = "#fff";
  export let label = _("words.color");
  export let labelMinWidth = "50%";
  export let previewClass = "";

  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";

  function onChange({ target }) {
    color = target.value;
    dispatch("color", { hex: color });
  }
</script>

<label class="flex w-full h-full" style="background-color:{color}">
  {#if label}
    <div style="{labelStyle}" class="p-2 uppercase font-medium bg-dark-lighter">
      {label}
    </div>
  {/if}
  {#if previewClass}
    <div class="{previewClass}"></div>
  {/if}
  <input
    type="color"
    value="{color}"
    class="opacity-0"
    on:input="{onChange}"
    style="width:1px;height:1px;"
  />
</label>
