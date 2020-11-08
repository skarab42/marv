<script>
  import { createEventDispatcher } from "svelte";
  import FileIcon from "@/components/UI/FileIcon.svelte";

  export let size = "lg";
  export let accept = ["text", "image", "audio", "video"];
  export let types = {
    text: true,
    image: true,
    audio: true,
    video: true,
  };

  const dispatch = createEventDispatcher();

  Object.keys(types).forEach((type) => {
    types[type] = accept.includes(type);
  });

  function toggle(type) {
    types[type] = !types[type];
    dispatch("toggle", types);
  }
</script>

{#if accept.length > 1}
  <div class="flex space-x-2">
    {#each accept as type}
      <FileIcon
        type="{type}"
        size="{size}"
        on:click="{toggle.bind(null, type)}"
        class="{!types[type] && 'opacity-25'}"
      />
    {/each}
  </div>
{/if}
