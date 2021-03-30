<script>
  import { getContext } from "svelte";

  export let index;

  let isDragOver = false;

  const { items } = getContext("Editor");

  function onDragStart({ dataTransfer }) {
    dataTransfer.setData("from", index);
  }

  function onDragOver() {
    isDragOver = true;
  }

  function onDragLeave() {
    isDragOver = false;
  }

  function moveItem({ from, to }) {
    if (from === to) return;
    let reversedItems = [...$items].reverse();
    reversedItems.splice(to, 0, reversedItems.splice(from, 1)[0]);
    $items = reversedItems.reverse();
  }

  function onDrop({ dataTransfer }) {
    moveItem({ from: parseInt(dataTransfer.getData("from")), to: index });
    isDragOver = false;
  }
</script>

<div
  on:click
  {...$$restProps}
  draggable="{true}"
  on:drop="{onDrop}"
  on:dragstart="{onDragStart}"
  on:dragover="{onDragOver}"
  on:dragleave="{onDragLeave}"
>
  <slot />
  {#if isDragOver}
    <slot name="dragOver" />
  {/if}
</div>
