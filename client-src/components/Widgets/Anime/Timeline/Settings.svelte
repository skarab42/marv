<script>
  import { _ } from "@/libs/i18next";
  import Button from "@/components/UI/Button.svelte";
  import MdOpenInNew from "svelte-icons/md/MdOpenInNew.svelte";
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

<Button icon="{MdOpenInNew}" class="bg-secondary" on:click="{openTimeline}">
  <div>{_('sentences.open-anime-timeline')}</div>
</Button>

{#if timelineOpened}
  <FullScreenModal>
    <Editor on:close="{closeTimeline}" />
  </FullScreenModal>
{/if}
