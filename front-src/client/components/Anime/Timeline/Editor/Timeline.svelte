<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import Item from "./Timeline/Item.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Ruler from "./Timeline/Ruler.svelte";
  import Player from "./Timeline/Player.svelte";
  import Cursor from "./Timeline/Cursor.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import Button from "@/components/UI/Button.svelte";
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
  let splitter = { x: 220, width: 4, min: 220, max: 500 };

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
  <div slot="header" class="flex items-center gap-2 bg-primary-dark">
    <Tippy options="{tippy}" disabled="{false}">
      <Button
        icon="{MdFileUpload}"
        textColor="text-secondary hover:text-light"
        class="hover:bg-secondary"
        on:click="{openFileManager}"
      />
    </Tippy>
    <div class="flex-auto"></div>
    <Player anime="{$anime}" />
    <div class="flex-auto"></div>
    <Button
      class="hover:bg-secondary"
      icon="{MdInsertDriveFile}"
      on:click="{openInsertTextModal}"
    />
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
      on:duplicate
      on:textFileChange
      on:fileUpdate
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
