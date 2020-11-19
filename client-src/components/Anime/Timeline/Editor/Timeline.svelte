<script>
  import Item from "./Timeline/Item.svelte";
  import Grid from "./Timeline/Grid.svelte";
  import Ruler from "./Timeline/Ruler.svelte";
  import Player from "./Timeline/Player.svelte";
  import Cursor from "./Timeline/Cursor.svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import { getContext, createEventDispatcher } from "svelte";
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";
  import FileManager from "@/components/FileManager/Main.svelte";

  const { anime, items } = getContext("Editor");
  const dispatch = createEventDispatcher();

  let fileManager = false;
  let splitter = { x: 200, width: 4, min: 100, max: 500 };

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
</script>

<Grid bind:splitter>
  <div slot="header" class="p-2 flex splace-x-2 bg-primary-dark">
    <Icon
      icon="{MdFileUpload}"
      on:click="{openFileManager}"
      class="text-secondary cursor-pointer"
    />
    <Player anime="{$anime}" />
  </div>
  <div slot="header" class="bg-primary-dark">
    <Ruler />
  </div>
  {#each $items as item, pos (item.id)}
    <Item bind:item pos="{pos}" />
  {/each}
  <Cursor min="{splitter.x}" />
</Grid>

{#if fileManager}
  <div class="absolute inset-0 z-50">
    <div class="relative h-full">
      <FileManager
        accept="{['image', 'audio', 'text', 'video']}"
        on:close="{closeFileManager}"
        on:select="{onFileSelect}"
      />
    </div>
  </div>
{/if}
