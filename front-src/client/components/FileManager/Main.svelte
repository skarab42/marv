<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import FileList from "./FileList.svelte";
  import { refresh } from "@/stores/files";
  import PurgeButton from "./PurgeButton.svelte";
  import FilterButtons from "./FilterButtons.svelte";
  import Notify from "@/components/UI/Notify.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  export let height = 400;
  export let accept = ["text", "image", "audio", "video", "font"];

  let loading = false;
  const dispatch = createEventDispatcher();
  let inputAccept = accept.map((type) => `${type}/*`);

  if (accept.includes("font")) {
    inputAccept.push(".ttf", ".otf", ".woff", ".woff2");
  }

  let acceptTypes = {
    text: true,
    image: true,
    audio: true,
    video: true,
    font: true,
  };

  let notify = { type: "info", message: null };

  function onFile({ detail: file }) {
    loading = true;

    api
      .upload({ name: file.name, buffer: file })
      .then((uplodedFile) => {
        loading = false;
        dispatch("select", uplodedFile);
      })
      .catch((error) => {
        loading = false;
        notify = { type: "error", message: error };
      });
  }

  onMount(() => refresh());
</script>

<div class="overflow-auto h-full">
  <div class="p-2 gap-2 flex items-center flex-wrap md:flex-no-wrap">
    <FileInput
      label="{_('sentences.upload-file')}"
      class="bg-secondary"
      accept="{inputAccept}"
      on:file="{onFile}"
    />
    <PurgeButton />
    <FilterButtons accept="{accept}" bind:types="{acceptTypes}" />
  </div>
  {#if loading}
    <div class="px-4 py-2 flex space-x-2 bg-blue-600">
      <div class="w-6 h-6 animate-spin">
        <MdRefresh />
      </div>
      <div>{_('sentences.file-upload-progress')}</div>
    </div>
  {/if}
  <Notify type="{notify.type}" bind:message="{notify.message}" />
</div>

<div
  class="p-2 flex flex-col space-y-2 overflow-y-auto"
  style="height:{height}px"
>
  <FileList on:select acceptTypes="{acceptTypes}" />
</div>
