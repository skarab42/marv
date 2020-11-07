<script>
  import api from "@/api/files";
  import { onMount } from "svelte";
  import { _ } from "@/libs/i18next";
  // import Modal from "@/components/UI/Modal.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  let files = [];

  async function updateFileList() {
    files = await api.getFileList();
  }

  onMount(updateFileList);

  function onFile({ detail: file }) {
    api
      .upload({ name: file.name, buffer: file })
      .then((filename) => {
        updateFileList();
        console.log("uploaded:", filename);
      })
      .catch((error) => {
        console.warn("Not uploaded:", error);
      });
  }
</script>

<div class="absolute inset-0 h-full w-full bg-dark rounded">
  <div class="flex flex-col">
    <div class="p-2 pr-10 font-bold bg-primary-darker rounded-t">
      {_('sentences.file-manager')}
    </div>
    <div class="p-2">
      <FileInput
        label="{_('sentences.select-file')}"
        class="bg-secondary rounded"
        on:file="{onFile}"
      />
    </div>
    <div class="p-2 flex flex-col space-y-2">
      {#each files as file}
        <div class="p-2 bg-dark-darker rounded">{file}</div>
      {:else}
        <div class="">The file list is empty...</div>
      {/each}
    </div>
  </div>
</div>
