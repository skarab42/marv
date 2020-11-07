<script>
  import FileIcon from "@/components/UI/FileIcon.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let type;
  export let state;

  function onClick() {
    dispatch("click", type);
  }
</script>

<FileIcon
  on:click="{onClick}"
  size="lg"
  type="{type}"
  class="{state[type] && 'text-primary'}"
/>
