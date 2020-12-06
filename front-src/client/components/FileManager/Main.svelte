<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import Layout from "./Layout.svelte";
  import FileList from "./FileList.svelte";
  import FilterButtons from "./FilterButtons.svelte";
  import Notify from "@/components/UI/Notify.svelte";
  import FileInput from "@/components/UI/FileInput.svelte";

  export let accept = ["text", "image", "audio", "video", "font"];

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
    api
      .upload({ name: file.name, buffer: file })
      .then(() => {
        notify = {
          type: "info",
          message: _("sentences.file-uploaded-successfully"),
        };
      })
      .catch((error) => {
        notify = { type: "error", message: error };
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
        accept="{inputAccept}"
        on:file="{onFile}"
      />
      <FilterButtons accept="{accept}" bind:types="{acceptTypes}" />
    </div>
    <Notify type="{notify.type}" bind:message="{notify.message}" />
  </div>
  <div class="p-2 flex flex-col space-y-2">
    <FileList on:select acceptTypes="{acceptTypes}" />
  </div>
</Layout>
