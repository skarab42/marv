<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  export let label = "Select a file";
  export let multiple = false;
  export let accept = "*";

  let input = "";

  function onChange(event) {
    const files = [...event.target.files];
    dispatch("file", multiple ? files : files[0]);
    input.value = "";
  }
</script>

<div class="relative overflow-hidden inline-block">
  <Button {...$$restProps}>{label}</Button>
  <input
    type="file"
    accept="{accept}"
    multiple="{multiple}"
    bind:this="{input}"
    on:change="{onChange}"
    class="absolute inset-0 opacity-0"
  />
</div>
