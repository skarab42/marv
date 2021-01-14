<script context="module">
  let dragIndex = 0;
</script>

<script>
  import Button from "@/components/UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { currentPanel, setCurrentPanel } from "@/stores/panels";

  export let panel;
  export let index;

  let isDragOver = false;

  const dispatch = createEventDispatcher();

  function isActiveClass(p1, p2) {
    return p1.id === p2.id ? "bg-secondary" : "bg-black bg-opacity-25";
  }

  function onDragStart({ target, dataTransfer }) {
    dataTransfer.setData("from", index);
    dragIndex = index;
  }

  function onDragOver(e) {
    e.preventDefault();
    isDragOver = index !== dragIndex;
  }

  function onDragLeave() {
    isDragOver = false;
  }

  function onDrop({ dataTransfer }) {
    dispatch("move", {
      from: parseInt(dataTransfer.getData("from")),
      to: index,
    });
    isDragOver = false;
  }
</script>

<div
  class="flex"
  draggable="{true}"
  on:drop="{onDrop}"
  on:dragstart="{onDragStart}"
  on:dragover="{onDragOver}"
  on:dragleave="{onDragLeave}"
>
  {#if isDragOver && index < dragIndex}
    <div class="bg-pink-700 mr-2 w-1"></div>
  {/if}
  <Button
    padding="p-2"
    on:click="{setCurrentPanel.bind(null, panel)}"
    class="flex-shrink-0 {isActiveClass($currentPanel, panel)} truncate"
  >
    {panel.name}
  </Button>
  {#if isDragOver && index > dragIndex}
    <div class="bg-pink-700 ml-2 w-1"></div>
  {/if}
</div>
