<script>
  import { _ } from "@/libs/i18next";
  import { update, get } from "@/libs/actions";
  import Button from "@/components/UI/Button.svelte";
  import MdOpenInNew from "svelte-icons/md/MdOpenInNew.svelte";
  import Editor from "@/components/Anime/Timeline/Editor.svelte";
  import FullScreenModal from "@/components/UI/FullScreenModal.svelte";

  export let panel = null;
  export let widget;

  let initialItems = [];

  get(widget.id).then(({ items } = {}) => {
    if (items) {
      initialItems = items;
    }
  });

  let timelineOpened = false;

  function openTimeline() {
    timelineOpened = true;
  }

  function closeTimeline() {
    timelineOpened = false;
  }

  function onAnimeUpdate({ detail: anime }) {
    initialItems = anime.items;
    update({ widget, anime });
  }
</script>

<Button icon="{MdOpenInNew}" class="bg-secondary" on:click="{openTimeline}">
  <div>{_('sentences.open-anime-timeline')}</div>
</Button>

{#if timelineOpened}
  <FullScreenModal>
    <Editor
      initialItems="{initialItems}"
      on:close="{closeTimeline}"
      on:update="{onAnimeUpdate}"
    />
  </FullScreenModal>
{/if}
