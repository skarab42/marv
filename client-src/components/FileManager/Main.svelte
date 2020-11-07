<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/files";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Button from "@/components/UI/Button.svelte";
  import FileIconState from "./FileIconState.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import FileIcon from "@/components/UI/FileIcon.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  export let accept = ["text", "image", "audio", "video"];

  let message = null;
  let timeoutId = null;
  let messageDelay = 5000;

  const typesState = {
    text: true,
    image: true,
    audio: true,
    video: true,
  };

  Object.keys(typesState).forEach((key) => {
    typesState[key] = accept.includes(key);
  });

  const dispatch = createEventDispatcher();

  $: files = $store.filter((file) => typesState[file.type]);

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

  function onType({ detail: type }) {
    typesState[type] = !typesState[type];
  }

  function removeFile(file) {
    api.remove(file);
  }

  function selectFile(file) {
    dispatch("select", file);
  }
</script>

<div class="absolute inset-0">
  <div class="relative h-full">
    <div class="flex flex-col h-full bg-dark">
      <div class="p-2 flex font-bold bg-primary-darker rounded-t">
        <div class="flex-auto">{_('sentences.file-manager')}</div>
        <div class="cursor-pointer" on:click="{dispatch.bind(null, 'close')}">
          <Icon icon="{MdClose}" />
        </div>
      </div>
      <div
        class="p-2 flex flex-wrap items-center sm:space-x-2 space-y-2 sm:space-y-0"
      >
        <FileInput
          label="{_('sentences.upload-file')}"
          class="bg-secondary rounded"
          on:file="{onFile}"
        />
        {#if accept.length > 1}
          <div class="flex space-x-2">
            <FileIconState
              type="text"
              state="{typesState}"
              on:click="{onType}"
              visible="{accept.includes('text')}"
            />
            <FileIconState
              type="image"
              state="{typesState}"
              on:click="{onType}"
              visible="{accept.includes('image')}"
            />
            <FileIconState
              type="audio"
              state="{typesState}"
              on:click="{onType}"
              visible="{accept.includes('audio')}"
            />
            <FileIconState
              type="video"
              state="{typesState}"
              on:click="{onType}"
              visible="{accept.includes('video')}"
            />
          </div>
        {/if}
      </div>
      {#if message}
        <div in:fade out:fade class="px-4 py-2 {messageColor(message)}">
          {message.text}
        </div>
      {/if}
      <div data-simplebar class="overflow-auto h-full">
        <div class="p-2 flex flex-col space-y-2">
          {#each files as file}
            <div
              in:fade
              out:fade
              class="flex items-center bg-dark-darker rounded cursor-pointer"
            >
              <div class="p-2" on:click="{selectFile.bind(null, file)}">
                <FileIcon type="{file.type}" />
              </div>
              <div
                class="p-2 flex-auto truncate"
                on:click="{selectFile.bind(null, file)}"
              >
                {file.filename}
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
        </div>
      </div>
    </div>
  </div>
</div>
