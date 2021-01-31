<script>
  import { _ } from "@/libs/i18next";
  import filesAPI from "@/api/files";
  import actionsAPI from "@/api/actions";
  import Button from "@/components/UI/Button.svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdOpenInNew from "svelte-icons/md/MdOpenInNew.svelte";
  import Editor from "@/components/Anime/Timeline/Editor.svelte";

  export let data;

  let initialItems = [];
  let widget = data.widget;
  let timelineOpened = false;

  fetchItems();

  function fetchItems() {
    actionsAPI.get(widget.id).then(({ items } = {}) => {
      if (items) initialItems = items;
    });
  }

  function openTimeline() {
    timelineOpened = true;
  }

  function closeTimeline() {
    timelineOpened = false;
    fetchItems();
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
  <Overlay>
    <Editor
      widget="{widget}"
      initialItems="{initialItems}"
      on:close="{closeTimeline}"
      on:update="{onAnimeUpdate}"
      on:textFileChange="{onTextFileChange}"
    />
  </Overlay>
{/if}
