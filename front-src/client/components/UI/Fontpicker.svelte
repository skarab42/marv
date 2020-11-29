<script>
  import Select from "@/components/UI/Select.svelte";
  import { createEventDispatcher } from "svelte";
  import loadFonts from "../../../libs/loadFonts";

  const dispatch = createEventDispatcher();

  export let font;

  function onChange({ detail: font }) {
    dispatch("font", font);
  }
</script>

<div class="p-2">
  {#await loadFonts()}
    Loading fonts list...
  {:then fonts}
    <Select
      value="{font}"
      items="{fonts}"
      class="flex-auto"
      on:change="{onChange}"
    />
  {:catch error}
    <div class="bg-red-600 text-light">{error.message}</div>
  {/await}
</div>
