<script>
  import { _ } from "@/libs/i18next";
  import Item from "./Timeline/Item.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Ruler from "./Timeline/Ruler.svelte";
  import Player from "./Timeline/Player.svelte";
  import Cursor from "./Timeline/Cursor.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import Tippy from "@/components/UI/Tippy.svelte";
  import { getContext, createEventDispatcher } from "svelte";
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";
  import FileManager from "@/components/FileManager/Main.svelte";

  const { anime, items } = getContext("Editor");
  const dispatch = createEventDispatcher();

  let fileManager = false;
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
    console.log(file);
  }

  function onRemove({ detail: item }) {
    dispatch("remove", item);
  }
</script>

<Grid bind:splitter>
  <div slot="header" class="p-2 flex splace-x-2 bg-primary-dark">
    <Tippy options="{tippy}" disabled="{$items.length}">
      <Icon
        icon="{MdFileUpload}"
        on:click="{openFileManager}"
        class="text-secondary cursor-pointer"
      />
    </Tippy>

    <Player anime="{$anime}" />
  </div>
  <div slot="header" class="bg-primary-dark">
    <Ruler />
  </div>
  {#each $items as item, pos (item.id)}
    <Item bind:item pos="{pos}" on:remove="{onRemove}" on:textFileChange />
  {/each}
  <Cursor min="{splitter.x}" />
</Grid>

{#if fileManager}
  <div class="absolute inset-0 z-50">
    <div class="relative h-full">
      <FileManager
        accept="{accept}"
        on:close="{closeFileManager}"
        on:select="{onFileSelect}"
      />
    </div>
  </div>
{/if}
