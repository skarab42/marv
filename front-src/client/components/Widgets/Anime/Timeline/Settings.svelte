<script>
  import { _ } from "@/libs/i18next";
  import filesAPI from "@/api/files";
  import actionsAPI from "@/api/actions";
  import Button from "@/components/UI/Button.svelte";
  import MdOpenInNew from "svelte-icons/md/MdOpenInNew.svelte";
  import Editor from "@/components/Anime/Timeline/Editor.svelte";
  import FullScreenModal from "@/components/UI/FullScreenModal.svelte";

  export let data;

  let { widget } = data;
  let initialItems = [];
  let timelineOpened = false;

  actionsAPI.get(widget.id).then(({ items } = {}) => {
    if (items) initialItems = items;
  });

  function openTimeline() {
    timelineOpened = true;
  }

  function closeTimeline() {
    timelineOpened = false;
  }

  function onAnimeUpdate({ detail: anime }) {
    actionsAPI.update({ widget, anime });
  }

  async function onTextFileChange({ detail }) {
    await filesAPI.update(detail.item.target.filename, detail.text);
  }
</script>

<Button
  icon="{MdOpenInNew}"
  class="bg-secondary flex-auto mb-2"
  on:click="{openTimeline}"
>
  <div>{_('sentences.open-anime-timeline')}</div>
</Button>

{#if timelineOpened}
  <FullScreenModal>
    <Editor
      widget="{widget}"
      initialItems="{initialItems}"
      on:close="{closeTimeline}"
      on:update="{onAnimeUpdate}"
      on:textFileChange="{onTextFileChange}"
    />
  </FullScreenModal>
{/if}
