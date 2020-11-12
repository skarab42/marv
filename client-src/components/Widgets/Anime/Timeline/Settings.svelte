<script>
  import Editor from "@/components/Anime/Timeline/Editor.svelte";
  import FullScreenModal from "@/components/UI/FullScreenModal.svelte";

  export let panel;
  export let widget;

  let timelineOpened = false;

  $: console.log({ panel, widget });

  function openTimeline() {
    timelineOpened = true;
  }

  function closeTimeline() {
    timelineOpened = false;
  }
</script>

<div class="p-2"><button on:click="{openTimeline}">OPEN TIMELINE</button></div>

{#if timelineOpened}
  <FullScreenModal>
    <Editor />
  </FullScreenModal>
{/if}
