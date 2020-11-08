<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/files";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Button from "@/components/UI/Button.svelte";
  import FileIcon from "@/components/UI/FileIcon.svelte";

  export let acceptTypes;

  const dispatch = createEventDispatcher();

  $: files = $store.filter((file) => acceptTypes[file.type]);

  function removeFile(file) {
    api.remove(file);
  }

  function selectFile(file) {
    dispatch("select", file);
  }

  function bgImage(file) {
    return `background-image: url(files/${file.filename});`;
  }
</script>

{#each files as file}
  <div
    in:fade
    out:fade
    class="flex items-center bg-dark-darker rounded cursor-pointer"
  >
    <div
      class="flex flex-auto items-center"
      on:click="{selectFile.bind(null, file)}"
    >
      <div class="p-2">
        <FileIcon type="{file.type}" />
      </div>
      <div class="p-2 flex-auto truncate">{file.filename}</div>
      {#if file.type === 'image'}
        <div
          style="{bgImage(file)}"
          class="w-10 h-10 mr-1 bg-center bg-no-repeat bg-cover rounded"
        ></div>
      {/if}
    </div>
    <Button
      class="bg-red-600 rounded-r"
      on:click="{removeFile.bind(null, file)}"
    >
      {_('delete')}
    </Button>
  </div>
{:else}
  <div>{_('sentences.file-list-empty')}</div>
{/each}
