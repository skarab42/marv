<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import Item from "./Timeline/Item.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Ruler from "./Timeline/Ruler.svelte";
  import Player from "./Timeline/Player.svelte";
  import Cursor from "./Timeline/Cursor.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import InsertTextModal from "./InsertTextModal.svelte";
  import { getContext, createEventDispatcher } from "svelte";
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";
  import FileManagerModal from "@/components/FileManager/Modal.svelte";
  import MdInsertDriveFile from "svelte-icons/md/MdInsertDriveFile.svelte";

  export let widget;

  const { anime, items } = getContext("Editor");
  const dispatch = createEventDispatcher();

  let fileManager = false;
  let insetTextModal = false;
  let fileManagerNotify = null;
  let splitter = { x: 200, width: 4, min: 100, max: 500 };

  const accept = ["image", "audio", "text", "video", "font"];

  let tippy = {
    content: _("sentences.add-file-to-timeline"),
    showOnCreate: true,
    placement: "top",
  };

  function openFileManager() {
    fileManager = true;
  }

  function closeFileManager() {
    fileManager = false;
  }

  function onFileSelect({ detail: file }) {
    closeFileManager();
    dispatch("file", file);
  }

  function onRemove({ detail: item }) {
    dispatch("remove", item);
  }

  function insertText({ detail: filename }) {
    const name = `${filename}.txt`;
    const buffer = new Blob(["..."], { type: "text/plain" });

    api
      .upload({ name, buffer })
      .then((uplodedFile) => {
        dispatch("file", uplodedFile);
        closeInsertTextModal();
      })
      .catch((error) => {
        fileManagerNotify = { type: "error", message: error };
      });
  }

  function closeInsertTextModal() {
    insetTextModal = false;
  }

  function openInsertTextModal() {
    insetTextModal = true;
  }
</script>

<Grid bind:splitter>
  <div slot="header" class="p-2 flex splace-x-2 bg-primary-dark">
    <Tippy options="{tippy}" disabled="{false}">
      <Icon
        icon="{MdFileUpload}"
        on:click="{openFileManager}"
        class="text-secondary cursor-pointer"
      />
    </Tippy>
    <Player anime="{$anime}" />
    <div class="flex-auto"></div>
    <div
      on:click="{openInsertTextModal}"
      class="w-6 h-6 cursor-pointer opacity-75"
    >
      <MdInsertDriveFile />
    </div>
  </div>
  <div slot="header" class="bg-primary-dark">
    <Ruler />
  </div>
  {#each $items as item, index (item.id)}
    <Item
      bind:item
      index="{index}"
      widget="{widget}"
      on:remove="{onRemove}"
      on:textFileChange
    />
  {/each}
  <Cursor min="{splitter.x}" />
</Grid>

<FileManagerModal
  accept="{accept}"
  bind:opened="{fileManager}"
  on:close="{closeFileManager}"
  on:select="{onFileSelect}"
/>

<InsertTextModal
  notify="{fileManagerNotify}"
  bind:opened="{insetTextModal}"
  on:save="{insertText}"
  on:close="{closeInsertTextModal}"
/>
