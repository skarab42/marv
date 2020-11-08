<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import Layout from "./Layout.svelte";
  import { fade } from "svelte/transition";
  import FileList from "./FileList.svelte";
  import FilterButtons from "./FilterButtons.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  export let accept = ["text", "image", "audio", "video"];

  let acceptTypes = {
    text: true,
    image: true,
    audio: true,
    video: true,
  };

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

<Layout on:close title="{_('sentences.file-manager')}">
  <div slot="topbar">
    <div
      class="p-2 flex items-center flex-wrap space-y-2 md:flex-no-wrap md:space-y-0"
    >
      <FileInput
        label="{_('sentences.upload-file')}"
        class="bg-secondary rounded"
        on:file="{onFile}"
      />
      <FilterButtons accept="{accept}" bind:types="{acceptTypes}" />
    </div>
    {#if message}
      <div in:fade out:fade class="px-4 py-2 {messageColor(message)}">
        {message.text}
      </div>
    {/if}
  </div>
  <div class="p-2 flex flex-col space-y-2">
    <FileList on:select acceptTypes="{acceptTypes}" />
  </div>
</Layout>
