<script>
  import Splitter from "@/components/UI/Splitter.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let theme = "bg-dark text-light";
  let position = "absolute z-10 inset-0";

  function onDrop(event) {
    event.preventDefault();
    dispatch("dropFiles", [...event.dataTransfer.files]);
  }
</script>

<div
  on:drop="{onDrop}"
  on:dragover|preventDefault
  class="{position} {theme} select-none"
>
  <Splitter flex="col" sizes="{[75, 25]}" save="editor.main.col">
    <div slot="a" class="h-full">
      <Splitter flex="row" sizes="{[75, 25]}" save="editor.main.row">
        <div slot="a" class="h-full">
          <slot name="leftPane" />
          <slot />
        </div>
        <div slot="b" class="h-full">
          <slot name="rightPane" />
        </div>
      </Splitter>
    </div>
    <div slot="b" class="h-full">
      <slot name="bottomPane" />
    </div>
  </Splitter>
</div>
