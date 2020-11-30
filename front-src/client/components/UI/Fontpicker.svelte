<script>
  import { getFonts, loadFont } from "../../../libs/fonts";
  import Select from "@/components/UI/Select.svelte";
  import { createEventDispatcher } from "svelte";
  import capitalize from "capitalize";
  import { _ } from "@/libs/i18next";

  const dispatch = createEventDispatcher();

  export let font;

  let fonts = [];

  function humanName(url) {
    return capitalize(url.split(".").shift().replace(/[_-]/g, " "));
  }

  function fontItem(url) {
    return { val: url, key: humanName(url) };
  }

  getFonts().then((allFonts) => {
    fonts = allFonts.map(fontItem);
  });

  function onChange({ detail: font }) {
    dispatch("font", font);
    loadFont(font);
  }
</script>

{#if !fonts}
  {_('sentences.loading-fonts-list')}
{:else}
  <Select
    object="{true}"
    value="{font}"
    items="{fonts}"
    {...$$restProps}
    on:change="{onChange}"
  />
{/if}
