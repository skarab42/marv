<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/files";
  import { fade } from "svelte/transition";
  import FileIcon from "@/components/UI/FileIcon.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  let message = null;
  let timeoutId = null;
  let messageDelay = 5000;

  function notify(type, text) {
    message = { type, text };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      message = null;
    }, messageDelay);
  }

  function messageColor(message) {
    return message.type === "error" ? "bg-red-600" : "bg-blue-600";
  }

  function onFile({ detail: file }) {
    api
      .upload({ name: file.name, buffer: file })
      .then(() => {
        notify("info", _("sentences.file-uploaded-successfully"));
      })
      .catch((error) => {
        notify("error", error);
      });
  }
</script>

<div class="absolute inset-0">
  <div class="relative h-full">
    <div class="flex flex-col h-full bg-dark">
      <div class="p-2 pr-10 font-bold bg-primary-darker rounded-t">
        {_('sentences.file-manager')}
      </div>
      <div class="p-2">
        <FileInput
          label="{_('sentences.upload-file')}"
          class="bg-secondary rounded"
          on:file="{onFile}"
        />
      </div>
      {#if message}
        <div in:fade out:fade class="px-4 py-2 {messageColor(message)}">
          {message.text}
        </div>
      {/if}
      <div data-simplebar class="overflow-auto h-full">
        <div class="p-2 flex flex-col space-y-2">
          {#each $store as file}
            <div
              in:fade
              out:fade
              class="p-2 flex items-center space-x-2 bg-dark-darker rounded"
            >
              <FileIcon type="{file.type}" />
              <div class="">{file.filename}</div>
            </div>
          {:else}
            <div class="">{_('sentences.file-list-empty')}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
