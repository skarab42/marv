<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import { fade } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import { store, refresh } from "@/stores/files";
  import Button from "@/components/UI/Button.svelte";
  import FileIcon from "@/components/UI/FileIcon.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  export let acceptTypes;

  let confirmRemoveModal = false;
  let currentFile = null;

  const dispatch = createEventDispatcher();

  $: files = $store.filter((file) => acceptTypes[file.type]);

  function removeFile(file) {
    api.remove(file);
  }

  function onRemoveFile(file) {
    currentFile = file;
    confirmRemoveModal = true;
  }

  function onConfirmRemove({ detail: confirm }) {
    confirmRemoveModal = false;
    confirm && removeFile(currentFile);
  }

  function selectFile(file) {
    dispatch("select", file);
  }

  function bgImage(file) {
    return `background-image: url(files/${file.filename});`;
  }

  onMount(() => refresh());
</script>

{#each files as file}
  <div
    in:fade
    out:fade
    class="flex items-center bg-dark-darker rounded cursor-pointer"
  >
    <div
      class="flex flex-auto truncate items-center"
      on:click="{selectFile.bind(null, file)}"
    >
      <div class="p-2">
        <FileIcon type="{file.type}" />
      </div>
      <div class="p-2 flex-auto truncate">{file.filename}</div>
      {#if file.type === 'image'}
        <div
          style="{bgImage(file)}"
          class="w-10 h-10 mr-1 flex-shrink-0 bg-center bg-no-repeat bg-cover rounded"
        ></div>
      {/if}
    </div>
    <Button
      icon="{MdDelete}"
      class="bg-red-600 rounded-r"
      on:click="{onRemoveFile.bind(null, file)}"
    >
      <span class="hidden md:inline-block">{_('words.delete')}</span>
    </Button>
  </div>
{:else}
  <div>{_('sentences.file-list-empty')}</div>
{/each}

<ConfirmModal
  question="{_('sentences.ask-remove-file', {
    filename: currentFile && currentFile.filename,
  })}"
  bind:opened="{confirmRemoveModal}"
  on:confirm="{onConfirmRemove}"
>
  <div class="p-2 bg-orange-600">
    <span class="uppercase font-bold">{_('words.warning')}:</span>
    {_('sentences.file-can-be-used-by-other-widgets')}
  </div>
</ConfirmModal>
